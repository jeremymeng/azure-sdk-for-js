/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
} from "@azure/core-client";
import {
  BlobServiceProperties as BlobServicePropertiesMapper,
  BlobContainer as BlobContainerMapper,
  LegalHold as LegalHoldMapper,
  ImmutabilityPolicy as ImmutabilityPolicyMapper,
  LeaseContainerRequest as LeaseContainerRequestMapper,
  FileServiceProperties as FileServicePropertiesMapper,
  FileShare as FileShareMapper,
  DeletedShare as DeletedShareMapper,
  LeaseShareRequest as LeaseShareRequestMapper,
  QueueServiceProperties as QueueServicePropertiesMapper,
  StorageQueue as StorageQueueMapper,
  StorageAccountCheckNameAvailabilityParameters as StorageAccountCheckNameAvailabilityParametersMapper,
  StorageAccountCreateParameters as StorageAccountCreateParametersMapper,
  StorageAccountUpdateParameters as StorageAccountUpdateParametersMapper,
  StorageAccountRegenerateKeyParameters as StorageAccountRegenerateKeyParametersMapper,
  AccountSasParameters as AccountSasParametersMapper,
  ServiceSasParameters as ServiceSasParametersMapper,
  StorageAccountMigration as StorageAccountMigrationMapper,
  BlobRestoreParameters as BlobRestoreParametersMapper,
  ManagementPolicy as ManagementPolicyMapper,
  BlobInventoryPolicy as BlobInventoryPolicyMapper,
  PrivateEndpointConnection as PrivateEndpointConnectionMapper,
  ObjectReplicationPolicy as ObjectReplicationPolicyMapper,
  LocalUser as LocalUserMapper,
  EncryptionScope as EncryptionScopeMapper,
  TableServiceProperties as TableServicePropertiesMapper,
  Table as TableMapper,
  StorageTaskAssignment as StorageTaskAssignmentMapper,
  StorageTaskAssignmentUpdateParameters as StorageTaskAssignmentUpdateParametersMapper,
} from "../models/mappers";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      MaxLength: 90,
      MinLength: 1,
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const accountName: OperationURLParameter = {
  parameterPath: "accountName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]+$"),
      MaxLength: 24,
      MinLength: 3,
    },
    serializedName: "accountName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2023-05-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    constraints: {
      MinLength: 1,
    },
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: BlobServicePropertiesMapper,
};

export const blobServicesName: OperationURLParameter = {
  parameterPath: "blobServicesName",
  mapper: {
    defaultValue: "default",
    isConstant: true,
    serializedName: "BlobServicesName",
    type: {
      name: "String",
    },
  },
};

export const maxpagesize: OperationQueryParameter = {
  parameterPath: ["options", "maxpagesize"],
  mapper: {
    serializedName: "$maxpagesize",
    type: {
      name: "String",
    },
  },
};

export const filter: OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String",
    },
  },
};

export const include: OperationQueryParameter = {
  parameterPath: ["options", "include"],
  mapper: {
    serializedName: "$include",
    type: {
      name: "String",
    },
  },
};

export const blobContainer: OperationParameter = {
  parameterPath: "blobContainer",
  mapper: BlobContainerMapper,
};

export const containerName: OperationURLParameter = {
  parameterPath: "containerName",
  mapper: {
    constraints: {
      MaxLength: 63,
      MinLength: 3,
    },
    serializedName: "containerName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const legalHold: OperationParameter = {
  parameterPath: "legalHold",
  mapper: LegalHoldMapper,
};

export const parameters1: OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: ImmutabilityPolicyMapper,
};

export const immutabilityPolicyName: OperationURLParameter = {
  parameterPath: "immutabilityPolicyName",
  mapper: {
    defaultValue: "default",
    isConstant: true,
    serializedName: "immutabilityPolicyName",
    type: {
      name: "String",
    },
  },
};

export const ifMatch: OperationParameter = {
  parameterPath: ["options", "ifMatch"],
  mapper: {
    serializedName: "If-Match",
    type: {
      name: "String",
    },
  },
};

export const ifMatch1: OperationParameter = {
  parameterPath: "ifMatch",
  mapper: {
    serializedName: "If-Match",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters2: OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: LeaseContainerRequestMapper,
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: FileServicePropertiesMapper,
};

export const fileServicesName: OperationURLParameter = {
  parameterPath: "fileServicesName",
  mapper: {
    defaultValue: "default",
    isConstant: true,
    serializedName: "FileServicesName",
    type: {
      name: "String",
    },
  },
};

export const expand: OperationQueryParameter = {
  parameterPath: ["options", "expand"],
  mapper: {
    serializedName: "$expand",
    type: {
      name: "String",
    },
  },
};

export const fileShare: OperationParameter = {
  parameterPath: "fileShare",
  mapper: FileShareMapper,
};

export const shareName: OperationURLParameter = {
  parameterPath: "shareName",
  mapper: {
    constraints: {
      MaxLength: 63,
      MinLength: 3,
    },
    serializedName: "shareName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const xMsSnapshot: OperationParameter = {
  parameterPath: ["options", "xMsSnapshot"],
  mapper: {
    serializedName: "x-ms-snapshot",
    type: {
      name: "String",
    },
  },
};

export const include1: OperationQueryParameter = {
  parameterPath: ["options", "include"],
  mapper: {
    serializedName: "$include",
    type: {
      name: "String",
    },
  },
};

export const deletedShare: OperationParameter = {
  parameterPath: "deletedShare",
  mapper: DeletedShareMapper,
};

export const parameters4: OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: LeaseShareRequestMapper,
};

export const parameters5: OperationParameter = {
  parameterPath: "parameters",
  mapper: QueueServicePropertiesMapper,
};

export const queueServiceName: OperationURLParameter = {
  parameterPath: "queueServiceName",
  mapper: {
    defaultValue: "default",
    isConstant: true,
    serializedName: "queueServiceName",
    type: {
      name: "String",
    },
  },
};

export const queue: OperationParameter = {
  parameterPath: "queue",
  mapper: StorageQueueMapper,
};

export const queueName: OperationURLParameter = {
  parameterPath: "queueName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]([a-z0-9]|(-(?!-))){1,61}[a-z0-9]$"),
      MaxLength: 63,
      MinLength: 3,
    },
    serializedName: "queueName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const accountName1: OperationParameter = {
  parameterPath: "accountName",
  mapper: StorageAccountCheckNameAvailabilityParametersMapper,
};

export const parameters6: OperationParameter = {
  parameterPath: "parameters",
  mapper: StorageAccountCreateParametersMapper,
};

export const expand1: OperationQueryParameter = {
  parameterPath: ["options", "expand"],
  mapper: {
    serializedName: "$expand",
    type: {
      name: "Enum",
      allowedValues: ["geoReplicationStats", "blobRestoreStatus"],
    },
  },
};

export const parameters7: OperationParameter = {
  parameterPath: "parameters",
  mapper: StorageAccountUpdateParametersMapper,
};

export const expand2: OperationQueryParameter = {
  parameterPath: ["options", "expand"],
  mapper: {
    defaultValue: "kerb",
    isConstant: true,
    serializedName: "$expand",
    type: {
      name: "String",
    },
  },
};

export const regenerateKey: OperationParameter = {
  parameterPath: "regenerateKey",
  mapper: StorageAccountRegenerateKeyParametersMapper,
};

export const parameters8: OperationParameter = {
  parameterPath: "parameters",
  mapper: AccountSasParametersMapper,
};

export const parameters9: OperationParameter = {
  parameterPath: "parameters",
  mapper: ServiceSasParametersMapper,
};

export const failoverType: OperationQueryParameter = {
  parameterPath: ["options", "failoverType"],
  mapper: {
    defaultValue: "Planned",
    isConstant: true,
    serializedName: "failoverType",
    type: {
      name: "String",
    },
  },
};

export const requestType: OperationQueryParameter = {
  parameterPath: "requestType",
  mapper: {
    serializedName: "requestType",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters10: OperationParameter = {
  parameterPath: "parameters",
  mapper: StorageAccountMigrationMapper,
};

export const migrationName: OperationURLParameter = {
  parameterPath: "migrationName",
  mapper: {
    serializedName: "migrationName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters11: OperationParameter = {
  parameterPath: "parameters",
  mapper: BlobRestoreParametersMapper,
};

export const accountName2: OperationURLParameter = {
  parameterPath: "accountName",
  mapper: {
    constraints: {
      MaxLength: 24,
      MinLength: 3,
    },
    serializedName: "accountName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const deletedAccountName: OperationURLParameter = {
  parameterPath: "deletedAccountName",
  mapper: {
    constraints: {
      MaxLength: 24,
      MinLength: 3,
    },
    serializedName: "deletedAccountName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const location: OperationURLParameter = {
  parameterPath: "location",
  mapper: {
    serializedName: "location",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const managementPolicyName: OperationURLParameter = {
  parameterPath: "managementPolicyName",
  mapper: {
    serializedName: "managementPolicyName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const properties: OperationParameter = {
  parameterPath: "properties",
  mapper: ManagementPolicyMapper,
};

export const blobInventoryPolicyName: OperationURLParameter = {
  parameterPath: "blobInventoryPolicyName",
  mapper: {
    serializedName: "blobInventoryPolicyName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const properties1: OperationParameter = {
  parameterPath: "properties",
  mapper: BlobInventoryPolicyMapper,
};

export const privateEndpointConnectionName: OperationURLParameter = {
  parameterPath: "privateEndpointConnectionName",
  mapper: {
    serializedName: "privateEndpointConnectionName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const properties2: OperationParameter = {
  parameterPath: "properties",
  mapper: PrivateEndpointConnectionMapper,
};

export const objectReplicationPolicyId: OperationURLParameter = {
  parameterPath: "objectReplicationPolicyId",
  mapper: {
    constraints: {
      MinLength: 1,
    },
    serializedName: "objectReplicationPolicyId",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const properties3: OperationParameter = {
  parameterPath: "properties",
  mapper: ObjectReplicationPolicyMapper,
};

export const maxpagesize1: OperationQueryParameter = {
  parameterPath: ["options", "maxpagesize"],
  mapper: {
    constraints: {
      InclusiveMaximum: 5000,
      InclusiveMinimum: 1,
    },
    serializedName: "$maxpagesize",
    type: {
      name: "Number",
    },
  },
};

export const include2: OperationQueryParameter = {
  parameterPath: ["options", "include"],
  mapper: {
    serializedName: "$include",
    type: {
      name: "String",
    },
  },
};

export const username: OperationURLParameter = {
  parameterPath: "username",
  mapper: {
    constraints: {
      MaxLength: 64,
      MinLength: 3,
    },
    serializedName: "username",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const properties4: OperationParameter = {
  parameterPath: "properties",
  mapper: LocalUserMapper,
};

export const encryptionScope: OperationParameter = {
  parameterPath: "encryptionScope",
  mapper: EncryptionScopeMapper,
};

export const encryptionScopeName: OperationURLParameter = {
  parameterPath: "encryptionScopeName",
  mapper: {
    constraints: {
      MaxLength: 63,
      MinLength: 3,
    },
    serializedName: "encryptionScopeName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const include3: OperationQueryParameter = {
  parameterPath: ["options", "include"],
  mapper: {
    serializedName: "$include",
    type: {
      name: "String",
    },
  },
};

export const parameters12: OperationParameter = {
  parameterPath: "parameters",
  mapper: TableServicePropertiesMapper,
};

export const tableServiceName: OperationURLParameter = {
  parameterPath: "tableServiceName",
  mapper: {
    defaultValue: "default",
    isConstant: true,
    serializedName: "tableServiceName",
    type: {
      name: "String",
    },
  },
};

export const parameters13: OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: TableMapper,
};

export const tableName: OperationURLParameter = {
  parameterPath: "tableName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z][A-Za-z0-9]{2,62}$"),
      MaxLength: 63,
      MinLength: 3,
    },
    serializedName: "tableName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const networkSecurityPerimeterConfigurationName: OperationURLParameter =
  {
    parameterPath: "networkSecurityPerimeterConfigurationName",
    mapper: {
      constraints: {
        Pattern: new RegExp("^.*$"),
      },
      serializedName: "networkSecurityPerimeterConfigurationName",
      required: true,
      type: {
        name: "String",
      },
    },
  };

export const parameters14: OperationParameter = {
  parameterPath: "parameters",
  mapper: StorageTaskAssignmentMapper,
};

export const storageTaskAssignmentName: OperationURLParameter = {
  parameterPath: "storageTaskAssignmentName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]{3,24}$"),
      MaxLength: 24,
      MinLength: 3,
    },
    serializedName: "storageTaskAssignmentName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters15: OperationParameter = {
  parameterPath: "parameters",
  mapper: StorageTaskAssignmentUpdateParametersMapper,
};

export const maxpagesize2: OperationQueryParameter = {
  parameterPath: ["options", "maxpagesize"],
  mapper: {
    serializedName: "$maxpagesize",
    type: {
      name: "Number",
    },
  },
};
