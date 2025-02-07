/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Cancels all the payment terms on billing account that falls after the cancellation date in the request. Currently, cancel payment terms is only served by admin actions and is not a self-serve action.
 *
 * @summary Cancels all the payment terms on billing account that falls after the cancellation date in the request. Currently, cancel payment terms is only served by admin actions and is not a self-serve action.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/paymentTermsCancel.json
 */
async function paymentTermsCancel(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const parameters: Date = new Date("2023-01-05T22:39:34.2606750Z");
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingAccounts.beginCancelPaymentTermsAndWait(
    billingAccountName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await paymentTermsCancel();
}

main().catch(console.error);
