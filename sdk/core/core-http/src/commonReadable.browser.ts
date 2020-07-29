// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonReadable } from "./objectSerializer";
import { HttpOperationResponse } from './httpOperationResponse';

export class BrowserReadable implements CommonReadable {
  constructor(private readonly _blob: Blob) { }

  async *toIterator() {
    const reader = this._blob.stream().getReader();
    let {value: chunk, done: readerDone} = await reader.read();
    while(!readerDone) {
      if (!chunk) {
        yield chunk;
      }
      ({ value: chunk, done: readerDone} = await reader.read());
    }
  }

  [Symbol.asyncIterator]() {
    return this.toIterator();
  }
}

export async function responseToCommonReadable(response: HttpOperationResponse): Promise<CommonReadable> {
  if (!response.blobBody) {
    throw new Error("Expect valid blobBody in response")
  }

  return new BrowserReadable(await response.blobBody);
}
