let nock = require('nock');

module.exports.hash = "e883311e9f4c88bc5810514b16c79386";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'ab800d36-9487-492e-b40d-f24b84cb2300',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmqJn8K46dFIrOfOpSyxAt4; expires=Sun, 23-Jan-2022 02:19:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrttjw2h-AONebyEOR4_9J2Hxa2vXINCcf739OXmIHublJJkGgZBdr2EsmmBZ-Q9xQtIE6zep_DH6gnF1tuqUBEn9k_TLyA-kc7B691CtX1ZzcUYKZYda2Tt5Giz6gldPKLqM-EQnspaahHItNuOqcO5Q9yy62coqID5JI7bH24RYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:18 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '32ea23f5-8af6-4214-946f-0c69a39d2000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiW3Xs8zLLVOgbQeHNn9VeU; expires=Sun, 23-Jan-2022 02:19:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvwVTdSQ3bCbuUkKpLH3JDN-9RAeR3N_KeXVHX01TGp_cCqOiZMn65Cnk49TkOFV2fo7V-AXKeMvTUS0S0EPXQz-dcaXz5qZ9q8fTX3iGqysvCwmUAJXUKjPTwdps5kVO-iFofqhT5kU68kswZYCnoKkBhkUvORPm1AcFPiJA4wAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2b3cd319-d68f-427b-abf0-e6f5c14d0061&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'f480e226-70a1-4283-a533-9f5e6d3e2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AngAqsLkCt5Crw1G70ZfgfTLj78gAQAAACYlV9kOAAAA; expires=Sun, 23-Jan-2022 02:19:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:18 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .post('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/pools/mypoolxxx/stopResize')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f64ed747e77827f8fa7d36abd6cf14226bfbe7bf7eeeeaaaa4a7c849ff4f747a38f96d92227ccfc8fdaeb153eda0c16cd1b6a9cb7d90535feeedddff7a39d77074f1f9e7c7a70efe4e1d367bbf78ef77edf8fa801e1b9caebb6c89b8f1efde28fcaac69bfa866c5799183207b3b7bbbdbbb7bdb7bfb6f76f61eed3e7cb4fb60fc70ffe1eedebdfd9fa277a7759e81546f0a46b2dffade78efc1839dfdbd07684d3d5d160d352f9617afdbacc52bafd7d3699ecfa8b3c8f76fea6cd914b7ef202bcb6aca08f1ebf4c2eb36cf66d7fdaf6e867cefc178ffe183fd4ff779a0978bd7c50fd0eef59be3174f8f5f3dfdfd9feed3c7c5b2cdeb17d52c3fa9168bf5b2901ea8d9d3a2c926258faacd9ab7afcbaa6d5e4ad38f1eedea87d3793e5b9734d89755594caf41fe2535785694e51b99e2d72b22f0eca35f32fa6896afcaea7a912fdb936a795e5cac6bedea177f342dabf5ec755e5f1653c2a3f365d53ccb164549c03fba4fc854cd4f1247f2771f7deba35f42809b6956e6aff3b6253c9803ce8b77f9ec353ec55f6d565fe4edd37c86b1e5330c805aed6004f8e27975f5b22eaaba68afdd572411442c10b65ab7d4d1cb37bbf7bfe0cee49b2f89df18414cc59aded9d00d08f23477b3f7258b26017d95ffa275bece694c02b4db1d8d8c80b6f8983eeb4defeea7e3079feeeeeeec6276f3baae6aeaef7b444cea8fdaab18fde4174457928c93aace7f625db5d9ab3cc3acd13b8bbc69b20bb47d33cfd366954f59665215e6749e35294d1e5aa73ff945da309c744a80d25f0448e97955a784e27296d5b3a73a49bfe4fb44a4e9baae699e23c4d06f2244ff25","bfe4ff017594bf22c2040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Last-Modified',
  'Fri, 24 Dec 2021 02:19:17 GMT',
  'ETag',
  'W/"0x8D9C683C9DF13A2"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1194',
  'x-ms-request-id',
  '3c338e79-2f59-4823-b48e-d573964b10ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'dc6339f2-d2ab-4384-90f6-2072c7e28a33',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021937Z:dc6339f2-d2ab-4384-90f6-2072c7e28a33',
  'Date',
  'Fri, 24 Dec 2021 02:19:37 GMT'
]);
