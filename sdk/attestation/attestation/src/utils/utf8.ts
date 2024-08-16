// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const decoder = new TextDecoder("ascii");
const encoder = new TextEncoder();

const decode: (buffer: ArrayBuffer) => string = (buffer) => decoder.decode(buffer);
const encode: (str: string) => Uint8Array = (str) => encoder.encode(str);

/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function stringToBytes(content: string): Uint8Array {
  return encode(content);
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function bytesToString(content: Uint8Array): string {
  return decode(content);
}
