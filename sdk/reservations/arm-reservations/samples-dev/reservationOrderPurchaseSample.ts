/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { PurchaseRequest } from "@azure/arm-reservations";
import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Purchase `ReservationOrder` and create resource under the specified URI.
 *
 * @summary Purchase `ReservationOrder` and create resource under the specified URI.
 * x-ms-original-file: specification/reservations/resource-manager/Microsoft.Capacity/stable/2022-11-01/examples/PurchaseReservationOrder.json
 */
async function purchase(): Promise<void> {
  const reservationOrderId = "a075419f-44cc-497f-b68a-14ee811d48b9";
  const body: PurchaseRequest = {
    appliedScopeType: "Shared",
    appliedScopes: [],
    billingPlan: "Monthly",
    billingScopeId: "/subscriptions/ed3a1871-612d-abcd-a849-c2542a68be83",
    displayName: "TestReservationOrder",
    location: "westus",
    quantity: 1,
    renew: false,
    reservedResourceProperties: { instanceFlexibility: "On" },
    reservedResourceType: "VirtualMachines",
    sku: { name: "standard_D1" },
    term: "P1Y",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.beginPurchaseAndWait(reservationOrderId, body);
  console.log(result);
}

async function main(): Promise<void> {
  await purchase();
}

main().catch(console.error);
