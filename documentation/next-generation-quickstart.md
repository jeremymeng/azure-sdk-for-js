# Getting Started - Using the next-generation management libraries of Azure SDK for JavaScript/TypeScript

We are excited to announce the GA of a new set of management plane libraries for JavaScript/TypeScript. Those libraries contain a number of new features including Azure Identity support, HTTP pipeline, error-handling, etc, and follow the new Azure SDK guidelines which create easy-to-use
APIs that are idiomatic, compatible, and dependable. See [TypeScript Design Guidelines](https://azure.github.io/azure-sdk/typescript_design.html) for more information.

Currently, we have released GA version of several packages such as `@azure/arm-resources`, `@azure/arm-storage`,
`@azure/arm-compute`, `@azure/arm-network` for next-generation. Please find the latest version of those libraries in [npm](https://www.npmjs.com) and have a try.

In this basic quickstart guide, we will walk you through how to
authenticate to Azure and start interacting with Azure resources. There are several possible approaches to
authentication. This document illustrates the most common scenario.

## Migrating from an older generation of Azure management libraries for JavaScript/TypeScript

If you are current user of an older generation of the JavaScript SDK, and are interested in upgrading to the latest version, please refer to this [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/MIGRATION-guide-for-next-generation-management-libraries.md) for more information.

## Prerequisites

You will need the following values to authenticate to Azure

- **Subscription ID**
- **Client ID**
- **Client Secret**
- **Tenant ID**

These values can be obtained from the portal, here's the instructions:

### Get Subscription ID

1.  Login into your Azure account
2.  Select Subscriptions in the left sidebar
3.  Select whichever subscription is needed
4.  Click on Overview
5.  Copy the Subscription ID

### Get Client ID / Client Secret / Tenant ID

For information on how to get Client ID, Client Secret, and Tenant ID,
please refer to [this document](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal)

### Setting Environment Variables

After you obtained the values, you need to set the following values as
your environment variables

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

To set the following environment variables on your development system:

Windows (Note: Administrator access is required)

1.  Open the Control Panel
2.  Click System Security, then System
3.  Click Advanced system settings on the left
4.  Inside the System Properties window, click the `Environment Variables…` button.
5.  Click on the property you would like to change, then click the `Edit…` button. If the property name is not listed, then click the `New…` button.

Linux-based OS :

    export AZURE_CLIENT_ID="azure_client_id"
    export AZURE_CLIENT_SECRET="azure_client_secret"
    export AZURE_TENANT_ID="azure_tenant_id"
    export AZURE_SUBSCRIPTION_ID="azure_subscription_id"

## Install the package

As an example, to install the Azure Resource Manager module, you would run:

```sh
npm i @azure/arm-resources@latest
```

We also recommend installing the authentication package:

```sh
npm i @azure/identity
```

## Authentication

Once the environment is setup, all you need to do is to create an authenticated client. The `@azure/identity` module provides facilities for various ways of authenticating with Azure including client/secret, certificate, managed identity, and more.

Our default option is to use **DefaultAzureCredential** which will make use of the environment variables we have set and take care of the authentication flow for us.

```typescript
const credential = new DefaultAzureCredential();
```

For more details on how authentication works in `@azure/identity`, please see the documentation for [`@azure/identity`](https://www.npmjs.com/package/@azure/identity).

## Creating a Resource Management Client

To begin, determine the target service and create a client to connect to it. In this example, we will use `ResourceManagementClient` as the service client:

```typescript
const client = new ResourceManagementClient(credential, subscriptionId);
```

## Interacting with Azure Resources

Once authenticated and the client is created, you can use it to perform API operations. In resource management scenarios, common operations include creating, updating, reading, and deleting Azure resources. These operations are referred to as "management operations" in Azure.
After identifying the specific operation you want to perform, you can implement it using the management client initialized above.

We will walk through two examples:

- **Example 1**: Creating a resource group.
- **Example 2**: Listing resource groups.

### Example 1: Create a resource group

**_Import the packages_**  

```typescript
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
```

**_Define some global variables_**  

```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const client = new ResourceManagementClient(credential, subscriptionId);
```

**_Create a resource group_**  

```typescript
async function createResourceGroup(resourceGroupName: string): Promise<void> {
  const result = await client.resourceGroups.createOrUpdate(resourceGroupName, {
    location: "eastus",
    tags: {
      environment: "test",
    },
  });
  console.log(result);
}
```

### Example 2: List resource groups with the Azure SDK

**_Import the packages_**  

```typescript
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
```

**_Authentication and set up_**  

```typescript
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const client = new ResourceManagementClient(credential, subscriptionId);
```

**_List all resource groups_**  

```typescript
async function listResourceGroups(): Promise<void> {
  const resourceGroups = [];
  for await (const resourceGroup of client.resourceGroups.list()) {
    resourceGroups.push(resourceGroup);
  }

  console.log(resourceGroups);
}
```

**_Manage resource groups_**  

```typescript
async function main() {
  const resourceGroupName = "your-resource-group";
  await createResourceGroup(resourceGroupName);
  await listResourceGroups();
}
```

## Code Samples

More code samples for using the management library for JS/TS SDK can be found in [JS/TS SDK Code Samples](https://aka.ms/azsdk/js/mgmt/samples)

_Please Note that these samples provided in JS/TS SDK Code Samples are written in TypeScript_

## Need help?

- File an issue via [Github
  Issues](https://github.com/Azure/azure-sdk-for-js/issues)

## Contributing

For details on contributing to this repository, see the contributing
guide.

This project welcomes contributions and suggestions. Most contributions
require you to agree to a Contributor License Agreement (CLA) declaring
that you have the right to, and actually do, grant us the rights to use
your contribution. For details, visit <https://cla.microsoft.com>.

When you submit a pull request, a CLA-bot will automatically determine
whether you need to provide a CLA and decorate the PR appropriately
(e.g., label, comment). Simply follow the instructions provided by the
bot. You will only need to do this once across all repositories using
our CLA.

This project has adopted the Microsoft Open Source Code of Conduct. For
more information see the Code of Conduct FAQ or contact
<opencode@microsoft.com> with any additional questions or comments.
