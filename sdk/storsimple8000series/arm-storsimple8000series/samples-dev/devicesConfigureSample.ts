/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ConfigureDeviceRequest } from "@azure/arm-storsimple8000series";
import { StorSimple8000SeriesManagementClient } from "@azure/arm-storsimple8000series";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Complete minimal setup before using the device.
 *
 * @summary Complete minimal setup before using the device.
 * x-ms-original-file: specification/storsimple8000series/resource-manager/Microsoft.StorSimple/stable/2017-06-01/examples/DevicesConfigure.json
 */
async function devicesConfigure() {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "ManagerForSDKTest1";
  const parameters: ConfigureDeviceRequest = {
    currentDeviceName: "Device001ForSDKTest",
    friendlyName: "Device001ForSDKTest",
    networkInterfaceData0Settings: {
      controllerOneIp: "10.168.220.228",
      controllerZeroIp: "10.168.220.227",
    },
    timeZone: "Pacific Standard Time",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorSimple8000SeriesManagementClient(credential, subscriptionId);
  const result = await client.devices.beginConfigureAndWait(
    resourceGroupName,
    managerName,
    parameters,
  );
  console.log(result);
}

devicesConfigure().catch(console.error);
