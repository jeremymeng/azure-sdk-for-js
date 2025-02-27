/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { StreamingPolicy } from "@azure/arm-mediaservices";
import { AzureMediaServices } from "@azure/arm-mediaservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-commonEncryptionCbcs-clearKeyEncryption.json
 */
async function createsAStreamingPolicyWithClearKeyEncryptionInCommonEncryptionCbcs(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedSecureStreamingPolicyWithCommonEncryptionCbcsOnly";
  const parameters: StreamingPolicy = {
    commonEncryptionCbcs: {
      clearKeyEncryptionConfiguration: {
        customKeysAcquisitionUrlTemplate: "https://contoso.com/{AlternativeMediaId}/clearkey/",
      },
      contentKeys: { defaultKey: { label: "cbcsDefaultKey" } },
      enabledProtocols: {
        dash: false,
        download: false,
        hls: true,
        smoothStreaming: false,
      },
    },
    defaultContentKeyPolicyName: "PolicyWithMultipleOptions",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-commonEncryptionCenc-clearKeyEncryption.json
 */
async function createsAStreamingPolicyWithClearKeyEncryptionInCommonEncryptionCenc(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedSecureStreamingPolicyWithCommonEncryptionCencOnly";
  const parameters: StreamingPolicy = {
    commonEncryptionCenc: {
      clearKeyEncryptionConfiguration: {
        customKeysAcquisitionUrlTemplate: "https://contoso.com/{AlternativeMediaId}/clearkey/",
      },
      clearTracks: [
        {
          trackSelections: [{ operation: "Equal", property: "FourCC", value: "hev1" }],
        },
      ],
      contentKeys: { defaultKey: { label: "cencDefaultKey" } },
      enabledProtocols: {
        dash: true,
        download: false,
        hls: false,
        smoothStreaming: true,
      },
    },
    defaultContentKeyPolicyName: "PolicyWithPlayReadyOptionAndOpenRestriction",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-clear.json
 */
async function createsAStreamingPolicyWithClearStreaming(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedClearStreamingPolicy";
  const parameters: StreamingPolicy = {
    noEncryption: {
      enabledProtocols: {
        dash: true,
        download: true,
        hls: true,
        smoothStreaming: true,
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-commonEncryptionCbcs-only.json
 */
async function createsAStreamingPolicyWithCommonEncryptionCbcsOnly(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedSecureStreamingPolicyWithCommonEncryptionCbcsOnly";
  const parameters: StreamingPolicy = {
    commonEncryptionCbcs: {
      contentKeys: { defaultKey: { label: "cbcsDefaultKey" } },
      drm: {
        fairPlay: {
          allowPersistentLicense: true,
          customLicenseAcquisitionUrlTemplate:
            "https://contoso.com/{AssetAlternativeId}/fairplay/{ContentKeyId}",
        },
      },
      enabledProtocols: {
        dash: false,
        download: false,
        hls: true,
        smoothStreaming: false,
      },
    },
    defaultContentKeyPolicyName: "PolicyWithMultipleOptions",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-commonEncryptionCenc-only.json
 */
async function createsAStreamingPolicyWithCommonEncryptionCencOnly(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedSecureStreamingPolicyWithCommonEncryptionCencOnly";
  const parameters: StreamingPolicy = {
    commonEncryptionCenc: {
      clearTracks: [
        {
          trackSelections: [{ operation: "Equal", property: "FourCC", value: "hev1" }],
        },
      ],
      contentKeys: { defaultKey: { label: "cencDefaultKey" } },
      drm: {
        playReady: {
          customLicenseAcquisitionUrlTemplate:
            "https://contoso.com/{AssetAlternativeId}/playready/{ContentKeyId}",
          playReadyCustomAttributes: "PlayReady CustomAttributes",
        },
        widevine: {
          customLicenseAcquisitionUrlTemplate:
            "https://contoso.com/{AssetAlternativeId}/widevine/{ContentKeyId",
        },
      },
      enabledProtocols: {
        dash: true,
        download: false,
        hls: false,
        smoothStreaming: true,
      },
    },
    defaultContentKeyPolicyName: "PolicyWithPlayReadyOptionAndOpenRestriction",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-envelopeEncryption-only.json
 */
async function createsAStreamingPolicyWithEnvelopeEncryptionOnly(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedSecureStreamingPolicyWithEnvelopeEncryptionOnly";
  const parameters: StreamingPolicy = {
    defaultContentKeyPolicyName: "PolicyWithClearKeyOptionAndTokenRestriction",
    envelopeEncryption: {
      contentKeys: { defaultKey: { label: "aesDefaultKey" } },
      customKeyAcquisitionUrlTemplate:
        "https://contoso.com/{AssetAlternativeId}/envelope/{ContentKeyId}",
      enabledProtocols: {
        dash: true,
        download: false,
        hls: true,
        smoothStreaming: true,
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Streaming Policy in the Media Services account
 *
 * @summary Create a Streaming Policy in the Media Services account
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Metadata/stable/2022-08-01/examples/streaming-policies-create-secure-streaming.json
 */
async function createsAStreamingPolicyWithSecureStreaming(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contoso";
  const accountName = "contosomedia";
  const streamingPolicyName = "UserCreatedSecureStreamingPolicy";
  const parameters: StreamingPolicy = {
    commonEncryptionCbcs: {
      contentKeys: { defaultKey: { label: "cbcsDefaultKey" } },
      drm: {
        fairPlay: {
          allowPersistentLicense: true,
          customLicenseAcquisitionUrlTemplate:
            "https://contoso.com/{AssetAlternativeId}/fairplay/{ContentKeyId}",
        },
      },
      enabledProtocols: {
        dash: false,
        download: false,
        hls: true,
        smoothStreaming: false,
      },
    },
    commonEncryptionCenc: {
      clearTracks: [
        {
          trackSelections: [{ operation: "Equal", property: "FourCC", value: "hev1" }],
        },
      ],
      contentKeys: { defaultKey: { label: "cencDefaultKey" } },
      drm: {
        playReady: {
          customLicenseAcquisitionUrlTemplate:
            "https://contoso.com/{AssetAlternativeId}/playready/{ContentKeyId}",
          playReadyCustomAttributes: "PlayReady CustomAttributes",
        },
        widevine: {
          customLicenseAcquisitionUrlTemplate:
            "https://contoso.com/{AssetAlternativeId}/widevine/{ContentKeyId",
        },
      },
      enabledProtocols: {
        dash: true,
        download: false,
        hls: false,
        smoothStreaming: true,
      },
    },
    defaultContentKeyPolicyName: "PolicyWithMultipleOptions",
    envelopeEncryption: {
      contentKeys: { defaultKey: { label: "aesDefaultKey" } },
      customKeyAcquisitionUrlTemplate:
        "https://contoso.com/{AssetAlternativeId}/envelope/{ContentKeyId}",
      enabledProtocols: {
        dash: true,
        download: false,
        hls: true,
        smoothStreaming: true,
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingPolicies.create(
    resourceGroupName,
    accountName,
    streamingPolicyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAStreamingPolicyWithClearKeyEncryptionInCommonEncryptionCbcs();
  await createsAStreamingPolicyWithClearKeyEncryptionInCommonEncryptionCenc();
  await createsAStreamingPolicyWithClearStreaming();
  await createsAStreamingPolicyWithCommonEncryptionCbcsOnly();
  await createsAStreamingPolicyWithCommonEncryptionCencOnly();
  await createsAStreamingPolicyWithEnvelopeEncryptionOnly();
  await createsAStreamingPolicyWithSecureStreaming();
}

main().catch(console.error);
