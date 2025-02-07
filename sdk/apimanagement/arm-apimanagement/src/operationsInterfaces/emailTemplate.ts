/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
    EmailTemplateContract,
    EmailTemplateCreateOrUpdateOptionalParams,
    EmailTemplateCreateOrUpdateResponse,
    EmailTemplateDeleteOptionalParams,
    EmailTemplateGetEntityTagOptionalParams,
    EmailTemplateGetEntityTagResponse,
    EmailTemplateGetOptionalParams,
    EmailTemplateGetResponse,
    EmailTemplateListByServiceOptionalParams,
    EmailTemplateUpdateOptionalParams,
    EmailTemplateUpdateParameters,
    EmailTemplateUpdateResponse,
    TemplateName
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a EmailTemplate. */
export interface EmailTemplate {
    /**
     * Gets all email templates
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param options The options parameters.
     */
    listByService(
        resourceGroupName: string,
        serviceName: string,
        options?: EmailTemplateListByServiceOptionalParams
    ): PagedAsyncIterableIterator<EmailTemplateContract>;
    /**
     * Gets the entity state (Etag) version of the email template specified by its identifier.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param templateName Email Template Name Identifier.
     * @param options The options parameters.
     */
    getEntityTag(
        resourceGroupName: string,
        serviceName: string,
        templateName: TemplateName,
        options?: EmailTemplateGetEntityTagOptionalParams
    ): Promise<EmailTemplateGetEntityTagResponse>;
    /**
     * Gets the details of the email template specified by its identifier.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param templateName Email Template Name Identifier.
     * @param options The options parameters.
     */
    get(
        resourceGroupName: string,
        serviceName: string,
        templateName: TemplateName,
        options?: EmailTemplateGetOptionalParams
    ): Promise<EmailTemplateGetResponse>;
    /**
     * Updates an Email Template.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param templateName Email Template Name Identifier.
     * @param parameters Email Template update parameters.
     * @param options The options parameters.
     */
    createOrUpdate(
        resourceGroupName: string,
        serviceName: string,
        templateName: TemplateName,
        parameters: EmailTemplateUpdateParameters,
        options?: EmailTemplateCreateOrUpdateOptionalParams
    ): Promise<EmailTemplateCreateOrUpdateResponse>;
    /**
     * Updates API Management email template
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param templateName Email Template Name Identifier.
     * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
     *                response of the GET request or it should be * for unconditional update.
     * @param parameters Update parameters.
     * @param options The options parameters.
     */
    update(
        resourceGroupName: string,
        serviceName: string,
        templateName: TemplateName,
        ifMatch: string,
        parameters: EmailTemplateUpdateParameters,
        options?: EmailTemplateUpdateOptionalParams
    ): Promise<EmailTemplateUpdateResponse>;
    /**
     * Reset the Email Template to default template provided by the API Management service instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param serviceName The name of the API Management service.
     * @param templateName Email Template Name Identifier.
     * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
     *                response of the GET request or it should be * for unconditional update.
     * @param options The options parameters.
     */
    delete(
        resourceGroupName: string,
        serviceName: string,
        templateName: TemplateName,
        ifMatch: string,
        options?: EmailTemplateDeleteOptionalParams
    ): Promise<void>;
}
