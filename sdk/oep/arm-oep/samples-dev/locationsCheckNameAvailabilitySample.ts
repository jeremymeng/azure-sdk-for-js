/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { CheckNameAvailabilityRequest } from "@azure/arm-oep";
import { OpenEnergyPlatformManagementServiceAPIs } from "@azure/arm-oep";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Checks the name availability of the resource with requested resource name.
 *
 * @summary Checks the name availability of the resource with requested resource name.
 * x-ms-original-file: specification/oep/resource-manager/Microsoft.OpenEnergyPlatform/preview/2021-06-01-preview/examples/Locations_CheckNameAvailability.json
 */
async function locationsCheckNameAvailability() {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const body: CheckNameAvailabilityRequest = {
    name: "sample-name",
    type: "Microsoft.OEP/oepResource",
  };
  const credential = new DefaultAzureCredential();
  const client = new OpenEnergyPlatformManagementServiceAPIs(credential, subscriptionId);
  const result = await client.locations.checkNameAvailability(body);
  console.log(result);
}

locationsCheckNameAvailability().catch(console.error);
