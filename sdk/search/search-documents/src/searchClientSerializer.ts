// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ObjectSerializer } from "@azure/core-http";
import { deserialize, serialize } from "./serialization";

export class SearchClientSerializer implements ObjectSerializer {
  deserialize(stream: any, _returnType: object): unknown {
    return deserialize<unknown>(stream);
  }
  serialize(_stream: any, value: unknown): void {
    serialize(value);
  }
}
