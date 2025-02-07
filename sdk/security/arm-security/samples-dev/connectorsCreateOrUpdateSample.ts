/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ConnectorSetting } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create a cloud account connector or update an existing one. Connect to your cloud account. For AWS, use either account credentials or role-based authentication. For GCP, use account organization credentials.
 *
 * @summary Create a cloud account connector or update an existing one. Connect to your cloud account. For AWS, use either account credentials or role-based authentication. For GCP, use account organization credentials.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2020-01-01-preview/examples/Connectors/CreateUpdateAwsAssumeRoleConnectorSubscription_example.json
 */
async function awsAssumeRoleCreateACloudAccountConnectorForASubscription() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const connectorName = "aws_dev2";
  const connectorSetting: ConnectorSetting = {
    authenticationDetails: {
      authenticationType: "awsAssumeRole",
      awsAssumeRoleArn: "arn:aws:iam::81231569658:role/AscConnector",
      awsExternalId: "20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    },
    hybridComputeSettings: {
      autoProvision: "On",
      proxyServer: { ip: "167.220.197.140", port: "34" },
      region: "West US 2",
      resourceGroupName: "AwsConnectorRG",
      servicePrincipal: {
        applicationId: "ad9bcd79-be9c-45ab-abd8-80ca1654a7d1",
        secret: "<secret>",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.connectors.createOrUpdate(connectorName, connectorSetting);
  console.log(result);
}

/**
 * This sample demonstrates how to Create a cloud account connector or update an existing one. Connect to your cloud account. For AWS, use either account credentials or role-based authentication. For GCP, use account organization credentials.
 *
 * @summary Create a cloud account connector or update an existing one. Connect to your cloud account. For AWS, use either account credentials or role-based authentication. For GCP, use account organization credentials.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2020-01-01-preview/examples/Connectors/CreateUpdateAwsCredConnectorSubscription_example.json
 */
async function awsCredCreateACloudAccountConnectorForASubscription() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const connectorName = "aws_dev1";
  const connectorSetting: ConnectorSetting = {
    authenticationDetails: {
      authenticationType: "awsCreds",
      awsAccessKeyId: "AKIARPZCNODDNAEQFSOE",
      awsSecretAccessKey: "<awsSecretAccessKey>",
    },
    hybridComputeSettings: {
      autoProvision: "On",
      proxyServer: { ip: "167.220.197.140", port: "34" },
      region: "West US 2",
      resourceGroupName: "AwsConnectorRG",
      servicePrincipal: {
        applicationId: "ad9bcd79-be9c-45ab-abd8-80ca1654a7d1",
        secret: "<secret>",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.connectors.createOrUpdate(connectorName, connectorSetting);
  console.log(result);
}

/**
 * This sample demonstrates how to Create a cloud account connector or update an existing one. Connect to your cloud account. For AWS, use either account credentials or role-based authentication. For GCP, use account organization credentials.
 *
 * @summary Create a cloud account connector or update an existing one. Connect to your cloud account. For AWS, use either account credentials or role-based authentication. For GCP, use account organization credentials.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2020-01-01-preview/examples/Connectors/CreateUpdateGcpCredentialsConnectorSubscription_example.json
 */
async function gcpCredentialsCreateACloudAccountConnectorForASubscription() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const connectorName = "gcp_dev";
  const connectorSetting: ConnectorSetting = {
    authenticationDetails: {
      type: "service_account",
      authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
      authUri: "https://accounts.google.com/o/oauth2/auth",
      authenticationType: "gcpCredentials",
      clientEmail: "asc-135@asc-project-1234.iam.gserviceaccount.com",
      clientId: "105889053725632919854",
      clientX509CertUrl:
        "https://www.googleapis.com/robot/v1/metadata/x509/asc-135%40asc-project-1234.iam.gserviceaccount.com",
      organizationId: "AscDemoOrg",
      privateKey: "******",
      privateKeyId: "6efg587hra2568as34d22326b044cc20dc2af",
      projectId: "asc-project-1234",
      tokenUri: "https://oauth2.googleapis.com/token",
    },
    hybridComputeSettings: { autoProvision: "Off" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.connectors.createOrUpdate(connectorName, connectorSetting);
  console.log(result);
}

async function main() {
  await awsAssumeRoleCreateACloudAccountConnectorForASubscription();
  await awsCredCreateACloudAccountConnectorForASubscription();
  await gcpCredentialsCreateACloudAccountConnectorForASubscription();
}

main().catch(console.error);
