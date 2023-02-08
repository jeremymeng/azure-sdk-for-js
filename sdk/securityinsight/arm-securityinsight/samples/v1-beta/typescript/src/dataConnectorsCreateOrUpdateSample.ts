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
  CodelessApiPollingDataConnector,
  Dynamics365DataConnector,
  CodelessUiDataConnector,
  TiTaxiiDataConnector,
  OfficePowerBIDataConnector,
  Office365ProjectDataConnector,
  OfficeDataConnector,
  TIDataConnector,
  SecurityInsights
} from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateAPIPolling.json
 */
async function createsOrUpdatesAApiPollingDataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "316ec55e-7138-4d63-ab18-90c8a60fd1c8";
  const dataConnector: CodelessApiPollingDataConnector = {
    connectorUiConfig: {
      availability: { isPreview: true, status: 1 },
      connectivityCriteria: [{ type: "SentinelKindsV2", value: [] }],
      dataTypes: [
        {
          name: "{{graphQueriesTableName}}",
          lastDataReceivedQuery:
            "{{graphQueriesTableName}}\n            | summarize Time = max(TimeGenerated)\n            | where isnotempty(Time)"
        }
      ],
      descriptionMarkdown:
        "The GitHub audit log connector provides the capability to ingest GitHub logs into Azure Sentinel. By connecting GitHub audit logs into Azure Sentinel, you can view this data in workbooks, use it to create custom alerts, and improve your investigation process.",
      graphQueries: [
        {
          baseQuery: "{{graphQueriesTableName}}",
          legend: "GitHub audit log events",
          metricName: "Total events received"
        }
      ],
      graphQueriesTableName: "GitHubAuditLogPolling_CL",
      instructionSteps: [
        {
          description:
            "Enable GitHub audit Logs. \n Follow [this](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create or find your personal key",
          instructions: [
            {
              type: "APIKey",
              parameters: {
                enable: "true",
                userRequestPlaceHoldersInput: [
                  {
                    displayText: "Organization Name",
                    placeHolderName: "{{placeHolder1}}",
                    placeHolderValue: "",
                    requestObjectKey: "apiEndpoint"
                  }
                ]
              }
            }
          ],
          title: "Connect GitHub Enterprise Audit Log to Azure Sentinel"
        }
      ],
      permissions: {
        customs: [
          {
            name: "GitHub API personal token Key",
            description:
              "You need access to GitHub personal token, the key should have 'admin:org' scope"
          }
        ],
        resourceProvider: [
          {
            permissionsDisplayText: "read and write permissions are required.",
            provider: "Microsoft.OperationalInsights/workspaces",
            providerDisplayName: "Workspace",
            requiredPermissions: { delete: true, read: true, write: true },
            scope: "Workspace"
          }
        ]
      },
      publisher: "GitHub",
      sampleQueries: [
        {
          description: "All logs",
          query: "{{graphQueriesTableName}}\n | take 10 <change>"
        }
      ],
      title: "GitHub Enterprise Audit Log"
    },
    kind: "APIPolling",
    pollingConfig: {
      auth: {
        apiKeyIdentifier: "token",
        apiKeyName: "Authorization",
        authType: "APIKey"
      },
      paging: { pageSizeParaName: "per_page", pagingType: "LinkHeader" },
      response: { eventsJsonPaths: ["$"] },
      request: {
        apiEndpoint:
          "https://api.github.com/organizations/{{placeHolder1}}/audit-log",
        headers: { Accept: "application/json", "User-Agent": "Scuba" },
        httpMethod: "Get",
        queryParameters: {
          phrase: "created:{_QueryWindowStartTime}..{_QueryWindowEndTime}"
        },
        queryTimeFormat: "yyyy-MM-ddTHH:mm:ssZ",
        queryWindowInMin: 15,
        rateLimitQps: 50,
        retryCount: 2,
        timeoutInSeconds: 60
      }
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateDynamics365DataConnetor.json
 */
async function createsOrUpdatesADynamics365DataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "c2541efb-c9a6-47fe-9501-87d1017d1512";
  const dataConnector: Dynamics365DataConnector = {
    dataTypes: { dynamics365CdsActivities: { state: "Enabled" } },
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    kind: "Dynamics365",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8"
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateGenericUI.json
 */
async function createsOrUpdatesAGenericUiDataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "316ec55e-7138-4d63-ab18-90c8a60fd1c8";
  const dataConnector: CodelessUiDataConnector = {
    connectorUiConfig: {
      availability: { isPreview: true, status: 1 },
      connectivityCriteria: [
        {
          type: "IsConnectedQuery",
          value: [
            "{{graphQueriesTableName}}\n            | summarize LastLogReceived = max(TimeGenerated)\n            | project IsConnected = LastLogReceived > ago(30d)"
          ]
        }
      ],
      dataTypes: [
        {
          name: "{{graphQueriesTableName}}",
          lastDataReceivedQuery:
            "{{graphQueriesTableName}}\n            | summarize Time = max(TimeGenerated)\n            | where isnotempty(Time)"
        }
      ],
      descriptionMarkdown:
        "The [Qualys Vulnerability Management (VM)](https://www.qualys.com/apps/vulnerability-management/) data connector provides the capability to ingest vulnerability host detection data into Azure Sentinel through the Qualys API. The connector provides visibility into host detection data from vulerability scans. This connector provides Azure Sentinel the capability to view dashboards, create custom alerts, and improve investigation ",
      graphQueries: [
        {
          baseQuery: "{{graphQueriesTableName}}",
          legend: "{{graphQueriesTableName}}",
          metricName: "Total data received"
        }
      ],
      graphQueriesTableName: "QualysHostDetection_CL",
      instructionSteps: [
        {
          description:
            ">**NOTE:** This connector uses Azure Functions to connect to Qualys VM to pull its logs into Azure Sentinel. This might result in additional data ingestion costs. Check the [Azure Functions pricing page](https://azure.microsoft.com/pricing/details/functions/) for details.",
          title: ""
        },
        {
          description:
            ">**(Optional Step)** Securely store workspace and API authorization key(s) or token(s) in Azure Key Vault. Azure Key Vault provides a secure mechanism to store and retrieve key values. [Follow these instructions](https://docs.microsoft.com/azure/app-service/app-service-key-vault-references) to use Azure Key Vault with an Azure Function App.",
          title: ""
        },
        {
          description:
            "**STEP 1 - Configuration steps for the Qualys VM API**\n\n1. Log into the Qualys Vulnerability Management console with an administrator account, select the **Users** tab and the **Users** subtab. \n2. Click on the **New** drop-down menu and select **Users..**\n3. Create a username and password for the API account. \n4. In the **User Roles** tab, ensure the account role is set to **Manager** and access is allowed to **GUI** and **API**\n4. Log out of the administrator account and log into the console with the new API credentials for validation, then log out of the API account. \n5. Log back into the console using an administrator account and modify the API accounts User Roles, removing access to **GUI**. \n6. Save all changes.",
          title: ""
        },
        {
          description:
            "**STEP 2 - Choose ONE from the following two deployment options to deploy the connector and the associated Azure Function**\n\n>**IMPORTANT:** Before deploying the Qualys VM connector, have the Workspace ID and Workspace Primary Key (can be copied from the following), as well as the Qualys VM API Authorization Key(s), readily available.",
          instructions: [
            {
              type: "CopyableLabel",
              parameters: { fillWith: ["WorkspaceId"], label: "Workspace ID" }
            },
            {
              type: "CopyableLabel",
              parameters: { fillWith: ["PrimaryKey"], label: "Primary Key" }
            }
          ],
          title: ""
        },
        {
          description:
            'Use this method for automated deployment of the Qualys VM connector using an ARM Tempate.\n\n1. Click the **Deploy to Azure** button below. \n\n\t[![Deploy To Azure](https://aka.ms/deploytoazurebutton)](https://aka.ms/sentinelqualysvmazuredeploy)\n2. Select the preferred **Subscription**, **Resource Group** and **Location**. \n3. Enter the **Workspace ID**, **Workspace Key**, **API Username**, **API Password** , update the **URI**, and any additional URI **Filter Parameters** (each filter should be separated by an "&" symbol, no spaces.) \n> - Enter the URI that corresponds to your region. The complete list of API Server URLs can be [found here](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf#G4.735348) -- There is no need to add a time suffix to the URI, the Function App will dynamically append the Time Value to the URI in the proper format. \n - The default **Time Interval** is set to pull the last five (5) minutes of data. If the time interval needs to be modified, it is recommended to change the Function App Timer Trigger accordingly (in the function.json file, post deployment) to prevent overlapping data ingestion. \n> - Note: If using Azure Key Vault secrets for any of the values above, use the`@Microsoft.KeyVault(SecretUri={Security Identifier})`schema in place of the string values. Refer to [Key Vault references documentation](https://docs.microsoft.com/azure/app-service/app-service-key-vault-references) for further details. \n4. Mark the checkbox labeled **I agree to the terms and conditions stated above**. \n5. Click **Purchase** to deploy.',
          title: "Option 1 - Azure Resource Manager (ARM) Template"
        },
        {
          description:
            "Use the following step-by-step instructions to deploy the Quayls VM connector manually with Azure Functions.",
          title: "Option 2 - Manual Deployment of Azure Functions"
        },
        {
          description:
            "**1. Create a Function App**\n\n1.  From the Azure Portal, navigate to [Function App](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp), and select **+ Add**.\n2. In the **Basics** tab, ensure Runtime stack is set to **Powershell Core**. \n3. In the **Hosting** tab, ensure the **Consumption (Serverless)** plan type is selected.\n4. Make other preferrable configuration changes, if needed, then click **Create**.",
          title: ""
        },
        {
          description:
            "**2. Import Function App Code**\n\n1. In the newly created Function App, select **Functions** on the left pane and click **+ New Function**.\n2. Select **Timer Trigger**.\n3. Enter a unique Function **Name** and leave the default cron schedule of every 5 minutes, then click **Create**.\n5. Click on **Code + Test** on the left pane. \n6. Copy the [Function App Code](https://aka.ms/sentinelqualysvmazurefunctioncode) and paste into the Function App `run.ps1` editor.\n7. Click **Save**.",
          title: ""
        },
        {
          description:
            '**3. Configure the Function App**\n\n1. In the Function App, select the Function App Name and select **Configuration**.\n2. In the **Application settings** tab, select **+ New application setting**.\n3. Add each of the following seven (7) application settings individually, with their respective string values (case-sensitive): \n\t\tapiUsername\n\t\tapiPassword\n\t\tworkspaceID\n\t\tworkspaceKey\n\t\turi\n\t\tfilterParameters\n\t\ttimeInterval\n> - Enter the URI that corresponds to your region. The complete list of API Server URLs can be [found here](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf#G4.735348). The `uri` value must follow the following schema: `https://<API Server>/api/2.0/fo/asset/host/vm/detection/?action=list&vm_processed_after=` -- There is no need to add a time suffix to the URI, the Function App will dynamically append the Time Value to the URI in the proper format.\n> - Add any additional filter parameters, for the `filterParameters` variable, that need to be appended to the URI. Each parameter should be seperated by an "&" symbol and should not include any spaces.\n> - Set the `timeInterval` (in minutes) to the value of `5` to correspond to the Timer Trigger of every `5` minutes. If the time interval needs to be modified, it is recommended to change the Function App Timer Trigger accordingly to prevent overlapping data ingestion.\n> - Note: If using Azure Key Vault, use the`@Microsoft.KeyVault(SecretUri={Security Identifier})`schema in place of the string values. Refer to [Key Vault references documentation](https://docs.microsoft.com/azure/app-service/app-service-key-vault-references) for further details.\n4. Once all application settings have been entered, click **Save**.',
          title: ""
        },
        {
          description:
            '**4. Configure the host.json**.\n\nDue to the potentially large amount of Qualys host detection data being ingested, it can cause the execution time to surpass the default Function App timeout of five (5) minutes. Increase the default timeout duration to the maximum of ten (10) minutes, under the Consumption Plan, to allow more time for the Function App to execute.\n\n1. In the Function App, select the Function App Name and select the **App Service Editor** blade.\n2. Click **Go** to open the editor, then select the **host.json** file under the **wwwroot** directory.\n3. Add the line `"functionTimeout": "00:10:00",` above the `managedDependancy` line \n4. Ensure **SAVED** appears on the top right corner of the editor, then exit the editor.\n\n> NOTE: If a longer timeout duration is required, consider upgrading to an [App Service Plan](https://docs.microsoft.com/azure/azure-functions/functions-scale#timeout)',
          title: ""
        }
      ],
      permissions: {
        customs: [
          {
            name: "Microsoft.Web/sites permissions",
            description:
              "Read and write permissions to Azure Functions to create a Function App is required. [See the documentation to learn more about Azure Functions](https://docs.microsoft.com/azure/azure-functions/)."
          },
          {
            name: "Qualys API Key",
            description:
              "A Qualys VM API username and password is required. [See the documentation to learn more about Qualys VM API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf)."
          }
        ],
        resourceProvider: [
          {
            permissionsDisplayText:
              "read and write permissions on the workspace are required.",
            provider: "Microsoft.OperationalInsights/workspaces",
            providerDisplayName: "Workspace",
            requiredPermissions: { delete: true, read: true, write: true },
            scope: "Workspace"
          },
          {
            permissionsDisplayText:
              "read permissions to shared keys for the workspace are required. [See the documentation to learn more about workspace keys](https://docs.microsoft.com/azure/azure-monitor/platform/agent-windows#obtain-workspace-id-and-key).",
            provider: "Microsoft.OperationalInsights/workspaces/sharedKeys",
            providerDisplayName: "Keys",
            requiredPermissions: { action: true },
            scope: "Workspace"
          }
        ]
      },
      publisher: "Qualys",
      sampleQueries: [
        {
          description: "Top 10 Vulerabilities detected",
          query:
            "{{graphQueriesTableName}}\n | mv-expand todynamic(Detections_s)\n | extend Vulnerability = tostring(Detections_s.Results)\n | summarize count() by Vulnerability\n | top 10 by count_"
        }
      ],
      title: "Qualys Vulnerability Management (CCP DEMO)"
    },
    kind: "GenericUI"
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateThreatIntelligenceTaxiiDataConnector.json
 */
async function createsOrUpdatesAThreatIntelligenceTaxiiDataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "73e01a99-5cd7-4139-a149-9f2736ff2ab5";
  const dataConnector: TiTaxiiDataConnector = {
    collectionId: "135",
    dataTypes: { taxiiClient: { state: "Enabled" } },
    etag: "d12423f6-a60b-4ca5-88c0-feb1a182d0f0",
    friendlyName: "testTaxii",
    kind: "ThreatIntelligenceTaxii",
    password: "--",
    pollingFrequency: "OnceADay",
    taxiiLookbackPeriod: new Date("2020-01-01T13:00:30.123Z"),
    taxiiServer: "https://limo.anomali.com/api/v1/taxii2/feeds",
    tenantId: "06b3ccb8-1384-4bcc-aec7-852f6d57161b",
    userName: "--",
    workspaceId: "dd124572-4962-4495-9bd2-9dade12314b4"
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateOfficePowerBIDataConnector.json
 */
async function createsOrUpdatesAnOfficePowerBiDataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "73e01a99-5cd7-4139-a149-9f2736ff2ab5";
  const dataConnector: OfficePowerBIDataConnector = {
    dataTypes: { logs: { state: "Enabled" } },
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    kind: "OfficePowerBI",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8"
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateOffice365ProjectDataConnetor.json
 */
async function createsOrUpdatesAnOffice365ProjectDataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "73e01a99-5cd7-4139-a149-9f2736ff2ab5";
  const dataConnector: Office365ProjectDataConnector = {
    dataTypes: { logs: { state: "Enabled" } },
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    kind: "Office365Project",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8"
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateOfficeDataConnetor.json
 */
async function createsOrUpdatesAnOffice365DataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "73e01a99-5cd7-4139-a149-9f2736ff2ab5";
  const dataConnector: OfficeDataConnector = {
    dataTypes: {
      exchange: { state: "Enabled" },
      sharePoint: { state: "Enabled" },
      teams: { state: "Enabled" }
    },
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    kind: "Office365",
    tenantId: "2070ecc9-b4d5-4ae4-adaa-936fa1954fa8"
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the data connector.
 *
 * @summary Creates or updates the data connector.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/dataConnectors/CreateThreatIntelligenceDataConnector.json
 */
async function createsOrUpdatesAnThreatIntelligencePlatformDataConnector() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] ||
    "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName =
    process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const dataConnectorId = "73e01a99-5cd7-4139-a149-9f2736ff2ab5";
  const dataConnector: TIDataConnector = {
    dataTypes: { indicators: { state: "Enabled" } },
    kind: "ThreatIntelligence",
    tenantId: "06b3ccb8-1384-4bcc-aec7-852f6d57161b",
    tipLookbackPeriod: new Date("2020-01-01T13:00:30.123Z")
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.dataConnectors.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataConnectorId,
    dataConnector
  );
  console.log(result);
}

async function main() {
  createsOrUpdatesAApiPollingDataConnector();
  createsOrUpdatesADynamics365DataConnector();
  createsOrUpdatesAGenericUiDataConnector();
  createsOrUpdatesAThreatIntelligenceTaxiiDataConnector();
  createsOrUpdatesAnOfficePowerBiDataConnector();
  createsOrUpdatesAnOffice365ProjectDataConnector();
  createsOrUpdatesAnOffice365DataConnector();
  createsOrUpdatesAnThreatIntelligencePlatformDataConnector();
}

main().catch(console.error);
