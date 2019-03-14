import { SecretClient } from "../lib/secretClient";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

async function main(): Promise<void> {
  const url = "https://jeremy-kv.vault.azure.net";
  // const credentials = await msRestNodeAuth.interactiveLogin();
  const c2 = await msRestNodeAuth.interactiveLoginWithAuthResponse();
  const pipeline = SecretClient.getDefaultPipeline(c2.credentials);
  const client = new SecretClient(url, c2.credentials, pipeline);
  //const versions = await client.getSecretVersions("Hello");
  //console.log("version: %s", JSON.stringify(versions));
  // for (const version of versions) {
  //   console.log("version: %s", JSON.stringify(version));
  // }
  const s = await client.getSecret("Hello", "3597ab0798b043d398cde46f309010ea");
  console.log("secret: %s", JSON.stringify(s));

  const result = await client.setSecret("name", "secret");
  console.log("result: %s", JSON.stringify(result));
}

main().catch((err) => {
console.log("error: ", err);
});
