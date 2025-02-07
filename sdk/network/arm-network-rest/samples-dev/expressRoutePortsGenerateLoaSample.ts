// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ExpressRoutePortsGenerateLOAParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generate a letter of authorization for the requested ExpressRoutePort resource.
 *
 * @summary Generate a letter of authorization for the requested ExpressRoutePort resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/GenerateExpressRoutePortsLOA.json
 */
async function generateExpressRoutePortLoa() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const expressRoutePortName = "portName";
  const options: ExpressRoutePortsGenerateLOAParameters = {
    body: { customerName: "customerName" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRoutePorts/{expressRoutePortName}/generateLoa",
      subscriptionId,
      resourceGroupName,
      expressRoutePortName,
    )
    .post(options);
  console.log(result);
}

generateExpressRoutePortLoa().catch(console.error);
