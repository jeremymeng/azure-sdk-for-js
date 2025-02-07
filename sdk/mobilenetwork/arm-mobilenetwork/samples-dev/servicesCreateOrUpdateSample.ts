/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Service } from "@azure/arm-mobilenetwork";
import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a service. Must be created in the same location as its parent mobile network.
 *
 * @summary Creates or updates a service. Must be created in the same location as its parent mobile network.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/ServiceCreate.json
 */
async function createService() {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const mobileNetworkName = "testMobileNetwork";
  const serviceName = "TestService";
  const parameters: Service = {
    location: "eastus",
    pccRules: [
      {
        ruleName: "default-rule",
        rulePrecedence: 255,
        ruleQosPolicy: {
          fiveQi: 9,
          allocationAndRetentionPriorityLevel: 9,
          maximumBitRate: { downlink: "1 Gbps", uplink: "500 Mbps" },
          preemptionCapability: "NotPreempt",
          preemptionVulnerability: "Preemptable",
        },
        serviceDataFlowTemplates: [
          {
            direction: "Uplink",
            ports: [],
            remoteIpList: ["10.3.4.0/24"],
            templateName: "IP-to-server",
            protocol: ["ip"],
          },
        ],
        trafficControl: "Enabled",
      },
    ],
    servicePrecedence: 255,
    serviceQosPolicy: {
      fiveQi: 9,
      allocationAndRetentionPriorityLevel: 9,
      maximumBitRate: { downlink: "1 Gbps", uplink: "500 Mbps" },
      preemptionCapability: "NotPreempt",
      preemptionVulnerability: "Preemptable",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const result = await client.services.beginCreateOrUpdateAndWait(
    resourceGroupName,
    mobileNetworkName,
    serviceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createService();
}

main().catch(console.error);
