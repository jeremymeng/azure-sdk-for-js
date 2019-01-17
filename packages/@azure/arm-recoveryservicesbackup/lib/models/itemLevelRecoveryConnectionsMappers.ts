/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

export {
  discriminators,
  ILRRequestResource,
  Resource,
  BaseResource,
  ILRRequest,
  CloudError,
  JobResource,
  Job,
  MabJob,
  MabErrorInfo,
  MabJobExtendedInfo,
  MabJobTaskDetails,
  ProtectedItemResource,
  ProtectedItem,
  ProtectionIntentResource,
  ProtectionIntent,
  ProtectionPolicyResource,
  ProtectionPolicy,
  BackupEngineBaseResource,
  BackupEngineBase,
  BackupEngineExtendedInfo,
  BackupRequestResource,
  BackupRequest,
  BackupResourceConfigResource,
  BackupResourceConfig,
  BackupResourceVaultConfigResource,
  BackupResourceVaultConfig,
  DpmBackupEngine,
  IaasVMBackupRequest,
  IaasVMILRRegistrationRequest,
  ProtectableContainerResource,
  ProtectableContainer,
  ProtectionContainerResource,
  ProtectionContainer,
  RecoveryPointResource,
  RecoveryPoint,
  RestoreRequestResource,
  RestoreRequest,
  WorkloadItemResource,
  WorkloadItem,
  WorkloadProtectableItemResource,
  WorkloadProtectableItem,
  AzureFileshareProtectedItem,
  AzureFileshareProtectedItemExtendedInfo,
  AzureFileShareProtectionPolicy,
  SchedulePolicy,
  RetentionPolicy,
  AzureFileShareRestoreRequest,
  RestoreFileSpecs,
  TargetAFSRestoreInfo,
  AzureIaaSVMJob,
  AzureIaaSVMErrorInfo,
  AzureIaaSVMJobExtendedInfo,
  AzureIaaSVMJobTaskDetails,
  AzureIaaSVMProtectedItem,
  AzureIaaSVMHealthDetails,
  AzureIaaSVMProtectedItemExtendedInfo,
  AzureIaaSVMProtectionPolicy,
  AzureRecoveryServiceVaultProtectionIntent,
  AzureResourceProtectionIntent,
  AzureSqlProtectedItem,
  AzureSqlProtectedItemExtendedInfo,
  AzureSqlProtectionPolicy,
  AzureStorageJob,
  AzureStorageErrorInfo,
  AzureStorageJobExtendedInfo,
  AzureStorageJobTaskDetails,
  AzureVmWorkloadProtectedItem,
  ErrorDetail,
  AzureVmWorkloadProtectedItemExtendedInfo,
  AzureVmWorkloadProtectionPolicy,
  Settings,
  SubProtectionPolicy,
  AzureVmWorkloadSAPAseDatabaseProtectedItem,
  AzureVmWorkloadSAPHanaDatabaseProtectedItem,
  AzureVmWorkloadSQLDatabaseProtectedItem,
  AzureWorkloadAutoProtectionIntent,
  AzureWorkloadJob,
  AzureWorkloadErrorInfo,
  AzureWorkloadJobExtendedInfo,
  AzureWorkloadJobTaskDetails,
  AzureWorkloadRestoreRequest,
  TargetRestoreInfo,
  AzureWorkloadSAPHanaRestoreRequest,
  AzureWorkloadSQLAutoProtectionIntent,
  AzureWorkloadSQLRestoreRequest,
  SQLDataDirectoryMapping,
  DpmJob,
  DpmErrorInfo,
  DpmJobExtendedInfo,
  DpmJobTaskDetails,
  DPMProtectedItem,
  DPMProtectedItemExtendedInfo,
  GenericProtectedItem,
  GenericProtectionPolicy,
  IaasVMRestoreRequest,
  EncryptionDetails,
  LogSchedulePolicy,
  LongTermRetentionPolicy,
  DailyRetentionSchedule,
  RetentionDuration,
  WeeklyRetentionSchedule,
  MonthlyRetentionSchedule,
  DailyRetentionFormat,
  Day,
  WeeklyRetentionFormat,
  YearlyRetentionSchedule,
  LongTermSchedulePolicy,
  MabFileFolderProtectedItem,
  MabFileFolderProtectedItemExtendedInfo,
  MabProtectionPolicy,
  SimpleRetentionPolicy,
  SimpleSchedulePolicy,
  AzureBackupServerEngine,
  AzureFileShareBackupRequest,
  AzureFileShareProtectableItem,
  AzureFileShareRecoveryPoint,
  AzureSqlContainer,
  AzureStorageContainer,
  AzureStorageProtectableContainer,
  AzureVMAppContainerProtectableContainer,
  AzureVmWorkloadItem,
  AzureVmWorkloadProtectableItem,
  PreBackupValidation,
  AzureVmWorkloadSAPAseDatabaseProtectableItem,
  AzureVmWorkloadSAPAseDatabaseWorkloadItem,
  AzureVmWorkloadSAPAseSystemProtectableItem,
  AzureVmWorkloadSAPAseSystemWorkloadItem,
  AzureVmWorkloadSAPHanaDatabaseProtectableItem,
  AzureVmWorkloadSAPHanaDatabaseWorkloadItem,
  AzureVmWorkloadSAPHanaSystemProtectableItem,
  AzureVmWorkloadSAPHanaSystemWorkloadItem,
  AzureVmWorkloadSQLAvailabilityGroupProtectableItem,
  AzureVmWorkloadSQLDatabaseProtectableItem,
  AzureVmWorkloadSQLDatabaseWorkloadItem,
  AzureVmWorkloadSQLInstanceProtectableItem,
  AzureVmWorkloadSQLInstanceWorkloadItem,
  SQLDataDirectory,
  AzureWorkloadBackupRequest,
  AzureWorkloadContainer,
  AzureWorkloadContainerExtendedInfo,
  InquiryInfo,
  WorkloadInquiryDetails,
  InquiryValidation,
  DistributedNodesInfo,
  AzureWorkloadRecoveryPoint,
  AzureWorkloadSAPHanaRecoveryPoint,
  AzureWorkloadSQLRecoveryPoint,
  AzureWorkloadSQLRecoveryPointExtendedInfo,
  DpmContainer,
  DPMContainerExtendedInfo,
  GenericContainer,
  GenericContainerExtendedInfo,
  ContainerIdentityInfo,
  GenericRecoveryPoint,
  IaaSVMContainer,
  IaaSVMProtectableItem,
  IaasVMRecoveryPoint,
  KeyAndSecretDetails,
  KEKDetails,
  BEKDetails,
  RecoveryPointTierInformation,
  MabContainer,
  MabContainerExtendedInfo,
  MABContainerHealthDetails,
  AzureIaaSClassicComputeVMProtectedItem,
  AzureIaaSComputeVMProtectedItem,
  AzureWorkloadPointInTimeRestoreRequest,
  AzureWorkloadSAPHanaPointInTimeRestoreRequest,
  AzureWorkloadSQLPointInTimeRestoreRequest,
  AzureBackupServerContainer,
  AzureIaaSClassicComputeVMContainer,
  AzureIaaSClassicComputeVMProtectableItem,
  AzureIaaSComputeVMContainer,
  AzureIaaSComputeVMProtectableItem,
  AzureSQLAGWorkloadContainerProtectionContainer,
  AzureVMAppContainerProtectionContainer,
  AzureWorkloadPointInTimeRecoveryPoint,
  PointInTimeRange,
  AzureWorkloadSAPHanaPointInTimeRecoveryPoint,
  AzureWorkloadSQLPointInTimeRecoveryPoint
} from "../models/mappers";

