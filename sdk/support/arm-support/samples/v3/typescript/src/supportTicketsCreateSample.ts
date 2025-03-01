/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SupportTicketDetails, MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateBillingSupportTicketForSubscription.json
 */
async function createATicketForBillingRelatedIssues() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "No",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    fileWorkspaceName: "6f16735c-1530836f-e9970f1a-2e49-47b7-96cd-9746b83aa066",
    problemClassificationId:
      "/providers/Microsoft.Support/services/billing_service_guid/problemClassifications/billing_problemClassification_guid",
    serviceId: "/providers/Microsoft.Support/services/billing_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateSubMgmtSupportTicketForSubscription.json
 */
async function createATicketForSubscriptionManagementRelatedIssuesForASubscription() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "No",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    fileWorkspaceName: "6f16735c-1530836f-e9970f1a-2e49-47b7-96cd-9746b83aa066",
    problemClassificationId:
      "/providers/Microsoft.Support/services/subscription_management_service_guid/problemClassifications/subscription_management_problemClassification_guid",
    serviceId:
      "/providers/Microsoft.Support/services/subscription_management_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateTechnicalSupportTicketForSubscription.json
 */
async function createATicketForTechnicalIssueRelatedToASpecificResourceForASubscription() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    fileWorkspaceName: "6f16735c-1530836f-e9970f1a-2e49-47b7-96cd-9746b83aa066",
    problemClassificationId:
      "/providers/Microsoft.Support/services/virtual_machine_running_linux_service_guid/problemClassifications/problemClassification_guid",
    problemScopingQuestions:
      '{"articleId":"076846c1-4c0b-4b21-91c6-1a30246b3867","scopingDetails":[{"question":"When did the problem begin?","controlId":"problem_start_time","orderId":1,"inputType":"static","answer":{"displayValue":"2023-08-31T18:55:00.739Z","value":"2023-08-31T18:55:00.739Z","type":"datetime"}},{"question":"API Type of the Cosmos DB account","controlId":"api_type","orderId":2,"inputType":"static","answer":{"displayValue":"Table","value":"tables","type":"string"}},{"question":"Table name","controlId":"collection_name_table","orderId":11,"inputType":"nonstatic","answer":{"displayValue":"Select Table Name","value":"dont_know_answer","type":"string"}},{"question":"Provide additional details about the issue you\'re facing","controlId":"problem_description","orderId":12,"inputType":"nonstatic","answer":{"displayValue":"test ticket, please ignore and close","value":"test ticket, please ignore and close","type":"string"}}]}',
    secondaryConsent: [
      { type: "virtualmachinerunninglinuxservice", userConsent: "Yes" },
    ],
    serviceId:
      "/providers/Microsoft.Support/services/cddd3eb5-1830-b494-44fd-782f691479dc",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    technicalTicketDetails: {
      resourceId:
        "/subscriptions/132d901f-189d-4381-9214-fe68e27e05a1/resourceGroups/test/providers/Microsoft.Compute/virtualMachines/testserver",
    },
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateBatchQuotaTicketForSpecificBatchAccountForActiveJobs.json
 */
async function createATicketToRequestQuotaIncreaseForActiveJobsAndJobSchedulesForABatchAccount() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/batch_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Account",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload: '{"AccountName":"test","NewLimit":200,"Type":"Jobs"}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateSqlManagedInstanceQuotaTicket.json
 */
async function createATicketToRequestQuotaIncreaseForAzureSqlManagedInstance() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/sql_managedinstance_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "SQLMI",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload: '{"NewLimit":200, "Metadata":null, "Type":"vCore"}',
          region: "EastUS",
        },
        {
          payload: '{"NewLimit":200, "Metadata":null, "Type":"Subnet"}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateBatchQuotaTicketForSubscription.json
 */
async function createATicketToRequestQuotaIncreaseForBatchAccountsForASubscription() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/batch_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Subscription",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        { payload: '{"NewLimit":200,"Type":"Account"}', region: "EastUS" },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateCoresQuotaTicketForSubscription.json
 */
async function createATicketToRequestQuotaIncreaseForComputeVMCores() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/cores_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        { payload: '{"SKU":"DSv3 Series","NewLimit":104}', region: "EastUS" },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateSqlDatawarehouseQuotaTicketForDTUs.json
 */
async function createATicketToRequestQuotaIncreaseForDtUsForAzureSynapseAnalytics() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/sql_datawarehouse_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "DTUs",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload: '{"ServerName":"testserver","NewLimit":54000}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateSqlDatabaseQuotaTicketForDTUs.json
 */
async function createATicketToRequestQuotaIncreaseForDtUsForSqlDatabase() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/sql_database_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "DTUs",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload: '{"ServerName":"testserver","NewLimit":54000}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateMachineLearningQuotaTicketForLowPriorityCores.json
 */
async function createATicketToRequestQuotaIncreaseForLowPriorityCoresForMachineLearningService() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/machine_learning_service_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "BatchAml",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        { payload: '{"NewLimit":200,"Type":"LowPriority"}', region: "EastUS" },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateBatchQuotaTicketForSpecificBatchAccountForLowPriorityCores.json
 */
async function createATicketToRequestQuotaIncreaseForLowPriorityCoresForABatchAccount() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/batch_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Account",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload: '{"AccountName":"test","NewLimit":200,"Type":"LowPriority"}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateBatchQuotaTicketForSpecificBatchAccountForPools.json
 */
async function createATicketToRequestQuotaIncreaseForPoolsForABatchAccount() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/batch_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Account",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload: '{"AccountName":"test","NewLimit":200,"Type":"Pools"}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateSqlDatawarehouseQuotaTicketForServers.json
 */
async function createATicketToRequestQuotaIncreaseForServersForAzureSynapseAnalytics() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/sql_datawarehouse_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Servers",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [{ payload: '{"NewLimit":200}', region: "EastUS" }],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateSqlDatabaseQuotaTicketForServers.json
 */
async function createATicketToRequestQuotaIncreaseForServersForSqlDatabase() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/sql_database_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Servers",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [{ payload: '{"NewLimit":200}', region: "EastUS" }],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateGenericQuotaTicket.json
 */
async function createATicketToRequestQuotaIncreaseForServicesThatDoNotRequireAdditionalDetailsInTheQuotaTicketDetailsObject() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description:
      "Increase the maximum throughput per container limit to 10000 for account foo bar",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/cosmosdb_problemClassification_guid",
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateMachineLearningQuotaTicketForDedicatedCores.json
 */
async function createATicketToRequestQuotaIncreaseForSpecificVMFamilyCoresForMachineLearningService() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/machine_learning_service_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "BatchAml",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload:
            '{"VMFamily":"standardA0_A7Family","NewLimit":200,"Type":"Dedicated"}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

/**
[Omitted long matching line]
 *
[Omitted long matching line]
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateBatchQuotaTicketForSpecificBatchAccountForDedicatedCores.json
 */
async function createATicketToRequestQuotaIncreaseForSpecificVMFamilyCoresForABatchAccount() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const createSupportTicketParameters: SupportTicketDetails = {
    description: "my description",
    advancedDiagnosticConsent: "Yes",
    contactDetails: {
      country: "usa",
      firstName: "abc",
      lastName: "xyz",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "abc@contoso.com",
    },
    problemClassificationId:
      "/providers/Microsoft.Support/services/quota_service_guid/problemClassifications/batch_problemClassification_guid",
    quotaTicketDetails: {
      quotaChangeRequestSubType: "Account",
      quotaChangeRequestVersion: "1.0",
      quotaChangeRequests: [
        {
          payload:
            '{"AccountName":"test","VMFamily":"standardA0_A7Family","NewLimit":200,"Type":"Dedicated"}',
          region: "EastUS",
        },
      ],
    },
    serviceId: "/providers/Microsoft.Support/services/quota_service_guid",
    severity: "moderate",
    supportPlanId:
      "U291cmNlOlNDTSxDbGFyaWZ5SW5zdGFsbGF0aW9uU2l0ZUlkOjcsTGluZUl0ZW1JZDo5ODY1NzIyOSxDb250cmFjdElkOjk4NjU5MTk0LFN1YnNjcmlwdGlvbklkOjc2Y2I3N2ZhLThiMTctNGVhYi05NDkzLWI2NWRhY2U5OTgxMyw=",
    title: "my title",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.beginCreateAndWait(
    supportTicketName,
    createSupportTicketParameters,
  );
  console.log(result);
}

async function main() {
  createATicketForBillingRelatedIssues();
  createATicketForSubscriptionManagementRelatedIssuesForASubscription();
  createATicketForTechnicalIssueRelatedToASpecificResourceForASubscription();
  createATicketToRequestQuotaIncreaseForActiveJobsAndJobSchedulesForABatchAccount();
  createATicketToRequestQuotaIncreaseForAzureSqlManagedInstance();
  createATicketToRequestQuotaIncreaseForBatchAccountsForASubscription();
  createATicketToRequestQuotaIncreaseForComputeVMCores();
  createATicketToRequestQuotaIncreaseForDtUsForAzureSynapseAnalytics();
  createATicketToRequestQuotaIncreaseForDtUsForSqlDatabase();
  createATicketToRequestQuotaIncreaseForLowPriorityCoresForMachineLearningService();
  createATicketToRequestQuotaIncreaseForLowPriorityCoresForABatchAccount();
  createATicketToRequestQuotaIncreaseForPoolsForABatchAccount();
  createATicketToRequestQuotaIncreaseForServersForAzureSynapseAnalytics();
  createATicketToRequestQuotaIncreaseForServersForSqlDatabase();
  createATicketToRequestQuotaIncreaseForServicesThatDoNotRequireAdditionalDetailsInTheQuotaTicketDetailsObject();
  createATicketToRequestQuotaIncreaseForSpecificVMFamilyCoresForMachineLearningService();
  createATicketToRequestQuotaIncreaseForSpecificVMFamilyCoresForABatchAccount();
}

main().catch(console.error);
