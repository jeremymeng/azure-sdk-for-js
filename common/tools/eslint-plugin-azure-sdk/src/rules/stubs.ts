// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Definitions for typescript-estree types that are reachable via public
// api surface but not exported

import { TSESTree } from "@typescript-eslint/utils";
import { TSESTreeToTSNode } from "@typescript-eslint/typescript-estree";

export interface ParserWeakMap<TKey, TValueBase> {
  get<TValue extends TValueBase>(key: TKey): TValue;
  has(key: unknown): boolean;
}

export interface ParserWeakMapESTreeToTSNode<TKey extends TSESTree.Node = TSESTree.Node> {
  get<TKeyBase extends TKey>(key: TKeyBase): TSESTreeToTSNode<TKeyBase>;
  has(key: unknown): boolean;
}
