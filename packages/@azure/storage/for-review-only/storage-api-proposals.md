# Storage JS/TS API Improvement Proposal (Blob)

This document lists proposed improvements to the current Blob API to make it
easier to consume.

## Client names

### Rename `ServiceURL` to `BlobServiceClient`

**After**
- `BlobServiceClient`
- `FileServiceClient`
- `QueueServiceClient`

Rename all other `xxxxURL` types to `xxxxClient`. Remove `URL` from method/property/variable names.

## Don't create pipeline explicitly for default pipeline

**Before**

```typescript
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net`,
    pipeline
  );
```

**After**

```typescript
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
```

In the `ServiceURL` constructor, `newPipeline()` is called to create a default
pipeline. Alternatively, the constructor can also take a `Pipeline` parameter to
allow users to have total control on the pipeline.

```typescript
  const customPipeline = {
    requestPolicyFactories: [
      deserializationPolicy(),
      exponentialRetryPolicy(),
      signingPolicy(credential),
    ]
  };
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net`,
    customPipeline
  );
```

Proposed constructor using union types:

  ``` typescript
  constructor(url: string, credentialOrPipeline: Credential | Pipeline, pipelineOptions?: INewPipelineOptions)
  ```

  - If the second argument is of type `Credential` or `undefined`, a default
    storage client pipeline is created with the given credential or
    `AnonymousCredential` in the `undefined` case and the pipeline options are
    used to create the instance.
  - otherwise, the instance is created with the custom pipeline passed in and
    the third argument is ignored.

Also consider renaming `newPipeline()` to `createDefaultPipeline()` and renaming `INewPipelineOptions` to `PipelineOptions`.

## Ensure constructors are consistent with .NET/Python

Investigate adding client constructors that take connection strings as
parameters.

## Use async iterators to list resources

For example, listing containers within a Storage account

**Before**:

```typescript
  let marker;
  do {
    const listContainersResponse = await serviceURL.listContainersSegment(
      Aborter.none,
      marker
    );

    marker = listContainersResponse.nextMarker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);
```

**After**:

```typescript
  for await (const container of serviceURL.listContainers(Aborter.none)) {
    console.log(`Container: ${container.name}`);
  }
```

We return the containers to the users, instead of them having to retrieve
containers from the `ListContainerResponse` object.

The iterating can be resumed:

```typescript
async function doListBlobs() {

  let iter1 = listBlobs();

  for await (let blob of iter1) {
    // process a blob or two, then...
    break;
  }

  // sometime later, resume where we left off...
  let iter2 = listBlobs({ resumePoint: iter1.resumePoint });
}
```

Prototype:

```typescript
interface ResumePoint {
  marker: string,
  lastIndex: number
}

interface ResumableAsyncIterableIterator<T> extends AsyncIterableIterator<T> {
  resumePoint: ResumePoint
}

interface Blob {
  name: string,
  contents: string
}

function listBlobs(options?: {resumePoint?: ResumePoint; options?: OtherOptions}): ResumableAsyncIterableIterator<Blob> {
  const iter: ResumableAsyncIterableIterator<Blob> = (async function* items(): AsyncIterableIterator<Blob> {
    do {
      const listContainersResponse = await serviceURL.listContainersSegment(
        options.abortSignal,
        iter.marker
      );

      const items = listContainersResponse.containerItems;
      for (let i = iter.lastIndex; i < items.length; i++) {
        iter.lastIndex = i;
        yield items[i];
      }

      iter.resumePoint.marker = listContainersResponse.nextMarker;
      iter.resumePoint.lastIndex = 0;
    } while (iter.resumePoint.marker);
  })() as any;

  iter.resumePoint = { ... resumePoint };
  return iter;
}
```

## Make all Aborter parameters optional with default value

Use `Aborter.none` as the default value for `Aborter` parameter.

**Before**:

```typescript
  const createContainerResponse = await containerURL.create(Aborter.none);
```

**After**:

```typescript
  const createContainerResponse = await containerURL.create();
```

There are several options to achieve this below. The review decision is that we
are going with option 2.

01. Option 1. move the `Aborter` parameter to the end and specify a default value
    of `Aborter.none`.

    ``` typescript
    public async getProperties(
      aborter: Aborter = Aborter.none
    ): Promise<Models.ServiceGetPropertiesResponse>;
    ```

    The call site can then be updated to

    ``` typescript
    const properties = await serviceURL.getProperties();
    ```

    However, many methods also take other optional parameters, including an
    optional options interface parameter. If we move `Aborter` parameter to the
    end

    ``` typescript
    public async listContainersSegment(
      marker?: string,
      options: IServiceListContainersSegmentOptions = {},
      aborter: Aborter = Aborter.none,
    ): Promise<Models.ServiceListContainersSegmentResponse>;
    ```

    it makes passing a non-default aborter awkward:

    ``` typescript
    const result = await serviceURL.listContainersSegment(marker, {}, Aborter.timeout(1000));
    ```

   Similar happens if we place `Aborter` before the options parameter and want
   to pass an options object but not the aborter.

02. Option 2. Make `Aborter` part of the options interface.

    ``` typescript
    public async listContainersSegment(
      marker?: string,
      options: IServiceListContainersSegmentOptions = {},
    ): Promise<Models.ServiceListContainersSegmentResponse>;
    ```

    where `IServiceListContainersSegmentOptions` has a property `abortSignal?: Aborter`.
    The call site with a custom aborter becomes

    ``` typescript
    const result = await serviceURL.listContainersSegment(marker, { abortSignal: Aborter.timeout(1000) });
    ```

    Also add option interfaces for methods that currently only takes a single `Aborter` parameter.

    ``` typescript
    public async getProperties(
      aborter: Aborter
    ): Promise<Models.ServiceGetPropertiesResponse>
    ```

    after adding a options interface, becomes

    ``` typescript
    public async getProperties(
      options: IServiceGetPropertiesOptions = {},
    ): Promise<Models.ServiceGetPropertiesResponse>;
    ```

03. Option 3. Use intersection types.

    ```typescript
      public async appendBlock(
        body: HttpRequestBody,
        contentLength: number,
        options: IAppendBlobAppendBlockOptions & CancellationOptions = {}
      ): Promise<Models.AppendBlobAppendBlockResponse> {
    ```

    where `CancellationOptions` holds the aborter:

    ```typescript
      export interface CancellationOptions {
        abortSignal? : Aborter;
      }
    ```

04. Option 4. Use a union type of `Aborter` and options interface

    ```typescript
      public async appendBlock(
        body: HttpRequestBody,
        contentLength: number,
        aborterOrOptions?: Aborter | IAppendBlobAppendBlockOptions,
        options: IAppendBlobAppendBlockOptions = {}
      ): Promise<Models.AppendBlobAppendBlockResponse> {
        let aborter: Aborter;
        if (aborterOrOptions instanceof Aborter) {
          aborter = aborterOrOptions;
        } else {
          aborter = Aborter.none;
          // the 4th argument is ignored in this case.
          options = aborterOrOptions || {};
        }

        // rest omitted
    ```

    - when the an `Aborter` type instance is passed as the third argument, the fourth
    argument`options` is the optional `IAppendBlobAppendBlockOptions` parameter;

    - otherwise, the third argument, if specified, is of the type
    `IAppendBlobAppendBlockOptions` parameter. The fourth argument `options`
    argument is ignored, and `options` got re-assigned to have value `aborterOrOptions || {}`.

    Cons: There would be a lot of `if` checking in every methods.

## Top-level convenience methods

Currently there are top-level methods for uploading and downloading blobs which
take `BlobURL` parameters so `BlobURL` instances need to be created first before
using these.

```typescript
  export function downloadBlobToBuffer(
    aborter: Aborter,
    buffer: Buffer,
    blobURL: BlobURL,
    offset: number,
    count?: number,
    options?: IDownloadFromBlobOptions): Promise<void>;

  export function uploadBrowserDataToBlockBlob(
    aborter: Aborter,
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    blockBlobURL: BlockBlobURL,
    options?: IUploadToBlockBlobOptions): Promise<BlobUploadCommonResponse>;

  export function uploadFileToBlockBlob(aborter: Aborter,
    filePath: string,
    blockBlobURL: BlockBlobURL,
    options?: IUploadToBlockBlobOptions): Promise<BlobUploadCommonResponse>;

  export function uploadStreamToBlockBlob(aborter: Aborter,
    stream: Readable,
    blockBlobURL: BlockBlobURL,
    bufferSize: number,
    maxBuffers: number,
    options?: IUploadStreamToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
```

It would be more convenient to just take a url string and optional
credential/pipeline options. For example,

```typescript
  export function downloadBlobFromUrlToBuffer(
    url: string,
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: IDownloadFromBlobOptions & CommonOptions): Promise<void>;
```

where `CommonOptions` is a option bag that contains optional cancellation option,
credential options, and pipeline options.

```typescript
type CommonOptions = CancellationOptions & CredentialOptions & PipelineOptions;
```

**Before**:

```typescript
  const url = "https://url.to.blob/";
  const buf = Buffer.alloc(size);
  const pipeline = StorageURL.newPipeline(credential, pipelineOptions);
  const blockBlobURL = new BlockBlobURL(url, pipeline);
  await downloadBlobToBuffer(Aborter.none, buf, blockBlobURL, 0);
```

**After**:

```typescript
  const url = "https://url.to.blob/";
  const buf = Buffer.alloc(size);
  await downloadBlobFromUrlToBuffer(url, buf, { credential: credential });
```

With credential, pipeline, and download options

```typescript
  await downloadBlobFromUrlToBuffer(url, buf, {
    // credential options
    credential: credential,

    // new pipeline options
    logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)

    // download options
    blockSize: 4 * 1024 * 1024,
    parallelism: 5
  })
```

Also we should provide high-level functions to downloads into files for NodeJS.

TODO: investigate the scenario when user-allocated buffer is smaller than the
size of the blob being downloaded.

```typescript
  const url = "https://url.to.blob/";
  const buf = Buffer.alloc(size);
  // anonymous access
  await downloadBlobFromUrlToBuffer(url, buf);

```

## Make parameters optional with reasonable default values when possible

**Before**:

```typescript
  const downloadBlockBlobResponse = await blobURL.download(Aborter.none, 0); // offset
```

**After**:

```typescript
  // use Aborter.none if aborter parameter not specified.
  // start from position 0 if position parameter not specified.
  const downloadBlockBlobResponse = await blobURL.download();
```

**Before**

```typescript
  const uploadBlobResponse = await blockBlobURL.upload(
    Aborter.none,
    content,
    content.length
  );
```

**After**

```typescript
  const uploadBlobResponse = await blockBlobURL.upload(content);
```

Note: some parameters may not have known `.length` or `.size`.

## Provide convenience helpers to download response into File, string, Blob, or Buffer

**Before**:

```typescript
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

  // A helper method used to read a Node.js readable stream into string
  async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", data => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }
```

**After**:

```typescript
  const content = await downloadBlockBlobResponse.text(); // also, .blob() and .buffer()
  console.log("Downloaded blob content", content);
```

## Procedural or OOP?

Move `fromXxxxxURL()` static methods to be instance methods of containing
resources. It looks more logical.

**Before**

```typescript
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);
```

**After**:

```typescript
  const blockBlobURL = containerURL.createBlockBlobURL(blobName);
```

## Remove `I-` prefix from interface name

It's an anti-pattern in TypeScript world even though tslint has this (adding `I-`
prefix for interface names) as a recommended rule.

**Before**:

```typescript
  export interface INewPipelineOptions {
```

**After**:

```typescript
  export interface NewPipelineOptions {
```

## E2E basic example

**Before**:

```typescript
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

async function main() {
  // Enter your storage account name and shared key
  const account = "account";
  const accountKey = "accountkey";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use TokenCredential with OAuth token
  const tokenCredential = new TokenCredential("token");
  tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);

  // List containers
  const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  let marker;
  do {
    const listContainersResponse = await serviceURL.listContainersSegment(
      Aborter.none,
      marker
    );

    marker = listContainersResponse.nextMarker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  const createContainerResponse = await containerURL.create(Aborter.none);
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const uploadBlobResponse = await blockBlobURL.upload(
    Aborter.none,
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // List blobs
  marker = undefined;
  do {
    const listBlobsResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      marker
    );

    marker = listBlobsResponse.nextMarker;
    for (const blob of listBlobsResponse.segment.blobItems) {
      console.log(`Blob: ${blob.name}`);
    }
  } while (marker);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobURL.download(Aborter.none, 0);
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

  // Delete container
  await containerURL.delete(Aborter.none);

  console.log("deleted container");
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", data => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
```

**After**:

```typescript
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
```
