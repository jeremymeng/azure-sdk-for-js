// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to send a transactional request
 * with multiple operations in a single request
 *
 * @summary sends transactional batch requests
 */

import { TableClient, TransactionAction } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";

async function batchOperations() {
  console.log("== Batch Operations Sample ==");
  const tableName = `transactionsSample`;

  // See authenticationMethods sample for other options of creating a new client
  const client = TableClient.fromConnectionString(connectionString, tableName);

  // Create the table
  await client.createTable();

  const partitionKey = "Stationery";

  const actions: TransactionAction[] = [
    [
      "create",
      {
        partitionKey,
        rowKey: "A1",
        name: "Marker Set",
        price: 5.0,
        quantity: 21
      }
    ],
    [
      "create",
      {
        partitionKey,
        rowKey: "A2",
        name: "Pen Set",
        price: 2.0,
        quantity: 6
      }
    ],
    [
      "create",
      {
        partitionKey,
        rowKey: "A3",
        name: "Pencil",
        price: 1.5,
        quantity: 100
      }
    ]
  ];

  // Submit the transaction with the list of actions.
  // Note that all the operations within a transaction must target the same partition key
  const transactionResult = await client.submitTransaction(actions);

  console.log(transactionResult.subResponses);
  // Output:
  // [
  //   {
  //     status: 204,
  //     rowKey: 'A1',
  //     etag: `W/"datetime'2020-10-02T03%3A31%3A09.9324186Z'"`
  //   },
  //   {
  //     status: 204,
  //     rowKey: 'A2',
  //     etag: `W/"datetime'2020-10-02T03%3A31%3A09.9324186Z'"`
  //   },
  //   {
  //     status: 204,
  //     rowKey: 'A3',
  //     etag: `W/"datetime'2020-10-02T03%3A31%3A09.9324186Z'"`
  //   }
  // ]

  // Delete the table to clean up
  await client.deleteTable();
}

batchOperations().catch((err) => {
  console.error("The sample encountered an error:", err);
});