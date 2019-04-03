const {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential,
  AnonymousCredential,
  TokenCredential
} = require("@azure/storage-blob");

// Enter your storage account name and shared key
const account = "account";
const accountKey = "accountkey";

// Use SharedKeyCredential with storage account and account key
const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

async function main() {
  // EDIT: No explicit pipeline.

  // List containers
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
  // EDIT: Pass your creds to the service URL.

  for await (const container of serviceURL.listContainers()) {
    console.log(`Container: ${container.name}`);
  }
  // EDIT: async iterator rather than low-level marker passing.

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  const createContainerResponse = await containerURL.create();
  // EDIT: optional aborter.

  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

  const uploadBlobResponse = await blockBlobURL.upload(content);
  // EDIT: No explicit aborter, content length accessed via `.length` unless specified.

  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // List blobs
  for await (const blob of containerURL.listBlobs()) {
    console.log(`Blob: ${blob.name}`);
  }

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobURL.download();
  // EDIT: Optional aborter, starting from 0 is the 99% use case so just start there unless an offset is specified.

  const content = await downloadBlockBlobResponse.text(); // also, .blob() and .buffer()
  // EDIT: easy APIs for getting a blob as a UTF-8-encoded string, blob, or buffer.
  // PROPOSED EDIT: Async iterator over low-level chunks.

  console.log("Downloaded blob content", content);

  // Delete container
  await containerURL.delete();

  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
