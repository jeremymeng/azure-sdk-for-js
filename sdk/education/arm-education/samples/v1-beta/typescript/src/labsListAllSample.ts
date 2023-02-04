/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  LabsListAllOptionalParams,
  EducationManagementClient
} from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a list of labs associated with the provided billing account name and billing profile name.
 *
 * @summary Get a list of labs associated with the provided billing account name and billing profile name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabList.json
 */
async function labList() {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const includeBudget = false;
  const options: LabsListAllOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (let item of client.labs.listAll(
    billingAccountName,
    billingProfileName,
    options
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Get a list of labs associated with the provided billing account name and billing profile name.
 *
 * @summary Get a list of labs associated with the provided billing account name and billing profile name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListIncludeBudget.json
 */
async function labListIncludeBudget() {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const includeBudget = true;
  const options: LabsListAllOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (let item of client.labs.listAll(
    billingAccountName,
    billingProfileName,
    options
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  labList();
  labListIncludeBudget();
}

main().catch(console.error);
