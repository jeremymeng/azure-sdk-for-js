// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureFleetClient, AzureFleetClientOptionalParams } from "./azureFleetClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  TrackedResource,
  Fleet,
  FleetProperties,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  SpotPriorityProfile,
  KnownEvictionPolicy,
  EvictionPolicy,
  KnownSpotAllocationStrategy,
  SpotAllocationStrategy,
  RegularPriorityProfile,
  KnownRegularPriorityAllocationStrategy,
  RegularPriorityAllocationStrategy,
  VmSizeProfile,
  ComputeProfile,
  BaseVirtualMachineProfile,
  VirtualMachineScaleSetOSProfile,
  WindowsConfiguration,
  AdditionalUnattendContent,
  KnownSettingNames,
  SettingNames,
  PatchSettings,
  KnownWindowsVMGuestPatchMode,
  WindowsVMGuestPatchMode,
  KnownWindowsPatchAssessmentMode,
  WindowsPatchAssessmentMode,
  WindowsVMGuestPatchAutomaticByPlatformSettings,
  KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting,
  WindowsVMGuestPatchAutomaticByPlatformRebootSetting,
  WinRMConfiguration,
  WinRMListener,
  KnownProtocolTypes,
  ProtocolTypes,
  LinuxConfiguration,
  SshConfiguration,
  SshPublicKey,
  LinuxPatchSettings,
  KnownLinuxVMGuestPatchMode,
  LinuxVMGuestPatchMode,
  KnownLinuxPatchAssessmentMode,
  LinuxPatchAssessmentMode,
  LinuxVMGuestPatchAutomaticByPlatformSettings,
  KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting,
  LinuxVMGuestPatchAutomaticByPlatformRebootSetting,
  VaultSecretGroup,
  SubResource,
  VaultCertificate,
  VirtualMachineScaleSetStorageProfile,
  ImageReference,
  VirtualMachineScaleSetOSDisk,
  KnownCachingTypes,
  CachingTypes,
  KnownDiskCreateOptionTypes,
  DiskCreateOptionTypes,
  DiffDiskSettings,
  KnownDiffDiskOptions,
  DiffDiskOptions,
  KnownDiffDiskPlacement,
  DiffDiskPlacement,
  KnownOperatingSystemTypes,
  OperatingSystemTypes,
  VirtualHardDisk,
  VirtualMachineScaleSetManagedDiskParameters,
  KnownStorageAccountTypes,
  StorageAccountTypes,
  DiskEncryptionSetParameters,
  VMDiskSecurityProfile,
  KnownSecurityEncryptionTypes,
  SecurityEncryptionTypes,
  KnownDiskDeleteOptionTypes,
  DiskDeleteOptionTypes,
  VirtualMachineScaleSetDataDisk,
  KnownDiskControllerTypes,
  DiskControllerTypes,
  VirtualMachineScaleSetNetworkProfile,
  ApiEntityReference,
  VirtualMachineScaleSetNetworkConfiguration,
  VirtualMachineScaleSetNetworkConfigurationProperties,
  VirtualMachineScaleSetNetworkConfigurationDnsSettings,
  VirtualMachineScaleSetIPConfiguration,
  VirtualMachineScaleSetIPConfigurationProperties,
  VirtualMachineScaleSetPublicIPAddressConfiguration,
  VirtualMachineScaleSetPublicIPAddressConfigurationProperties,
  VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings,
  KnownDomainNameLabelScopeTypes,
  DomainNameLabelScopeTypes,
  VirtualMachineScaleSetIpTag,
  KnownIPVersion,
  IPVersion,
  KnownDeleteOptions,
  DeleteOptions,
  PublicIPAddressSku,
  KnownPublicIPAddressSkuName,
  PublicIPAddressSkuName,
  KnownPublicIPAddressSkuTier,
  PublicIPAddressSkuTier,
  KnownNetworkInterfaceAuxiliaryMode,
  NetworkInterfaceAuxiliaryMode,
  KnownNetworkInterfaceAuxiliarySku,
  NetworkInterfaceAuxiliarySku,
  KnownNetworkApiVersion,
  NetworkApiVersion,
  SecurityProfile,
  UefiSettings,
  KnownSecurityTypes,
  SecurityTypes,
  EncryptionIdentity,
  ProxyAgentSettings,
  KnownMode,
  Mode,
  DiagnosticsProfile,
  BootDiagnostics,
  VirtualMachineScaleSetExtensionProfile,
  VirtualMachineScaleSetExtension,
  VirtualMachineScaleSetExtensionProperties,
  KeyVaultSecretReference,
  ScheduledEventsProfile,
  TerminateNotificationProfile,
  OSImageNotificationProfile,
  CapacityReservationProfile,
  ApplicationProfile,
  VMGalleryApplication,
  VirtualMachineScaleSetHardwareProfile,
  VMSizeProperties,
  ServiceArtifactReference,
  SecurityPostureReference,
  ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Plan,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  FleetUpdate,
  ManagedServiceIdentityUpdate,
  ResourcePlanUpdate,
  VirtualMachineScaleSet,
  ApiError,
  ApiErrorBase,
  InnerError,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  Versions,
  ProvisioningState,
  OperationsListOptionalParams,
  FleetsGetOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./models/index.js";
export { FleetsOperations, OperationsOperations } from "./classic/index.js";
