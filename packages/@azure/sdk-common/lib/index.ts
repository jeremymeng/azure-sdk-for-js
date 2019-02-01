//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import azureCommon from "./common/common.node";

const Constants = azureCommon.Constants;
const StorageUtilities = azureCommon.StorageUtilities;
const AccessCondition = azureCommon.AccessCondition;

const SR = azureCommon.SR;
const Logger = azureCommon.Logger;
const WebResource = azureCommon.WebResource;
const validate = azureCommon.validate;
const date = azureCommon.date;
const TokenCredential = azureCommon.TokenCredential;

// Other filters
const LinearRetryPolicyFilter = azureCommon.LinearRetryPolicyFilter;
const ExponentialRetryPolicyFilter = azureCommon.ExponentialRetryPolicyFilter;
const RetryPolicyFilter = azureCommon.RetryPolicyFilter;

export {
  Constants,
  StorageUtilities,
  AccessCondition,
  SR,
  Logger,
  WebResource,
  validate,
  date,
  TokenCredential,
  // Other filters
  LinearRetryPolicyFilter,
  ExponentialRetryPolicyFilter,
  RetryPolicyFilter
};
