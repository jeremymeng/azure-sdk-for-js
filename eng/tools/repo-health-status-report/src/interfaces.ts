// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type DevopsBuildStatus =
  | "abandoned"
  | "canceled"
  | "failed"
  | "skipped"
  | "succeeded"
  | "succeededWithIssues"
  | "UNKNOWN";

export type DevopsBuildStatus =
  | "succeeded"
  | "failed"
  | "canceled"
  | "none"
  | "partiallySucceeded"
  | "UNKNOWN";

export type CheckStatus = "PASS" | "FAIL" | "WARNING" | "DISABLED" | "UNKNOWN";

export type LibraryStatus = "NEEDS_ACTION" | "BLOCKED" | "GOOD";

export type CheckStatus = "PASS" | "FAIL" | "WARNING" | "DISABLED" | "UNKNOWN";

export interface Status {
  status: CheckStatus;
  link?: string;
}

export interface CheckStatus {
  status: DevopsTaskStatus;
  log?: string;
}

export interface WeeklyTestPipelineResult {
  id: number;
  link: string;
  result: DevopsBuildStatus;
  lint: CheckStatus;
  weeklyTest: CheckStatus;
}

export interface TestsPipelineResult {
  id: number;
  link: string;
  result: DevopsBuildStatus;
  tests: CheckStatus;
  samples: CheckStatus;
}

export interface CiPipelineResult {
  id: number;
  link: string;
  result: DevopsBuildStatus;
  ci: CheckStatus;
  lint: CheckStatus;
}

export interface PipelineResults {
  weeklyTest: WeeklyTestPipelineResult;
  tests: TestsPipelineResult;
  ci: CiPipelineResult;
}

export interface IssueDetails {
  num: number;
  link: string;
}

export interface SlaStatus {
  question: IssueDetails;
  `open > 30 days`: IssueDetails;
  bug: IssueDetails;
  `open > 90 days`: IssueDetails;
}

export interface PackageStatus {
  status: LibraryStatus;
  path: string;
  label?: string;
  sla?: SlaStatus;
  customerIssues?: IssueDetails;
  sdkOwned: boolean;
  lint: Status;
  tests: Status;
  samples: Status;
  ci: Status;
}

export type PipelineResultsUnion = CiPipelineResult | TestsPipelineResult | WeeklyTestPipelineResult;
