import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { PassThrough } from "stream";

import { Aborter } from "../../src/Aborter";
import { createRandomLocalFile, getBSU } from "../utils";
import { RetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import { record } from "../utils/recorder";
import { ContainerClient, BlobClient, BlockBlobClient } from "../../src";
import { readStreamToLocalFile } from "../../src/utils/utils.common";

// tslint:disable:no-empty
describe("Highlevel", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
    recorder.stop();
  });

  before(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
    tempFileLargeLength = 257 * 1024 * 1024;
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, 1024 * 1024);
    tempFileSmallLength = 15 * 1024 * 1024;
  });

  after(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it("uploadFile should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await blockBlobClient.uploadFile(tempFileLarge, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES and configured maxSingleShotSize", async () => {
    await blockBlobClient.uploadFile(tempFileSmall, {
      maxSingleShotSize: 0
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await blockBlobClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFile should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await blockBlobClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFile should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await blockBlobClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20,
        progress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await blockBlobClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20,
        progress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadStream should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const downloadResponse = await blockBlobClient.download(0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStream should success for tiny buffers", async () => {
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20);

    const downloadResponse = await blockBlobClient.download(0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    assert.ok(buf.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStream should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = Aborter.timeout(1);

    try {
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
        abortSignal: aborter
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadStream should update progress event", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    let eventTriggered = false;

    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
      progress: (ev) => {
        assert.ok(ev.loadedBytes);
        eventTriggered = true;
      }
    });
    assert.ok(eventTriggered);
  });

  it("downloadToBuffer should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const buf = Buffer.alloc(tempFileLargeLength);
    await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
      blockSize: 4 * 1024 * 1024,
      maxRetryRequestsPerBlock: 5,
      parallelism: 20
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("downloadToBuffer should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: Aborter.timeout(1),
        blockSize: 4 * 1024 * 1024,
        maxRetryRequestsPerBlock: 5,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("downloadToBuffer should update progress event", async () => {
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 10);

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = Aborter.none;
    try {
      await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: aborter,
        blockSize: 1 * 1024,
        maxRetryRequestsPerBlock: 5,
        parallelism: 1,
        progress: () => {
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("blobclient.download should success when internal stream unexcepted ends at the stream end", async () => {
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    const downloadResponse = await blockBlobClient.download(0, undefined, {
      blobAccessConditions: {
        modifiedAccessConditions: {
          ifMatch: uploadResponse.eTag
        }
      },
      maxRetryRequests: 1,
      progress: (ev) => {
        if (ev.loadedBytes >= tempFileSmallLength) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("blobclient.download should download full data successfully when internal stream unexcepted ends", async () => {
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await blockBlobClient.download(0, undefined, {
      blobAccessConditions: {
        modifiedAccessConditions: {
          ifMatch: uploadResponse.eTag
        }
      },
      maxRetryRequests: 3,
      progress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("blobclient.download should download partial data when internal stream unexcepted ends", async () => {
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const partialSize = 500 * 1024;

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await blockBlobClient.download(0, partialSize, {
      blobAccessConditions: {
        modifiedAccessConditions: {
          ifMatch: uploadResponse.eTag
        }
      },
      maxRetryRequests: 3,
      progress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.slice(0, partialSize).equals(uploadedData.slice(0, partialSize)));
  });

  it("blobclient.download should download data failed when exceeding max stream retry requests", async () => {
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        blobAccessConditions: {
          modifiedAccessConditions: {
            ifMatch: uploadResponse.eTag
          }
        },
        maxRetryRequests: 0,
        progress: () => {
          if (injectedErrors++ < 1) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        }
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("blobclient.download should abort after retrys", async () => {
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const aborter = Aborter.none;
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        abortSignal: aborter,
        blobAccessConditions: {
          modifiedAccessConditions: {
            ifMatch: uploadResponse.eTag
          }
        },
        maxRetryRequests: 3,
        progress: () => {
          if (injectedErrors++ < 2) {
            // Triger 2 times of retry
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          } else {
            // Trigger aborter
            aborter.abort();
          }
        }
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("downloadToFile should success", async () => {
    const downloadedFilePath = recorder.getUniqueName("downloadedtofile.");
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const response = await blobClient.downloadToFile(downloadedFilePath, 0, undefined);

    assert.ok(
      response.contentLength === tempFileSmallLength,
      "response.contentLength doesn't match tempFileSmallLength"
    );
    assert.equal(
      response.readableStreamBody,
      undefined,
      "Expecting response.readableStreamBody to be undefined."
    );

    const localFileContent = fs.readFileSync(tempFileSmall);
    const downloadedFileContent = fs.readFileSync(downloadedFilePath);
    assert.ok(localFileContent.equals(downloadedFileContent));

    fs.unlinkSync(downloadedFilePath);
  });
});
