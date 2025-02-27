/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { VirtualMachines } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { NetworkCloud } from "../networkCloud.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  VirtualMachine,
  VirtualMachinesListBySubscriptionNextOptionalParams,
  VirtualMachinesListBySubscriptionOptionalParams,
  VirtualMachinesListBySubscriptionResponse,
  VirtualMachinesListByResourceGroupNextOptionalParams,
  VirtualMachinesListByResourceGroupOptionalParams,
  VirtualMachinesListByResourceGroupResponse,
  VirtualMachinesGetOptionalParams,
  VirtualMachinesGetResponse,
  VirtualMachinesCreateOrUpdateOptionalParams,
  VirtualMachinesCreateOrUpdateResponse,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesDeleteResponse,
  VirtualMachinesUpdateOptionalParams,
  VirtualMachinesUpdateResponse,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesPowerOffResponse,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesReimageResponse,
  VirtualMachinesRestartOptionalParams,
  VirtualMachinesRestartResponse,
  VirtualMachinesStartOptionalParams,
  VirtualMachinesStartResponse,
  VirtualMachinesListBySubscriptionNextResponse,
  VirtualMachinesListByResourceGroupNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing VirtualMachines operations. */
export class VirtualMachinesImpl implements VirtualMachines {
  private readonly client: NetworkCloud;

  /**
   * Initialize a new instance of the class VirtualMachines class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkCloud) {
    this.client = client;
  }

  /**
   * Get a list of virtual machines in the provided subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: VirtualMachinesListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<VirtualMachine> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: VirtualMachinesListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<VirtualMachine[]> {
    let result: VirtualMachinesListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: VirtualMachinesListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<VirtualMachine> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get a list of virtual machines in the provided resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<VirtualMachine> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<VirtualMachine[]> {
    let result: VirtualMachinesListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<VirtualMachine> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get a list of virtual machines in the provided subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: VirtualMachinesListBySubscriptionOptionalParams,
  ): Promise<VirtualMachinesListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * Get a list of virtual machines in the provided resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams,
  ): Promise<VirtualMachinesListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Get properties of the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesGetOptionalParams,
  ): Promise<VirtualMachinesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, virtualMachineName, options },
      getOperationSpec,
    );
  }

  /**
   * Create a new virtual machine or update the properties of the existing virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param virtualMachineParameters The request body.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineParameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesCreateOrUpdateResponse>,
      VirtualMachinesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        virtualMachineName,
        virtualMachineParameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesCreateOrUpdateResponse,
      OperationState<VirtualMachinesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a new virtual machine or update the properties of the existing virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param virtualMachineParameters The request body.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineParameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ): Promise<VirtualMachinesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      virtualMachineName,
      virtualMachineParameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesDeleteResponse>,
      VirtualMachinesDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, virtualMachineName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesDeleteResponse,
      OperationState<VirtualMachinesDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ): Promise<VirtualMachinesDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      virtualMachineName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Patch the properties of the provided virtual machine, or update the tags associated with the virtual
   * machine. Properties and tag updates can be done independently.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesUpdateResponse>,
      VirtualMachinesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, virtualMachineName, options },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesUpdateResponse,
      OperationState<VirtualMachinesUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Patch the properties of the provided virtual machine, or update the tags associated with the virtual
   * machine. Properties and tag updates can be done independently.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesUpdateOptionalParams,
  ): Promise<VirtualMachinesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      virtualMachineName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Power off the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginPowerOff(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesPowerOffResponse>,
      VirtualMachinesPowerOffResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesPowerOffResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, virtualMachineName, options },
      spec: powerOffOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesPowerOffResponse,
      OperationState<VirtualMachinesPowerOffResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Power off the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginPowerOffAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ): Promise<VirtualMachinesPowerOffResponse> {
    const poller = await this.beginPowerOff(
      resourceGroupName,
      virtualMachineName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Reimage the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginReimage(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesReimageResponse>,
      VirtualMachinesReimageResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesReimageResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, virtualMachineName, options },
      spec: reimageOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesReimageResponse,
      OperationState<VirtualMachinesReimageResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Reimage the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginReimageAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ): Promise<VirtualMachinesReimageResponse> {
    const poller = await this.beginReimage(
      resourceGroupName,
      virtualMachineName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Restart the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginRestart(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesRestartResponse>,
      VirtualMachinesRestartResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesRestartResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, virtualMachineName, options },
      spec: restartOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesRestartResponse,
      OperationState<VirtualMachinesRestartResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Restart the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginRestartAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ): Promise<VirtualMachinesRestartResponse> {
    const poller = await this.beginRestart(
      resourceGroupName,
      virtualMachineName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Start the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginStart(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStartOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachinesStartResponse>,
      VirtualMachinesStartResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualMachinesStartResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, virtualMachineName, options },
      spec: startOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualMachinesStartResponse,
      OperationState<VirtualMachinesStartResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Start the provided virtual machine.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param virtualMachineName The name of the virtual machine.
   * @param options The options parameters.
   */
  async beginStartAndWait(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStartOptionalParams,
  ): Promise<VirtualMachinesStartResponse> {
    const poller = await this.beginStart(
      resourceGroupName,
      virtualMachineName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: VirtualMachinesListBySubscriptionNextOptionalParams,
  ): Promise<VirtualMachinesListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: VirtualMachinesListByResourceGroupNextOptionalParams,
  ): Promise<VirtualMachinesListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine,
    },
    201: {
      bodyMapper: Mappers.VirtualMachine,
    },
    202: {
      bodyMapper: Mappers.VirtualMachine,
    },
    204: {
      bodyMapper: Mappers.VirtualMachine,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.virtualMachineParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine,
    },
    201: {
      bodyMapper: Mappers.VirtualMachine,
    },
    202: {
      bodyMapper: Mappers.VirtualMachine,
    },
    204: {
      bodyMapper: Mappers.VirtualMachine,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.virtualMachineUpdateParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const powerOffOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/powerOff",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.virtualMachinePowerOffParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const reimageOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/reimage",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const restartOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/restart",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const startOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/start",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
