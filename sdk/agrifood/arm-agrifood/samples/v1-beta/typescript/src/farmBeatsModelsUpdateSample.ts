/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  FarmBeatsUpdateRequestModel,
  AgriFoodMgmtClient
} from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Update a FarmBeats resource.
 *
 * @summary Update a FarmBeats resource.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/FarmBeatsModels_Update.json
 */
async function farmBeatsModelsUpdate() {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const farmBeatsResourceName = "examples-farmBeatsResourceName";
  const body: FarmBeatsUpdateRequestModel = {
    tags: { key1: "value1", key2: "value2" }
  };
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const result = await client.farmBeatsModels.beginUpdateAndWait(
    resourceGroupName,
    farmBeatsResourceName,
    body
  );
  console.log(result);
}

farmBeatsModelsUpdate().catch(console.error);

/**
 * This sample demonstrates how to Update a FarmBeats resource.
 *
 * @summary Update a FarmBeats resource.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/FarmBeatsModels_UpdateWithSensor.json
 */
async function farmBeatsModelsUpdateWithSensor() {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const farmBeatsResourceName = "examples-farmBeatsResourceName";
  const body: FarmBeatsUpdateRequestModel = {
    identity: { type: "SystemAssigned" },
    properties: { sensorIntegration: { enabled: "True" } },
    tags: { key1: "value1", key2: "value2" }
  };
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const result = await client.farmBeatsModels.beginUpdateAndWait(
    resourceGroupName,
    farmBeatsResourceName,
    body
  );
  console.log(result);
}

farmBeatsModelsUpdateWithSensor().catch(console.error);
