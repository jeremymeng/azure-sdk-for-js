// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DigitalTwinsClient } from "../../src/index.js";
import { authenticate } from "../utils/testAuthentication.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const MODEL_ID = "dtmi:samples:DTModelTestsModel;1";
const COMPONENT_ID = "dtmi:samples:DTModelTestsComponent;1";

const testComponent = {
  "@id": COMPONENT_ID,
  "@type": "Interface",
  "@context": "dtmi:dtdl:context;2",
  displayName: "Component1",
  contents: [
    {
      "@type": "Property",
      name: "ComponentProp1",
      schema: "string",
    },
    {
      "@type": "Telemetry",
      name: "ComponentTelemetry1",
      schema: "integer",
    },
  ],
};

const testModel = {
  "@id": MODEL_ID,
  "@type": "Interface",
  "@context": "dtmi:dtdl:context;2",
  displayName: "TempModel",
  contents: [
    {
      "@type": "Property",
      name: "Prop1",
      schema: "string",
    },
    {
      "@type": "Component",
      name: "Component1",
      schema: COMPONENT_ID,
    },
    {
      "@type": "Telemetry",
      name: "Telemetry1",
      schema: "integer",
    },
  ],
};

describe("DigitalTwins Models - create, read, list, delete operations", () => {
  let client: DigitalTwinsClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    const authentication = await authenticate(ctx);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  async function deleteModels(): Promise<void> {
    try {
      await client.deleteModel(MODEL_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteModel failed during test setup or cleanup", e);
        throw e;
      }
    }

    try {
      await client.deleteModel(COMPONENT_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteModel failed during test setup or cleanup", e);
        throw e;
      }
    }
  }

  async function createModel(): Promise<void> {
    const simpleModels = [testComponent, testModel];
    await client.createModels(simpleModels);
  }

  async function setUpModels(): Promise<void> {
    await deleteModels();
    await createModel();
  }

  it("create models empty", async () => {
    await deleteModels();

    let errorWasThrown = false;
    try {
      await client.createModels([]);
    } catch (error: any) {
      errorWasThrown = true;
      assert.isTrue(
        error.message.includes(
          "Operation failed as models provided was empty or of a type that is not supported.",
        ) || error.message.includes(`should satisfy the constraint "MinItems`),
      );
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create models", async () => {
    await deleteModels();

    try {
      const models = await client.createModels([testComponent, testModel]);
      assert.equal(models.length, 2, "Unexpected result from createModels().");
      assert.equal(
        models[0].id,
        testComponent["@id"],
        "Unexpected component in result from createModels().",
      );
      assert.equal(
        models[1].id,
        testModel["@id"],
        "Unexpected model in result from createModels().",
      );
    } finally {
      await deleteModels();
    }
  });

  it("create model existing", async () => {
    await setUpModels();

    let errorWasThrown = false;
    try {
      await client.createModels([testComponent, testModel]);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `Some of the model ids already exist`);
    } finally {
      await deleteModels();
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create model invalid model", async () => {
    await deleteModels();

    const invalidComponent = {
      "@context": "dtmi:dtdl:context;2",
      displayName: "Component1",
      contents: [
        {
          "@type": "Property",
          name: "ComponentProp1",
          schema: "string",
        },
        {
          "@type": "Telemetry",
          name: "ComponentTelemetry1",
          schema: "integer",
        },
      ],
    };

    let errorWasThrown = false;
    try {
      await client.createModels([invalidComponent]);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `None of the models in this request could be created due to a problem with one or more models`,
      );
    } finally {
      await deleteModels();
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create model invalid reference", async () => {
    await deleteModels();

    const invalidModel = {
      "@id": MODEL_ID,
      "@type": "Interface",
      "@context": "dtmi:dtdl:context;2",
      displayName: "TempModel",
      contents: [
        {
          "@type": "Property",
          name: "Prop1",
          schema: "string",
        },
        {
          "@type": "Component",
          name: "Component1",
          schema: "XXX",
        },
        {
          "@type": "Telemetry",
          name: "Telemetry1",
          schema: "integer",
        },
      ],
    };

    let errorWasThrown = false;
    try {
      await client.createModels([invalidModel]);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `None of the models in this request could be created due to a problem with one or more models`,
      );
    } finally {
      await deleteModels();
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("get model", async () => {
    await setUpModels();

    try {
      const model = await client.getModel(COMPONENT_ID);
      assert.equal(
        model.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
    } finally {
      await deleteModels();
    }
  });

  it("get model with definition", async () => {
    await setUpModels();

    try {
      const model = await client.getModel(COMPONENT_ID, { includeModelDefinition: true });
      assert.equal(
        model.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
    } finally {
      await deleteModels();
    }
  });

  it("get model not existing", async () => {
    await deleteModels();

    let errorWasThrown = false;
    try {
      await client.getModel(COMPONENT_ID);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `There is no Model(s) available that matches the provided id(s)`,
      );
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("list models", async () => {
    await setUpModels();

    try {
      const models = client.listModels();

      let componentModelFound = false;
      let modelModelFound = false;
      let count = 0;
      for await (const model of models) {
        if (model.id === COMPONENT_ID) {
          componentModelFound = true;
        }
        if (model.id === MODEL_ID) {
          modelModelFound = true;
        }
        count++;
      }
      assert.equal(count >= 2, true, "Unexpected result from listModels().");
      assert.equal(componentModelFound, true, "Unexpected result from listModels().");
      assert.equal(modelModelFound, true, "Unexpected result from listModels().");
    } finally {
      await deleteModels();
    }
  });

  it("list models with definition", async () => {
    await setUpModels();

    try {
      const models = client.listModels({ includeModelDefinition: true });

      let componentModelFound = false;
      let modelModelFound = false;
      let count = 0;
      for await (const model of models) {
        if (model.id === COMPONENT_ID) {
          componentModelFound = true;
        }
        if (model.id === MODEL_ID) {
          modelModelFound = true;
        }
        count++;
      }
      assert.equal(count >= 2, true, "Unexpected result from listModels().");
      assert.equal(componentModelFound, true, "Unexpected result from listModels().");
      assert.equal(modelModelFound, true, "Unexpected result from listModels().");
    } finally {
      await deleteModels();
    }
  });

  it("decommission model", async () => {
    await deleteModels();

    try {
      await client.createModels([testComponent]);

      const model1 = await client.getModel(COMPONENT_ID);
      assert.equal(
        model1.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
      assert.equal(model1.decommissioned, false, "Unexpected result from getModel().");

      await client.decomissionModel(COMPONENT_ID);
      const model2 = await client.getModel(COMPONENT_ID);
      assert.equal(
        model2.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
      assert.equal(model2.decommissioned, true, "Unexpected result from getModel().");
    } finally {
      await deleteModels();
    }
  });

  it("decommission model not existing", async () => {
    await deleteModels();
    if (isLiveMode()) {
      delay(500);
    }

    let errorWasThrown = false;
    try {
      await client.decomissionModel(COMPONENT_ID);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `There is no Model(s) available that matches the provided id(s)`,
      );
    } finally {
      await deleteModels();
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("decommission model already decommissioned", async () => {
    await deleteModels();

    try {
      await client.createModels([testComponent]);

      const model1 = await client.getModel(COMPONENT_ID);
      assert.equal(
        model1.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
      assert.equal(model1.decommissioned, false, "Unexpected result from getModel().");

      await client.decomissionModel(COMPONENT_ID);
      const model2 = await client.getModel(COMPONENT_ID);
      assert.equal(
        model2.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
      assert.equal(model2.decommissioned, true, "Unexpected result from getModel().");

      await client.decomissionModel(COMPONENT_ID);
      const model3 = await client.getModel(COMPONENT_ID);
      assert.equal(
        model3.id,
        testComponent["@id"],
        "Unexpected component in result from getModel().",
      );
      assert.equal(model3.decommissioned, true, "Unexpected result from getModel().");
    } finally {
      await deleteModels();
    }
  });

  it("delete model", async () => {
    await setUpModels();

    try {
      await client.deleteModel(MODEL_ID);
      let errorWasThrown = false;
      try {
        await client.getModel(MODEL_ID);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(
          error.message,
          `There is no Model(s) available that matches the provided id(s)`,
        );
      }
      assert.equal(errorWasThrown, true, "Error was not thrown 1");

      await client.deleteModel(COMPONENT_ID);
      errorWasThrown = false;
      try {
        await client.getModel(COMPONENT_ID);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(
          error.message,
          `There is no Model(s) available that matches the provided id(s)`,
        );
      }
      assert.equal(errorWasThrown, true, "Error was not thrown 2");
    } finally {
      await deleteModels();
    }
  });

  it("delete model not existing", async () => {
    await deleteModels();

    let errorWasThrown = false;
    try {
      await client.deleteModel(MODEL_ID);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `There is no Model(s) available that matches the provided id(s)`,
      );
    } finally {
      await deleteModels();
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("delete model already deleted", async () => {
    await setUpModels();

    await client.deleteModel(MODEL_ID);

    let errorWasThrown = false;
    try {
      await client.deleteModel(MODEL_ID);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `There is no Model(s) available that matches the provided id(s)`,
      );
    } finally {
      await deleteModels();
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("delete model with dependencies", async () => {
    await setUpModels();

    try {
      let errorWasThrown = false;
      try {
        await client.deleteModel(COMPONENT_ID);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(error.message, `This model is currently being referenced by`);
      }
      assert.equal(errorWasThrown, true, "Error was not thrown 1");

      await client.deleteModel(MODEL_ID);
      await client.deleteModel(COMPONENT_ID);

      errorWasThrown = false;
      try {
        await client.getModel(COMPONENT_ID);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(
          error.message,
          `There is no Model(s) available that matches the provided id(s)`,
        );
      }
      assert.equal(errorWasThrown, true, "Error was not thrown 2");

      errorWasThrown = false;
      try {
        await client.getModel(MODEL_ID);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(
          error.message,
          `There is no Model(s) available that matches the provided id(s)`,
        );
      }
      assert.equal(errorWasThrown, true, "Error was not thrown");
    } finally {
      await deleteModels();
    }
  });
});
