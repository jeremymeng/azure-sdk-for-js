/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

/** Custom Parameters used for Cluster Creation. */
export interface WorkspaceCustomParameters {
  /** The ID of a Azure Machine Learning workspace to link with Databricks workspace */
  amlWorkspaceId?: WorkspaceCustomStringParameter;
  /** The ID of a Virtual Network where this Databricks Cluster should be created */
  customVirtualNetworkId?: WorkspaceCustomStringParameter;
  /** The name of a Public Subnet within the Virtual Network */
  customPublicSubnetName?: WorkspaceCustomStringParameter;
  /** The name of the Private Subnet within the Virtual Network */
  customPrivateSubnetName?: WorkspaceCustomStringParameter;
  /** Should the Public IP be Disabled? */
  enableNoPublicIp?: WorkspaceCustomBooleanParameter;
  /** Name of the outbound Load Balancer Backend Pool for Secure Cluster Connectivity (No Public IP). */
  loadBalancerBackendPoolName?: WorkspaceCustomStringParameter;
  /** Resource URI of Outbound Load balancer for Secure Cluster Connectivity (No Public IP) workspace. */
  loadBalancerId?: WorkspaceCustomStringParameter;
  /** Name of the NAT gateway for Secure Cluster Connectivity (No Public IP) workspace subnets. */
  natGatewayName?: WorkspaceCustomStringParameter;
  /** Name of the Public IP for No Public IP workspace with managed vNet. */
  publicIpName?: WorkspaceCustomStringParameter;
  /** Prepare the workspace for encryption. Enables the Managed Identity for managed storage account. */
  prepareEncryption?: WorkspaceCustomBooleanParameter;
  /** Contains the encryption details for Customer-Managed Key (CMK) enabled workspace. */
  encryption?: WorkspaceEncryptionParameter;
  /** A boolean indicating whether or not the DBFS root file system will be enabled with secondary layer of encryption with platform managed keys for data at rest. */
  requireInfrastructureEncryption?: WorkspaceCustomBooleanParameter;
  /** Default DBFS storage account name. */
  storageAccountName?: WorkspaceCustomStringParameter;
  /** Storage account SKU name, ex: Standard_GRS, Standard_LRS. Refer https://aka.ms/storageskus for valid inputs. */
  storageAccountSkuName?: WorkspaceCustomStringParameter;
  /** Address prefix for Managed virtual network. Default value for this input is 10.139. */
  vnetAddressPrefix?: WorkspaceCustomStringParameter;
  /**
   * Tags applied to resources under Managed resource group. These can be updated by updating tags at workspace level.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resourceTags?: WorkspaceCustomObjectParameter;
}

/** The Value. */
export interface WorkspaceCustomStringParameter {
  /**
   * The type of variable that this is
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: string;
}

/** The value which should be used for this field. */
export interface WorkspaceCustomBooleanParameter {
  /**
   * The type of variable that this is
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: boolean;
}

/** The object that contains details of encryption used on the workspace. */
export interface WorkspaceEncryptionParameter {
  /**
   * The type of variable that this is
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: CustomParameterType;
  /** The value which should be used for this field. */
  value?: Encryption;
}

/** The object that contains details of encryption used on the workspace. */
export interface Encryption {
  /** The encryption keySource (provider). Possible values (case-insensitive):  Default, Microsoft.Keyvault */
  keySource?: KeySource;
  /** The name of KeyVault key. */
  keyName?: string;
  /** The version of KeyVault key. */
  keyVersion?: string;
  /** The Uri of KeyVault. */
  keyVaultUri?: string;
}

/** The value which should be used for this field. */
export interface WorkspaceCustomObjectParameter {
  /**
   * The type of variable that this is
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: Record<string, unknown>;
}

/** The workspace provider authorization. */
export interface WorkspaceProviderAuthorization {
  /** The provider's principal identifier. This is the identity that the provider will use to call ARM to manage the workspace resources. */
  principalId: string;
  /** The provider's role definition identifier. This role will define all the permissions that the provider must have on the workspace's container resource group. This role definition cannot have permission to delete the resource group. */
  roleDefinitionId: string;
}

/** Provides details of the entity that created/updated the workspace. */
export interface CreatedBy {
  /**
   * The Object ID that created the workspace.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly oid?: string;
  /**
   * The Personal Object ID corresponding to the object ID above
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly puid?: string;
  /**
   * The application ID of the application that initiated the creation of the workspace. For example, Azure Portal.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly applicationId?: string;
}

/** The Managed Identity details for storage account. */
export interface ManagedIdentityConfiguration {
  /**
   * The objectId of the Managed Identity that is linked to the Managed Storage account.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The tenant Id where the Managed Identity is created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /**
   * The type of Identity created. It can be either SystemAssigned or UserAssigned.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
}

/** Encryption properties for databricks workspace */
export interface WorkspacePropertiesEncryption {
  /** Encryption entities definition for the workspace. */
  entities: EncryptionEntitiesDefinition;
}

/** Encryption entities for databricks workspace resource. */
export interface EncryptionEntitiesDefinition {
  /** Encryption properties for the databricks managed services. */
  managedServices?: EncryptionV2;
}

/** The object that contains details of encryption used on the workspace. */
export interface EncryptionV2 {
  /** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Keyvault */
  keySource: EncryptionKeySource;
  /** Key Vault input properties for encryption. */
  keyVaultProperties?: EncryptionV2KeyVaultProperties;
}

/** Key Vault input properties for encryption. */
export interface EncryptionV2KeyVaultProperties {
  /** The Uri of KeyVault. */
  keyVaultUri: string;
  /** The name of KeyVault key. */
  keyName: string;
  /** The version of KeyVault key. */
  keyVersion: string;
}

/** The private endpoint connection of a workspace */
export interface PrivateEndpointConnection {
  /**
   * The resource identifier.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The resource name.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The resource type.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** The private endpoint connection properties. */
  properties: PrivateEndpointConnectionProperties;
}

/** The properties of a private endpoint connection */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint */
  privateEndpoint?: PrivateEndpoint;
  /** Private endpoint connection state */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /**
   * Provisioning state of the private endpoint connection.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

/** The private endpoint property of a private endpoint connection */
export interface PrivateEndpoint {
  /**
   * The resource identifier.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
}

/** The current state of a private endpoint connection */
export interface PrivateLinkServiceConnectionState {
  /** The status of a private endpoint connection */
  status: PrivateLinkServiceConnectionStatus;
  /** The description for the current state of a private endpoint connection */
  description?: string;
  /** Actions required for a private endpoint connection */
  actionRequired?: string;
}

/** SKU for the resource. */
export interface Sku {
  /** The SKU name. */
  name: string;
  /** The SKU tier. */
  tier?: string;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

/** The core properties of ARM resources */
export interface Resource {
  /**
   * Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The name of the resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
}

/** Contains details when the response code indicates an error. */
export interface ErrorResponse {
  /** The error details. */
  error: ErrorInfo;
}

/** The code and message for an error. */
export interface ErrorInfo {
  /** A machine readable error code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** error details. */
  details?: ErrorDetail[];
  /** Inner error details if they exist. */
  innererror?: string;
}

/** Error details. */
export interface ErrorDetail {
  /** The error's code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** Indicates which property in the request is responsible for the error. */
  target?: string;
}

/** An update to a workspace. */
export interface WorkspaceUpdate {
  /** Resource tags. */
  tags?: { [propertyName: string]: string };
}

/** List of workspaces. */
export interface WorkspaceListResult {
  /** The array of workspaces. */
  value?: Workspace[];
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

/** Result of the request to list Resource Provider operations. It contains a list of operations and a URL link to get the next set of results. */
export interface OperationListResult {
  /** List of Resource Provider operations supported by the Resource Provider resource provider. */
  value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

/** REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft.ResourceProvider */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
}

/** The available private link resources for a workspace */
export interface PrivateLinkResourcesList {
  /** The list of available private link resources for a workspace */
  value?: GroupIdInformation[];
  /** The URL to get the next set of private link resources. */
  nextLink?: string;
}

/** The properties for a group information object */
export interface GroupIdInformationProperties {
  /** The group id */
  groupId?: string;
  /** The required members for a specific group id */
  requiredMembers?: string[];
  /** The required DNS zones for a specific group id */
  requiredZoneNames?: string[];
}

/** List of private link connections. */
export interface PrivateEndpointConnectionsList {
  /** The list of returned private endpoint connection. */
  value?: PrivateEndpointConnection[];
  /** The URL to get the next set of endpoint connections. */
  nextLink?: string;
}

/** Egress endpoints which Workspace connects to for common purposes. */
export interface OutboundEnvironmentEndpoint {
  /** The category of endpoints accessed by the Workspace, e.g. azure-storage, azure-mysql, etc. */
  category?: string;
  /** The endpoints that Workspace connect to */
  endpoints?: EndpointDependency[];
}

/** A domain name or IP address the Workspace is reaching at. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The Ports used when connecting to domainName. */
  endpointDetails?: EndpointDetail[];
}

/** Connect information from the Workspace to a single endpoint. */
export interface EndpointDetail {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The time in milliseconds it takes for the connection to be created from the Workspace to this IpAddress at this Port. */
  latency?: number;
  /** Whether it is possible to create a connection from the Workspace to this IpAddress at this Port. */
  isAccessible?: boolean;
}

/** Peerings in a VirtualNetwork resource */
export interface VirtualNetworkPeering {
  /**
   * Name of the virtual network peering resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource ID.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * type of the virtual network peering resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** Whether the VMs in the local virtual network space would be able to access the VMs in remote virtual network space. */
  allowVirtualNetworkAccess?: boolean;
  /** Whether the forwarded traffic from the VMs in the local virtual network will be allowed/disallowed in remote virtual network. */
  allowForwardedTraffic?: boolean;
  /** If gateway links can be used in remote virtual networking to link to this virtual network. */
  allowGatewayTransit?: boolean;
  /** If remote gateways can be used on this virtual network. If the flag is set to true, and allowGatewayTransit on remote peering is also true, virtual network will use gateways of remote virtual network for transit. Only one peering can have this flag set to true. This flag cannot be set if virtual network already has a gateway. */
  useRemoteGateways?: boolean;
  /**  The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
  databricksVirtualNetwork?: VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork;
  /** The reference to the databricks virtual network address space. */
  databricksAddressSpace?: AddressSpace;
  /**  The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
  remoteVirtualNetwork: VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork;
  /** The reference to the remote virtual network address space. */
  remoteAddressSpace?: AddressSpace;
  /**
   * The status of the virtual network peering.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly peeringState?: PeeringState;
  /**
   * The provisioning state of the virtual network peering resource.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: PeeringProvisioningState;
}

/**  The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
export interface VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork {
  /** The Id of the databricks virtual network. */
  id?: string;
}

/** AddressSpace contains an array of IP address ranges that can be used by subnets of the virtual network. */
export interface AddressSpace {
  /** A list of address blocks reserved for this virtual network in CIDR notation. */
  addressPrefixes?: string[];
}

/**  The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
export interface VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork {
  /** The Id of the remote virtual network. */
  id?: string;
}

/** Gets all virtual network peerings under a workspace. */
export interface VirtualNetworkPeeringList {
  /** List of virtual network peerings on workspace. */
  value?: VirtualNetworkPeering[];
  /** URL to get the next set of virtual network peering list results if there are any. */
  nextLink?: string;
}

/** The resource model definition for a ARM tracked top level resource */
export type TrackedResource = Resource & {
  /** Resource tags. */
  tags?: { [propertyName: string]: string };
  /** The geo-location where the resource lives */
  location: string;
};

/** The group information for creating a private endpoint on a workspace */
export type GroupIdInformation = Resource & {
  /** The group id properties. */
  properties: GroupIdInformationProperties;
};

/** Information about workspace. */
export type Workspace = TrackedResource & {
  /** The SKU of the resource. */
  sku?: Sku;
  /**
   * The system metadata relating to this resource
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly systemData?: SystemData;
  /** The managed resource group Id. */
  managedResourceGroupId: string;
  /** The workspace's custom parameters. */
  parameters?: WorkspaceCustomParameters;
  /**
   * The workspace provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: ProvisioningState;
  /** The blob URI where the UI definition file is located. */
  uiDefinitionUri?: string;
  /** The workspace provider authorizations. */
  authorizations?: WorkspaceProviderAuthorization[];
  /** Indicates the Object ID, PUID and Application ID of entity that created the workspace. */
  createdBy?: CreatedBy;
  /** Indicates the Object ID, PUID and Application ID of entity that last updated the workspace. */
  updatedBy?: CreatedBy;
  /**
   * Specifies the date and time when the workspace is created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly createdDateTime?: Date;
  /**
   * The unique identifier of the databricks workspace in databricks control plane.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly workspaceId?: string;
  /**
   * The workspace URL which is of the format 'adb-{workspaceId}.{random}.azuredatabricks.net'
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly workspaceUrl?: string;
  /** The details of Managed Identity of Storage Account */
  storageAccountIdentity?: ManagedIdentityConfiguration;
  /** Encryption properties for databricks workspace */
  encryption?: WorkspacePropertiesEncryption;
  /**
   * Private endpoint connections created on the workspace
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The network access type for accessing workspace. Set value to disabled to access workspace only via private link. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets a value indicating whether data plane (clusters) to control plane communication happen over private endpoint. Supported values are 'AllRules' and 'NoAzureDatabricksRules'. 'NoAzureServiceRules' value is for internal use only. */
  requiredNsgRules?: RequiredNsgRules;
};

/** Known values of {@link CustomParameterType} that the service accepts. */
export enum KnownCustomParameterType {
  Bool = "Bool",
  Object = "Object",
  String = "String"
}

/**
 * Defines values for CustomParameterType. \
 * {@link KnownCustomParameterType} can be used interchangeably with CustomParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bool** \
 * **Object** \
 * **String**
 */
export type CustomParameterType = string;

/** Known values of {@link KeySource} that the service accepts. */
export enum KnownKeySource {
  Default = "Default",
  MicrosoftKeyvault = "Microsoft.Keyvault"
}

/**
 * Defines values for KeySource. \
 * {@link KnownKeySource} can be used interchangeably with KeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Microsoft.Keyvault**
 */
export type KeySource = string;

/** Known values of {@link ProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  Accepted = "Accepted",
  Running = "Running",
  Ready = "Ready",
  Creating = "Creating",
  Created = "Created",
  Deleting = "Deleting",
  Deleted = "Deleted",
  Canceled = "Canceled",
  Failed = "Failed",
  Succeeded = "Succeeded",
  Updating = "Updating"
}

/**
 * Defines values for ProvisioningState. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Running** \
 * **Ready** \
 * **Creating** \
 * **Created** \
 * **Deleting** \
 * **Deleted** \
 * **Canceled** \
 * **Failed** \
 * **Succeeded** \
 * **Updating**
 */
export type ProvisioningState = string;

/** Known values of {@link EncryptionKeySource} that the service accepts. */
export enum KnownEncryptionKeySource {
  MicrosoftKeyvault = "Microsoft.Keyvault"
}

/**
 * Defines values for EncryptionKeySource. \
 * {@link KnownEncryptionKeySource} can be used interchangeably with EncryptionKeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Keyvault**
 */
export type EncryptionKeySource = string;

/** Known values of {@link PrivateLinkServiceConnectionStatus} that the service accepts. */
export enum KnownPrivateLinkServiceConnectionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Disconnected = "Disconnected"
}

/**
 * Defines values for PrivateLinkServiceConnectionStatus. \
 * {@link KnownPrivateLinkServiceConnectionStatus} can be used interchangeably with PrivateLinkServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateLinkServiceConnectionStatus = string;

/** Known values of {@link PrivateEndpointConnectionProvisioningState} that the service accepts. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  Succeeded = "Succeeded",
  Creating = "Creating",
  Updating = "Updating",
  Deleting = "Deleting",
  Failed = "Failed"
}

/**
 * Defines values for PrivateEndpointConnectionProvisioningState. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Known values of {@link PublicNetworkAccess} that the service accepts. */
export enum KnownPublicNetworkAccess {
  Enabled = "Enabled",
  Disabled = "Disabled"
}

/**
 * Defines values for PublicNetworkAccess. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** Known values of {@link RequiredNsgRules} that the service accepts. */
export enum KnownRequiredNsgRules {
  AllRules = "AllRules",
  NoAzureDatabricksRules = "NoAzureDatabricksRules",
  NoAzureServiceRules = "NoAzureServiceRules"
}

/**
 * Defines values for RequiredNsgRules. \
 * {@link KnownRequiredNsgRules} can be used interchangeably with RequiredNsgRules,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllRules** \
 * **NoAzureDatabricksRules** \
 * **NoAzureServiceRules**
 */
export type RequiredNsgRules = string;

/** Known values of {@link CreatedByType} that the service accepts. */
export enum KnownCreatedByType {
  User = "User",
  Application = "Application",
  ManagedIdentity = "ManagedIdentity",
  Key = "Key"
}

/**
 * Defines values for CreatedByType. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **Application** \
 * **ManagedIdentity** \
 * **Key**
 */
export type CreatedByType = string;

/** Known values of {@link PeeringState} that the service accepts. */
export enum KnownPeeringState {
  Initiated = "Initiated",
  Connected = "Connected",
  Disconnected = "Disconnected"
}

/**
 * Defines values for PeeringState. \
 * {@link KnownPeeringState} can be used interchangeably with PeeringState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initiated** \
 * **Connected** \
 * **Disconnected**
 */
export type PeeringState = string;

/** Known values of {@link PeeringProvisioningState} that the service accepts. */
export enum KnownPeeringProvisioningState {
  Succeeded = "Succeeded",
  Updating = "Updating",
  Deleting = "Deleting",
  Failed = "Failed"
}

/**
 * Defines values for PeeringProvisioningState. \
 * {@link KnownPeeringProvisioningState} can be used interchangeably with PeeringProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Updating** \
 * **Deleting** \
 * **Failed**
 */
export type PeeringProvisioningState = string;

/** Optional parameters. */
export interface WorkspacesGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the get operation. */
export type WorkspacesGetResponse = Workspace;

/** Optional parameters. */
export interface WorkspacesDeleteOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Optional parameters. */
export interface WorkspacesCreateOrUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the createOrUpdate operation. */
export type WorkspacesCreateOrUpdateResponse = Workspace;

/** Optional parameters. */
export interface WorkspacesUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the update operation. */
export type WorkspacesUpdateResponse = Workspace;

/** Optional parameters. */
export interface WorkspacesListByResourceGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listByResourceGroup operation. */
export type WorkspacesListByResourceGroupResponse = WorkspaceListResult;

/** Optional parameters. */
export interface WorkspacesListBySubscriptionOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listBySubscription operation. */
export type WorkspacesListBySubscriptionResponse = WorkspaceListResult;

/** Optional parameters. */
export interface WorkspacesListByResourceGroupNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listByResourceGroupNext operation. */
export type WorkspacesListByResourceGroupNextResponse = WorkspaceListResult;

/** Optional parameters. */
export interface WorkspacesListBySubscriptionNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listBySubscriptionNext operation. */
export type WorkspacesListBySubscriptionNextResponse = WorkspaceListResult;

/** Optional parameters. */
export interface OperationsListOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the list operation. */
export type OperationsListResponse = OperationListResult;

/** Optional parameters. */
export interface OperationsListNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNext operation. */
export type OperationsListNextResponse = OperationListResult;

/** Optional parameters. */
export interface PrivateLinkResourcesListOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the list operation. */
export type PrivateLinkResourcesListResponse = PrivateLinkResourcesList;

/** Optional parameters. */
export interface PrivateLinkResourcesGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the get operation. */
export type PrivateLinkResourcesGetResponse = GroupIdInformation;

/** Optional parameters. */
export interface PrivateLinkResourcesListNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNext operation. */
export type PrivateLinkResourcesListNextResponse = PrivateLinkResourcesList;

/** Optional parameters. */
export interface PrivateEndpointConnectionsListOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the list operation. */
export type PrivateEndpointConnectionsListResponse = PrivateEndpointConnectionsList;

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the get operation. */
export type PrivateEndpointConnectionsGetResponse = PrivateEndpointConnection;

/** Optional parameters. */
export interface PrivateEndpointConnectionsCreateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the create operation. */
export type PrivateEndpointConnectionsCreateResponse = PrivateEndpointConnection;

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsListNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listNext operation. */
export type PrivateEndpointConnectionsListNextResponse = PrivateEndpointConnectionsList;

/** Optional parameters. */
export interface OutboundNetworkDependenciesEndpointsListOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the list operation. */
export type OutboundNetworkDependenciesEndpointsListResponse = OutboundEnvironmentEndpoint[];

/** Optional parameters. */
export interface VNetPeeringGetOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the get operation. */
export type VNetPeeringGetResponse = VirtualNetworkPeering;

/** Optional parameters. */
export interface VNetPeeringDeleteOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Optional parameters. */
export interface VNetPeeringCreateOrUpdateOptionalParams
  extends coreClient.OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

/** Contains response data for the createOrUpdate operation. */
export type VNetPeeringCreateOrUpdateResponse = VirtualNetworkPeering;

/** Optional parameters. */
export interface VNetPeeringListByWorkspaceOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listByWorkspace operation. */
export type VNetPeeringListByWorkspaceResponse = VirtualNetworkPeeringList;

/** Optional parameters. */
export interface VNetPeeringListByWorkspaceNextOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the listByWorkspaceNext operation. */
export type VNetPeeringListByWorkspaceNextResponse = VirtualNetworkPeeringList;

/** Optional parameters. */
export interface AzureDatabricksManagementClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
