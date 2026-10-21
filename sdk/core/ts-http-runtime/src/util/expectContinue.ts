// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest } from "../interfaces.js";

export function headerPairs(headers: readonly unknown[]): unknown[][] {
  // Node accepts either [[name, value], ...] or a flat [name, value, ...] list.
  return Array.isArray(headers[0])
    ? (headers as unknown[][])
    : Array.from({ length: Math.ceil(headers.length / 2) }, (_, i) => [
        headers[i * 2],
        headers[i * 2 + 1],
      ]);
}

export function headerValues(headers: unknown, name: string): unknown[] {
  if (Array.isArray(headers)) {
    return headerPairs(headers)
      .filter(([key]) => typeof key === "string" && key.toLowerCase() === name)
      .flatMap(([, value]) => value);
  }
  if (headers && typeof headers === "object") {
    // Node's setHeader replaces an earlier spelling of the same object key.
    let value: unknown;
    for (const [key, entry] of Object.entries(headers)) {
      if (key.toLowerCase() === name) value = entry;
    }
    return value === undefined ? [] : Array.isArray(value) ? value : [value];
  }
  return [];
}

export function effectiveHeaders(request: PipelineRequest): unknown {
  return request.requestOverrides && "headers" in request.requestOverrides
    ? request.requestOverrides.headers
    : request.headers.toJSON({ preserveCase: true });
}

export function hasExpectContinue(request: PipelineRequest): boolean {
  return headerValues(effectiveHeaders(request), "expect").some(
    (value) =>
      typeof value === "string" &&
      value.split(",").some((token) => token.trim().toLowerCase() === "100-continue"),
  );
}

function withoutContinue(value: unknown): unknown {
  if (Array.isArray(value)) {
    const values = value.map(withoutContinue).filter((entry) => entry !== undefined);
    return values.length ? values : undefined;
  }
  if (typeof value !== "string") return value;
  const tokens = value.split(",").filter((token) => token.trim().toLowerCase() !== "100-continue");
  return tokens.length ? tokens.join(",") : undefined;
}

// Returns undefined when the header must be dropped from a body-less redirected request.
function stripBodyHeader(name: unknown, value: unknown): unknown {
  if (typeof name !== "string") return undefined;
  const lower = name.toLowerCase();
  if (lower === "content-length" || lower === "transfer-encoding") return undefined;
  return lower === "expect" ? withoutContinue(value) : value;
}

export function removeBodyHeaders(request: PipelineRequest): void {
  const expect = withoutContinue(request.headers.get("Expect"));
  if (typeof expect === "string") request.headers.set("Expect", expect);
  else request.headers.delete("Expect");
  request.headers.delete("Content-Length");
  request.headers.delete("Transfer-Encoding");
  const overrides = request.requestOverrides;
  if (!overrides) return;
  const headers = overrides.headers;
  if (Array.isArray(headers)) {
    const pairs = headerPairs(headers).flatMap(([name, value]) => {
      const result = stripBodyHeader(name, value);
      return result === undefined ? [] : [[name, result]];
    });
    request.requestOverrides = {
      ...overrides,
      method: "GET",
      headers: Array.isArray(headers[0]) ? pairs : pairs.flat(),
    };
  } else if (headers && typeof headers === "object") {
    const entries = Object.entries(headers).flatMap(([name, value]) => {
      const result = stripBodyHeader(name, value);
      return result === undefined ? [] : [[name, result]];
    });
    request.requestOverrides = {
      ...overrides,
      method: "GET",
      headers: Object.fromEntries(entries),
    };
  } else {
    request.requestOverrides = { ...overrides, method: "GET" };
  }
}
