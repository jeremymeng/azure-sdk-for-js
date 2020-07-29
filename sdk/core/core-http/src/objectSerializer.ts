// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A Readable stream abstraction for both NodeJS and browsers.
 */
export interface CommonReadable {
  [Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array>
}

/**
 * A Readable stream abstraction for both NodeJS and browsers.
 */
export interface CommonWritable {
  /**
   * Writes chunk of bytes.
   */
  write(chunk: Uint8Array): Promise<void>;
}


export interface ObjectSerializer {

  /**
   * Reads the binary representation into an object conforming to returnType schema.
   */
  deserialize<T = unknown>(stream: CommonReadable, returnType: object): T;

  /**
   * Converts the provided value to its binary representation and write it to stream.
   */
  serialize(stream: CommonWritable, value: unknown): void;
}
