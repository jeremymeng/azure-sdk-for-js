/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
    DocumentationContract,
    DocumentationCreateOrUpdateOptionalParams,
    DocumentationCreateOrUpdateResponse,
    DocumentationDeleteOptionalParams,
    DocumentationGetEntityTagOptionalParams,
    DocumentationGetEntityTagResponse,
    DocumentationGetOptionalParams,
    DocumentationGetResponse,
    DocumentationListByServiceOptionalParams,
    DocumentationUpdateContract,
    DocumentationUpdateOptionalParams,
    DocumentationUpdateResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Documentation. */
export interface Documentation {
    /**
     * Lists all Documentations of the API Management service instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param options The options parameters.
     */
    listByService(
        resourceGroupName: string,
        serviceName: string,
        options?: DocumentationListByServiceOptionalParams
    ): PagedAsyncIterableIterator<DocumentationContract>;
    /**
     * Gets the entity state (Etag) version of the Documentation by its identifier.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param documentationId Documentation identifier. Must be unique in the current API Management
     *                        service instance.
     * @param options The options parameters.
     */
    getEntityTag(
        resourceGroupName: string,
        serviceName: string,
        documentationId: string,
        options?: DocumentationGetEntityTagOptionalParams
    ): Promise<DocumentationGetEntityTagResponse>;
    /**
     * Gets the details of the Documentation specified by its identifier.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param documentationId Documentation identifier. Must be unique in the current API Management
     *                        service instance.
     * @param options The options parameters.
     */
    get(
        resourceGroupName: string,
        serviceName: string,
        documentationId: string,
        options?: DocumentationGetOptionalParams
    ): Promise<DocumentationGetResponse>;
    /**
     * Creates a new Documentation or updates an existing one.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param documentationId Documentation identifier. Must be unique in the current API Management
     *                        service instance.
     * @param parameters Create parameters.
     * @param options The options parameters.
     */
    createOrUpdate(
        resourceGroupName: string,
        serviceName: string,
        documentationId: string,
        parameters: DocumentationContract,
        options?: DocumentationCreateOrUpdateOptionalParams
    ): Promise<DocumentationCreateOrUpdateResponse>;
    /**
     * Updates the details of the Documentation for an API specified by its identifier.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param documentationId Documentation identifier. Must be unique in the current API Management
     *                        service instance.
     * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
     *                response of the GET request or it should be * for unconditional update.
     * @param parameters Documentation Update parameters.
     * @param options The options parameters.
     */
    update(
        resourceGroupName: string,
        serviceName: string,
        documentationId: string,
        ifMatch: string,
        parameters: DocumentationUpdateContract,
        options?: DocumentationUpdateOptionalParams
    ): Promise<DocumentationUpdateResponse>;
    /**
     * Deletes the specified Documentation from an API.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param documentationId Documentation identifier. Must be unique in the current API Management
     *                        service instance.
     * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
     *                response of the GET request or it should be * for unconditional update.
     * @param options The options parameters.
     */
    delete(
        resourceGroupName: string,
        serviceName: string,
        documentationId: string,
        ifMatch: string,
        options?: DocumentationDeleteOptionalParams
    ): Promise<void>;
}
