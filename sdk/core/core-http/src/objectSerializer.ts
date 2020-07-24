// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ObjectSerializer {

  /**
   * Reads the binary representation into an object conforming to returnType schema.
   */
  deserialize(stream: any, returnType: object): unknown;

  /**
   * Converts the provided value to its binary representation and write it to stream.
   */
  serialize(stream: any, value: unknown): void;
}
