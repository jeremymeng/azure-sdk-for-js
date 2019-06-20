// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:iothub-spec");
import { EventHubClient } from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

describe("EventHub Client with iothub connection string ", function(): void {
  const service = { connectionString: env[EnvVarKeys.IOTHUB_CONNECTION_STRING] };
  let client: EventHubClient;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.IOTHUB_CONNECTION_STRING],
      "define IOTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
  });

  afterEach("close the connection", async function(): Promise<void> {
    if (client) {
      debug(">>> After Each, closing the client...");
      await client.close();
    }
  });

  it("should be able to get hub runtime info", async function(): Promise<void> {
    client = await EventHubClient.createFromIotHubConnectionString(service.connectionString!);
    const runtimeInfo = await client.getHubRuntimeInformation();
    debug(">>> RuntimeInfo: ", runtimeInfo);
    should.exist(runtimeInfo, `RuntimeIno does not exist. Found ${runtimeInfo}`);
    should.equal(runtimeInfo.type, "com.microsoft:eventhub", `Runtime Type is not equal and found ${runtimeInfo.type}`);
    should.equal(
      runtimeInfo.partitionCount > 0,
      true,
      `partitionCount is not > 0 and found ${runtimeInfo.partitionCount}`
    );
    should.equal(
      runtimeInfo.partitionIds.length > 0,
      true,
      `partitionIds.length is not > 0 and found ${runtimeInfo.partitionIds.length}`
    );
  });

  it("should be able to receive messages from the event hub", async function(): Promise<void> {
    client = await EventHubClient.createFromIotHubConnectionString(service.connectionString!);
    const datas = await client.receiveBatch("0", 15, 10);
    debug(">>>> Received events from partition %s, %O", "0", datas);
  });
}).timeout(30000);
