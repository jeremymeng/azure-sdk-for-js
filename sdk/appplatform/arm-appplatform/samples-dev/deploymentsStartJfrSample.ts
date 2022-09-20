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
  DiagnosticParameters,
  AppPlatformManagementClient
} from "@azure/arm-appplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Start JFR
 *
 * @summary Start JFR
 * x-ms-original-file: specification/appplatform/resource-manager/Microsoft.AppPlatform/preview/2022-09-01-preview/examples/Deployments_StartJFR.json
 */
async function deploymentsStartJfr() {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const serviceName = "myservice";
  const appName = "myapp";
  const deploymentName = "mydeployment";
  const diagnosticParameters: DiagnosticParameters = {
    appInstance: "myappinstance",
    duration: "60s",
    filePath: "/byos/diagnose"
  };
  const credential = new DefaultAzureCredential();
  const client = new AppPlatformManagementClient(credential, subscriptionId);
  const result = await client.deployments.beginStartJFRAndWait(
    resourceGroupName,
    serviceName,
    appName,
    deploymentName,
    diagnosticParameters
  );
  console.log(result);
}

deploymentsStartJfr().catch(console.error);
