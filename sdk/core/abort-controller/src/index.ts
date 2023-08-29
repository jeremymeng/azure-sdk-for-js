// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Changes to Aborter
// * Rename Aborter to AbortSignal
// * Remove withValue and getValue - async context should be solved differently/wholistically, not tied to cancellation
// * Remove withTimeout, it's moved to the controller
// * AbortSignal constructor no longer takes a parent. Cancellation graphs are created from the controller.

// Potential changes to align with DOM Spec
// * dispatchEvent on Signal

export { AbortController, AbortError } from "./AbortController.js";
export { AbortSignal, AbortSignalLike } from "./AbortSignal.js";
