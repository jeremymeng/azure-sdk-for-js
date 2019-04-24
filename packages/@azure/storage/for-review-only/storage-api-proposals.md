# Storage JS/TS API Improvement Proposal (Blob)

## Current API

Resource-based

- `ServiceURL`
- `ContainerURL`
- `BlobURL`
  - `AppendBlockURL`
  - `BlockBlobURL`
  - `PageBlobURL`

All derives from a base class `StorageURL`.

There are also high level helpers at module level: 
- `downloadBlobToBuffer()`
- `uploadBrowserDataToBlockBlob()`
- `uploadFileToBlockBlob()`
- `uploadStreamToBlockBlob()`

## Client names?

### Rename `ServiceURL` to `BlobServiceClient`?

There are three `ServiceURL` in storage libraries for three different types of
blob storage (Blob, File, and Queue). Even though they are packed in different
packages, having different and explicit names could help (e.g., using more than
one in the same code file).

**After**
- `BlobServiceClient`
- `FileServiceClient`
- `QueueServiceClient`

Anyway we will probably use the same/similar names as in other languages.

## Don't create pipeline explicitly for default pipeline

**Before**

```typescript
  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);

  // List containers
  const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
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

Proposed constructor example:

  ``` typescript
  constructor(url: string, credentialOrPipeline: Credential | Pipeline, pipelineOptions?: INewPipelineOptions)
  ```

  - If the second argument is of type `Credential` or `undefined`, a default
    storage client pipeline is created with the given credential or
    `AnonymousCredential` in the `undefined` case and the pipeline options are
    used to create the instance.
  - otherwise, the instance is created with the custom pipeline passed in and
    the third argument is ignored.

Also consider renaming `newPipeline()` to `createDefaultPipeline()`.

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

Note that in this proposal we return the containers to the users, instead of
them having to retrieve them from the `ListContainerResponse` object.

Get all the items (possibly bad, would get EVERYTHING)

```typescript

  const items = await listItems(Aborter.none);
```

And resumable:

```typescript
async function doListBlobs() {

  let iter = listBlobs();

  for await (let blob of iter) {
    // process a blob or two, then...
    break;
  }

  // sometime later, resume where we left off...
  let iter2 = listBlobs({ restartPoint: iter.restartPoint });
}
```

Prototype:

```typescript
interface RestartPoint {
  nextMarker: string,
  lastIndex: number
}

interface ResumableAsyncIterableIterator<T> extends AsyncIterableIterator<T> {
  restartPoint: RestartPoint
}

interface Blob {
  name: string,
  contents: string
}

function listBlobs(options?: {restartPoint?: RestartPoint}): ResumableAsyncIterableIterator<Blob> {
  const iter: ResumableAsyncIterableIterator<Blob> = (async function* items(): AsyncIterableIterator<Blob> {
    do {
      const listContainersResponse = await serviceURL.listContainersSegment(
        Aborter.none,
        iter.nextMarker
      );

      const items = listContainersResponse.containerItems;
      for (let i = iter.lastIndex; i < items.length; i++) {
        iter.lastIndex = i;
        yield items[i];
      }

      iter.restartPoint.nextMarker = listContainersResponse.nextMarker;
      iter.restartPoint.lastIndex = 0;
    } while (iter.restartPoint.nextMarker);
  })() as any;

  iter.restartPoint = { ... restartPoint };
  return iter;
}
```


## Make all Aborter parameters optional with default value

Question: what should be the default value? `Aborter.none`, or an aborter with
certain timeout for some methods (e.g., uploading/downloading).

**Before**:

```typescript
  const createContainerResponse = await containerURL.create(Aborter.none);
```

**After**:

```typescript
  const createContainerResponse = await containerURL.create();
```

There are several options to achive this:

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

02. Option 2. Pass `Aborter` as part of the options interface.

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

    **Question**: do we also want to use this option for methods that currently
    don’t take an options parameter? i.e.,

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

    where `IServiceGetPropertiesOptions` contains only one `abortSignal?: Aborter`
    property.

03. Option 3. Use intersection type.

    ```typescript
      public async appendBlock(
        body: HttpRequestBody,
        contentLength: number,
        options: IAppendBlobAppendBlockOptions & CancellationOptions = {}
      ): Promise<Models.AppendBlobAppendBlockResponse> {
    ```

    where `CancellationOptions` just holds the aborter:

    ```typescript
      export interface CancellationOptions {
        /**
         * Aborter instance to cancel request. It can be created with Aborter.none
         * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
         * about request cancellation.
         *
         * @type {Aborter}
         * @memberof CancellationOptions
         */
        abortSignal? : Aborter;
      }
    ```

    We like this option.

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
        ...
    ```

    - when the an `Aborter` type instance is passed as the third argument, the fourth
    argument`options` is the optional `IAppendBlobAppendBlockOptions` parameter;

    - otherwise, the third argument, if specified, is of the type
    `IAppendBlobAppendBlockOptions` parameter. The fourth argument `options`
    argument is ignored, and `options` got re-assigned to have value `aborterOrOptions || {}`.

    Cons: There would be a lot of `if` checking in every methods.

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

## Provide convenience helpers to convert download response into string, Blob, or Buffer

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

## Rename `XxxxxxURL.create()` to be explicit on what is being created

**Before**:

```typescript
  await containerURL.create();
  await appendBlockURL.create();
  await pageBlockURL.create();
```

**After**:

```typescript
  await containerURL.createContainer();
  await appendBlobURL.createAppendBlob();
  await pageBlobURL.createPageBlob();
```

Note: these creation methods could be moved one level up if we are going with
the hierarchical approach.

## Procedural or OOP?

Move `fromXxxxxURL()` static methods to be instance methods of containing
resources to make it more Object-Oriented?

**Before**

```typescript
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);
```

**After**:

```typescript
  const blockBlobURL = containerURL.createBlockBlobURL(blobName);
```

## Top-level convenience methods

Currently there are top-level methods for uploading and downloading blobs which
take `BlobURL` parameters.

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

It would be more convenient to just take a url and optional credential/pipeline
options. For example,

```typescript
  export function downloadBlobFromUrlToBuffer(
    buffer: Buffer,
    url: string,
    offset?: number,
    count?: number,
    options?: IDownloadFromBlobOptions & CredentialOptions & INewPipelineOptions): Promise<void>;
```

**Before**:

```typescript
  const url = "https://url.to.blob/";
  const buf = Buffer.alloc(size);
  const pipeline = StorageURL.newPipeline(credential, pipelineOptions);
  const blockBlobURL = new BlockBlobURL(url, pipeline);
  await downloadBlobToBuffer(Aborter.none, buf, url, blockBlobURL, 0);
```

**After**:

```typescript
  const url = "https://url.to.blob/";
  const buf = Buffer.alloc(size);
  // anonymous access
  await downloadBlobFromUrlToBuffer(buf, url);

  // with credential and pipeline options
  await downloadBlobFromUrlToBuffer(buf, url, {
    // credential options
    credential: credential,

    // new pipeline options
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)

    // download options
    // blockSize: 4 * 1024 * 1024,
    // parallelism: 5
    })
```

Alias types can also be used if we think the number of types to intersect is too many

```typescript
type DownloadBlobFromUrlToBufferOptions = IDownloadFromBlobOptions & CredentialOptions & INewPipelineOptions
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
