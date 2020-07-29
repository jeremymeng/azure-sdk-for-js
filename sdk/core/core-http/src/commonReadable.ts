// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonReadable } from "./objectSerializer";
import { HttpOperationResponse } from './httpOperationResponse';

export class NodeReadable implements CommonReadable {
  constructor(private readonly _stream: NodeJS.ReadableStream) { }

  async *toIterator() {
    for await (const chunk of this._stream) {
      if (typeof chunk === "string") {
        yield Buffer.from(chunk);
      }
      else {
        yield chunk;
      }
    }
  }

  [Symbol.asyncIterator]() {
    return this.toIterator();
  }
}

export async function responseToCommonReadable(response: HttpOperationResponse): Promise<CommonReadable> {
  if (!response.readableStreamBody) {
    throw new Error("Expect valid readableStreamBody in response")
  }

  return new NodeReadable(response.readableStreamBody);
}
