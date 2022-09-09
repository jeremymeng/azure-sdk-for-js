import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";

describe("Azure SDK", () => {
  it("send request using default http client", async () => {
    const client = createDefaultHttpClient();
    const stamp = "2021-04-28T17:42:23.227Z";
    const request = createPipelineRequest({
      url: `http://example.com/?_=${stamp}`,
      method: "GET",
      headers: createHttpHeaders({
        cookie: "",
      }),
    });
    request.allowInsecureConnection = true;
    const response = await client.sendRequest(request);
    expect(response.status).toEqual(200);
  });
});
