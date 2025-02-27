/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { RenewCertificateInput } from "@azure/arm-recoveryservices-siterecovery";
import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Renews the connection certificate for the ASR replication fabric.
 *
 * @summary Renews the connection certificate for the ASR replication fabric.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2023-08-01/examples/ReplicationFabrics_RenewCertificate.json
 */
async function renewsCertificateForTheFabric(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceName = "vault1";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] || "resourceGroupPS1";
  const fabricName = "cloud1";
  const renewCertificate: RenewCertificateInput = {
    properties: { renewCertificateType: "Cloud" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationFabrics.beginRenewCertificateAndWait(
    resourceName,
    resourceGroupName,
    fabricName,
    renewCertificate,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await renewsCertificateForTheFabric();
}

main().catch(console.error);
