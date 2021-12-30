let nock = require('nock');

module.exports.hash = "86bf0c0f959aa87dcf70aaa0f5204570";

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
  '5285c3d9-cae3-4c1d-810a-40fa8ee40100',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=At_tOHeBYX5Fq1rf2CzKNkI; expires=Sat, 15-Jan-2022 02:15:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1GTnXKGNdq2klncW0bDKlgoyjzt2FWWkDJvqBqVWN2QK_eDNqHcBi56qIHoUCSAnqLphvuenLOEuJ1gHjT5wLUN4tug25u_0Wbpbf3sG0RvI1h-Bw1PR8mjblth-czBLBB-eB6d5B9Jx9VUQfrKAdddJ5Ldy3S1dMR7vxxLbVZ0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 16 Dec 2021 02:15:55 GMT',
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
  '5285c3d9-cae3-4c1d-810a-40fa92e40100',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=An8Cev2163NAjWbRyY7CXQo; expires=Sat, 15-Jan-2022 02:15:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9aZ3YNWXpfS5ReaGoBV_fryN2jyBWVvaXT1abdAbHYk_Z2reWQz2d6DEIJuvA76pkZnUfDENoZc91VUe6biPLNWsIDs7Mi_bR4Wy_tWzVXxdU3iObuCvF_7vxFUhjWiOv2X6PGA7mWTdBqJN_2ru18mEZg1RlmuE_4aRzHaWAn0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 16 Dec 2021 02:15:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=52cb058a-2203-4c38-91ba-85a49ae0502a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6edbaf0b-a0a4-49c7-852a-1809d6690700',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkX8qvOQt_xFoVrjUB8XsyEWPr5BAQAAAFuYTNkOAAAA; expires=Sat, 15-Jan-2022 02:15:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 16 Dec 2021 02:15:56 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cdn/profiles/myprofilexxx/endpoints/myendpointxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5/profileresults/myprofilexxx/endpointresults/myendpointxxx?api-version=2020-09-01',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ff0a8fa-c6f9-4b28-8693-6129de77ed9e',
  'x-ms-client-request-id',
  'd5c0c4a7-d2d2-4e5d-bcec-647e711f7bfe',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5?api-version=2020-09-01',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  'e5112d2b-0d7d-41b1-9490-3605c7efd2f7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021600Z:e5112d2b-0d7d-41b1-9490-3605c7efd2f7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:15:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd5aa6eb5-b241-430d-a3e9-7436b770c86b',
  'x-ms-client-request-id',
  'dcbd48a9-6982-4c48-a307-79b019e3c905',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11917',
  'x-ms-correlation-request-id',
  '76438c79-d2d0-4226-885e-f0b01eb2e9e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021600Z:76438c79-d2d0-4226-885e-f0b01eb2e9e9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:15:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6c9d9999-2f4d-49a4-9008-95c033671803',
  'x-ms-client-request-id',
  '81bd20e0-5b2a-4aa6-aa7b-9784e06e15ef',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11916',
  'x-ms-correlation-request-id',
  '2119ad2f-73d1-4715-ac14-b315c244c3e6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021602Z:2119ad2f-73d1-4715-ac14-b315c244c3e6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:02 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e7d84c00-1a6d-4b90-b16f-dd894b66ff79',
  'x-ms-client-request-id',
  'f1df9eea-ba18-4383-9b5f-bb8acf0bf6d5',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11915',
  'x-ms-correlation-request-id',
  'd5e1b6ca-5c24-444d-abe0-30b313d635f3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021605Z:d5e1b6ca-5c24-444d-abe0-30b313d635f3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:04 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '930555e2-01dd-42be-a61b-6bcfab7d6f5d',
  'x-ms-client-request-id',
  '5605c0f0-d054-43e3-bec1-cda9e8637a81',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11914',
  'x-ms-correlation-request-id',
  'c701fe08-e056-4398-9ffb-e78c7d2fdea9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021607Z:c701fe08-e056-4398-9ffb-e78c7d2fdea9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e57070fc-15e4-459b-ab40-e7293c71bef2',
  'x-ms-client-request-id',
  'b0a00345-d0c9-4b35-a5b2-4e6789c3dd49',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11913',
  'x-ms-correlation-request-id',
  '848fd84d-4a45-4177-96cd-99d3d86bf4b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021609Z:848fd84d-4a45-4177-96cd-99d3d86bf4b5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:09 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ec14d828-023a-4c89-959a-ca79e6ccce1b',
  'x-ms-client-request-id',
  '238d2fef-7612-4822-a8ac-4a4bdff6a9cb',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11912',
  'x-ms-correlation-request-id',
  '2c0916c0-47d6-446e-b20b-0372f2a88880',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021612Z:2c0916c0-47d6-446e-b20b-0372f2a88880',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:11 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '11ba53aa-dc26-4467-b668-1a2ecf6c60b1',
  'x-ms-client-request-id',
  '8b47f5a1-3c08-42e2-9915-765b25186187',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11911',
  'x-ms-correlation-request-id',
  'bbd1d747-6d03-4ea2-bdec-cd4bb9163562',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021614Z:bbd1d747-6d03-4ea2-bdec-cd4bb9163562',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:13 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '32675de3-f7be-44e3-b8f4-550592e15d5a',
  'x-ms-client-request-id',
  '625b22a5-e408-48fc-a081-f0bd776f4112',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11910',
  'x-ms-correlation-request-id',
  '9c2071b4-a101-4b7a-853a-7c0926017b61',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021616Z:9c2071b4-a101-4b7a-853a-7c0926017b61',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:16 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8c25625c-78d5-4606-b8f4-e7246942341b',
  'x-ms-client-request-id',
  'c9aaa42a-7d6e-4a3f-aec9-0bbcb8a3d726',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11909',
  'x-ms-correlation-request-id',
  '3d12ad6a-bf88-4450-88b3-26f8e44aed37',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021619Z:3d12ad6a-bf88-4450-88b3-26f8e44aed37',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:18 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '00534ca4-c8e7-4e42-bf51-3a387b5dc39c',
  'x-ms-client-request-id',
  'df52dfd8-4c6b-4587-9a41-e7432928244f',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11908',
  'x-ms-correlation-request-id',
  '09f3fc36-2603-492f-a47b-86a93b4d99d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021621Z:09f3fc36-2603-492f-a47b-86a93b4d99d8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd6c2d01b-c08d-48f0-aaf6-0fd64f950180',
  'x-ms-client-request-id',
  'd716406b-39d9-42d5-8134-b8a51f69c01f',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11907',
  'x-ms-correlation-request-id',
  '0eef2b99-1ccc-4d0b-8ac7-d14b021f1e72',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021623Z:0eef2b99-1ccc-4d0b-8ac7-d14b021f1e72',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f96cdf46-2109-4a21-b106-a6dafe417e2d',
  'x-ms-client-request-id',
  '246350af-ca1a-435c-89d8-83a5ed57deca',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  'fd413dbd-7fe8-4f72-938c-7e728335a040',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021626Z:fd413dbd-7fe8-4f72-938c-7e728335a040',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:25 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b3dea63e-8608-45cc-9bfe-ed3ddaf9e739',
  'x-ms-client-request-id',
  'e05ccba1-e91c-4c98-bf98-5a66e3772186',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-correlation-request-id',
  'c97d77f8-ae77-442b-9905-fb3ac9e338cf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021628Z:c97d77f8-ae77-442b-9905-fb3ac9e338cf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:27 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4f9ca5f-fae6-4dc5-a06d-d0403705351d',
  'x-ms-client-request-id',
  '50c0ef66-06be-4107-bfe5-e14e529ad75f',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-correlation-request-id',
  '107ecb5f-6816-46ba-a0ef-4339c6fbbe63',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021630Z:107ecb5f-6816-46ba-a0ef-4339c6fbbe63',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '40aff4bc-2ceb-4d87-b664-fb96148a2180',
  'x-ms-client-request-id',
  '4191bdec-a1a4-448e-bd95-a724dd4cd168',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-correlation-request-id',
  '1f00e9c5-3c9b-4349-bc6d-01f4232f87b3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021633Z:1f00e9c5-3c9b-4349-bc6d-01f4232f87b3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6cdf4e00-ba4d-46ce-b351-436794d9aa59',
  'x-ms-client-request-id',
  'c6e85e18-437c-4689-ae3c-9784036ed55f',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-correlation-request-id',
  '9edb0996-a5d3-4860-bfbf-148cc0722b9d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021635Z:9edb0996-a5d3-4860-bfbf-148cc0722b9d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2d5fd6d5459d37cd47a38ff2baaeea8f1efde28fa6d52ca72f5f54cb9c3e5ed0b7d9057db05c97e52ff925","ff0ff1fbb5ce3e000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '60957e66-7989-41aa-8214-82064be44709',
  'x-ms-client-request-id',
  'c6ef4fa1-a503-474c-bd84-1d428935c5a9',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-correlation-request-id',
  'cdd3f4a9-d428-45dd-bfe2-1c4b1c5d7aae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021637Z:cdd3f4a9-d428-45dd-bfe2-1c4b1c5d7aae',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:37 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.Cdn/operationresults/184688fd-aa5f-4c14-872d-806c0ac7f1e5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671f8d3ecaebbaaa3f7af48b3f9a56b39cbe7b512d73fa7891374d76411f2cd765f94b","7ec9ff03e35461a53d000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c9e64aa6-7b6f-4938-83c3-3b9a8ddce241',
  'x-ms-client-request-id',
  'f5449a92-a8cf-48a8-89b6-632d445d9e01',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11900',
  'x-ms-correlation-request-id',
  '81623a55-9884-4f62-b0fa-d68859288851',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021640Z:81623a55-9884-4f62-b0fa-d68859288851',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:39 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cdn/profiles/myprofilexxx/endpoints')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bdefff","92ff0742ea40440c000000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '27f40657-d40c-458c-b9c1-b7b84f151836',
  'x-ms-client-request-id',
  '699ad824-84dd-4186-a1f1-7f502fac6bea',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '46',
  'x-ms-correlation-request-id',
  '3bbdb071-984a-4f09-a35b-de7ecb1da493',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021640Z:3bbdb071-984a-4f09-a35b-de7ecb1da493',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:16:39 GMT'
]);
