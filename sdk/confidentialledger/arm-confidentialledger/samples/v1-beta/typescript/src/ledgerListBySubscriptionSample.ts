/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ConfidentialLedgerClient } from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the properties of all Confidential Ledgers.
 *
 * @summary Retrieves the properties of all Confidential Ledgers.
 * x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2023-06-28-preview/examples/ConfidentialLedger_ListBySub.json
 */
async function confidentialLedgerListBySub() {
  const subscriptionId =
    process.env["CONFIDENTIALLEDGER_SUBSCRIPTION_ID"] ||
    "0000000-0000-0000-0000-000000000001";
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.ledger.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  confidentialLedgerListBySub();
}

main().catch(console.error);
