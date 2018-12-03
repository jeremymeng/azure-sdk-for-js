/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/reservationsSummariesMappers";
import * as Parameters from "../models/parameters";
import { ConsumptionManagementClientContext } from "../consumptionManagementClientContext";

/** Class representing a ReservationsSummaries. */
export class ReservationsSummaries {
  private readonly client: ConsumptionManagementClientContext;

  /**
   * Create a ReservationsSummaries.
   * @param {ConsumptionManagementClientContext} client Reference to the service client.
   */
  constructor(client: ConsumptionManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists the reservations summaries for daily or monthly grain.
   * @param reservationOrderId Order Id of the reservation
   * @param grain Can be daily or monthly. Possible values include: 'DailyGrain', 'MonthlyGrain'
   * @param [options] The optional parameters
   * @returns Promise<Models.ReservationsSummariesListByReservationOrderResponse>
   */
  listByReservationOrder(reservationOrderId: string, grain: Models.Datagrain, options?: Models.ReservationsSummariesListByReservationOrderOptionalParams): Promise<Models.ReservationsSummariesListByReservationOrderResponse>;
  /**
   * @param reservationOrderId Order Id of the reservation
   * @param grain Can be daily or monthly. Possible values include: 'DailyGrain', 'MonthlyGrain'
   * @param callback The callback
   */
  listByReservationOrder(reservationOrderId: string, grain: Models.Datagrain, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  /**
   * @param reservationOrderId Order Id of the reservation
   * @param grain Can be daily or monthly. Possible values include: 'DailyGrain', 'MonthlyGrain'
   * @param options The optional parameters
   * @param callback The callback
   */
  listByReservationOrder(reservationOrderId: string, grain: Models.Datagrain, options: Models.ReservationsSummariesListByReservationOrderOptionalParams, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  listByReservationOrder(reservationOrderId: string, grain: Models.Datagrain, options?: Models.ReservationsSummariesListByReservationOrderOptionalParams | msRest.ServiceCallback<Models.ReservationSummariesListResult>, callback?: msRest.ServiceCallback<Models.ReservationSummariesListResult>): Promise<Models.ReservationsSummariesListByReservationOrderResponse> {
    return this.client.sendOperationRequest(
      {
        reservationOrderId,
        grain,
        options
      },
      listByReservationOrderOperationSpec,
      callback) as Promise<Models.ReservationsSummariesListByReservationOrderResponse>;
  }

  /**
   * Lists the reservations summaries for daily or monthly grain.
   * @param reservationOrderId Order Id of the reservation
   * @param reservationId Id of the reservation
   * @param grain Can be daily or monthly. Possible values include: 'DailyGrain', 'MonthlyGrain'
   * @param [options] The optional parameters
   * @returns Promise<Models.ReservationsSummariesListByReservationOrderAndReservationResponse>
   */
  listByReservationOrderAndReservation(reservationOrderId: string, reservationId: string, grain: Models.Datagrain, options?: Models.ReservationsSummariesListByReservationOrderAndReservationOptionalParams): Promise<Models.ReservationsSummariesListByReservationOrderAndReservationResponse>;
  /**
   * @param reservationOrderId Order Id of the reservation
   * @param reservationId Id of the reservation
   * @param grain Can be daily or monthly. Possible values include: 'DailyGrain', 'MonthlyGrain'
   * @param callback The callback
   */
  listByReservationOrderAndReservation(reservationOrderId: string, reservationId: string, grain: Models.Datagrain, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  /**
   * @param reservationOrderId Order Id of the reservation
   * @param reservationId Id of the reservation
   * @param grain Can be daily or monthly. Possible values include: 'DailyGrain', 'MonthlyGrain'
   * @param options The optional parameters
   * @param callback The callback
   */
  listByReservationOrderAndReservation(reservationOrderId: string, reservationId: string, grain: Models.Datagrain, options: Models.ReservationsSummariesListByReservationOrderAndReservationOptionalParams, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  listByReservationOrderAndReservation(reservationOrderId: string, reservationId: string, grain: Models.Datagrain, options?: Models.ReservationsSummariesListByReservationOrderAndReservationOptionalParams | msRest.ServiceCallback<Models.ReservationSummariesListResult>, callback?: msRest.ServiceCallback<Models.ReservationSummariesListResult>): Promise<Models.ReservationsSummariesListByReservationOrderAndReservationResponse> {
    return this.client.sendOperationRequest(
      {
        reservationOrderId,
        reservationId,
        grain,
        options
      },
      listByReservationOrderAndReservationOperationSpec,
      callback) as Promise<Models.ReservationsSummariesListByReservationOrderAndReservationResponse>;
  }

  /**
   * Lists the reservations summaries for daily or monthly grain.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ReservationsSummariesListByReservationOrderNextResponse>
   */
  listByReservationOrderNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ReservationsSummariesListByReservationOrderNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByReservationOrderNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByReservationOrderNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  listByReservationOrderNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ReservationSummariesListResult>, callback?: msRest.ServiceCallback<Models.ReservationSummariesListResult>): Promise<Models.ReservationsSummariesListByReservationOrderNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByReservationOrderNextOperationSpec,
      callback) as Promise<Models.ReservationsSummariesListByReservationOrderNextResponse>;
  }

  /**
   * Lists the reservations summaries for daily or monthly grain.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ReservationsSummariesListByReservationOrderAndReservationNextResponse>
   */
  listByReservationOrderAndReservationNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ReservationsSummariesListByReservationOrderAndReservationNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByReservationOrderAndReservationNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByReservationOrderAndReservationNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ReservationSummariesListResult>): void;
  listByReservationOrderAndReservationNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ReservationSummariesListResult>, callback?: msRest.ServiceCallback<Models.ReservationSummariesListResult>): Promise<Models.ReservationsSummariesListByReservationOrderAndReservationNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByReservationOrderAndReservationNextOperationSpec,
      callback) as Promise<Models.ReservationsSummariesListByReservationOrderAndReservationNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listByReservationOrderOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.Capacity/reservationorders/{reservationOrderId}/providers/Microsoft.Consumption/reservationSummaries",
  urlParameters: [
    Parameters.reservationOrderId
  ],
  queryParameters: [
    Parameters.grain,
    Parameters.filter0,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ReservationSummariesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByReservationOrderAndReservationOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.Capacity/reservationorders/{reservationOrderId}/reservations/{reservationId}/providers/Microsoft.Consumption/reservationSummaries",
  urlParameters: [
    Parameters.reservationOrderId,
    Parameters.reservationId
  ],
  queryParameters: [
    Parameters.grain,
    Parameters.filter0,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ReservationSummariesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByReservationOrderNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ReservationSummariesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByReservationOrderAndReservationNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ReservationSummariesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
