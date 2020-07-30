// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonReadable } from "./objectSerializer";
import { HttpOperationResponse } from './httpOperationResponse';

export class BrowserReadable implements CommonReadable {
  constructor(private readonly _stream: ReadableStream) { }

  async *[Symbol.asyncIterator]() {
    const reader = this._stream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export async function responseToCommonReadable(response: HttpOperationResponse): Promise<CommonReadable> {
  if (!response.blobBody) {
    throw new Error("Expect valid blobBody in response")
  }

  const stream = (await response.blobBody).stream();
  return new BrowserReadable(stream);
}
