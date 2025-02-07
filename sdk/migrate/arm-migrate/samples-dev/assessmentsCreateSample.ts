/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Assessment, AssessmentsCreateOptionalParams } from "@azure/arm-migrate";
import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create a new assessment with the given name and the specified settings. Since name of an assessment in a project is a unique identifier, if an assessment with the name provided already exists, then the existing assessment is updated.

Any PUT operation, resulting in either create or update on an assessment, will cause the assessment to go in a "InProgress" state. This will be indicated by the field 'computationState' on the Assessment object. During this time no other PUT operation will be allowed on that assessment object, nor will a Delete operation. Once the computation for the assessment is complete, the field 'computationState' will be updated to 'Ready', and then other PUT or DELETE operations can happen on the assessment.

When assessment is under computation, any PUT will lead to a 400 - Bad Request error.

 *
 * @summary Create a new assessment with the given name and the specified settings. Since name of an assessment in a project is a unique identifier, if an assessment with the name provided already exists, then the existing assessment is updated.

Any PUT operation, resulting in either create or update on an assessment, will cause the assessment to go in a "InProgress" state. This will be indicated by the field 'computationState' on the Assessment object. During this time no other PUT operation will be allowed on that assessment object, nor will a Delete operation. Once the computation for the assessment is complete, the field 'computationState' will be updated to 'Ready', and then other PUT or DELETE operations can happen on the assessment.

When assessment is under computation, any PUT will lead to a 400 - Bad Request error.

 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/Assessments_Create.json
 */
async function assessmentsCreate() {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const groupName = "Group2";
  const assessmentName = "assessment_5_14_2019_16_48_47";
  const assessment: Assessment = {
    eTag: '"1e000c2c-0000-0d00-0000-5cdaa4190000"',
    properties: {
      azureDiskType: "StandardOrPremium",
      azureHybridUseBenefit: "Yes",
      azureLocation: "NorthEurope",
      azureOfferCode: "MSAZR0003P",
      azurePricingTier: "Standard",
      azureStorageRedundancy: "LocallyRedundant",
      azureVmFamilies: [
        "Dv2_series",
        "F_series",
        "Dv3_series",
        "DS_series",
        "DSv2_series",
        "Fs_series",
        "Dsv3_series",
        "Ev3_series",
        "Esv3_series",
        "D_series",
        "M_series",
        "Fsv2_series",
        "H_series",
      ],
      currency: "USD",
      discountPercentage: 100,
      percentile: "Percentile95",
      reservedInstance: "RI3Year",
      scalingFactor: 1,
      sizingCriterion: "PerformanceBased",
      stage: "InProgress",
      timeRange: "Day",
      vmUptime: { daysPerMonth: 31, hoursPerDay: 24 },
    },
  };
  const options: AssessmentsCreateOptionalParams = { assessment };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.assessments.create(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    options,
  );
  console.log(result);
}

async function main() {
  await assessmentsCreate();
}

main().catch(console.error);
