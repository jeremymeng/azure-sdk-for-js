let nock = require('nock');

module.exports.hash = "b9a20d6d323f90719f60c4144a9715e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  'a3aa4e26-a333-4c67-8e77-a89f8ee05201',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:33:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfcLvBVzcVYtHjiOsjfZc-gBND3ZdP7OFA8m2i44CWelkG5H9MrYYt5tnjacu6OevGVwJZe53gBUgvj564kmk6cD7HhXSiNHs_MfGOR4o1Z_rJYzQqxJ6Ixfofs8mUt_53iRQPm2xVpLMSrlgGylp7sJaQsuf1B4YJGcEgMsKp6sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:33:36 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '06eddcf6-9993-42fc-8c86-b63e7668b100',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:33:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFYZYuYUh3MaIAq__2vofBXSUuXcyG_vH0rq8bHdM-UfgnuX-I51M2RrPvj30B925zBchwOWgu2hP-glNXzmadYNWJNWWHozCUNJMp4g4MDQdK2mNVchW9XZosYYFP96QP9X3jBNwDYVaizAZJCJwW0YjpZqxyjmqPEAs078gAzYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:33:36 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'fc9ed9eb-c584-48ca-96c5-4631d9da4b01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mDAAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:33:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:33:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/2fa8160d-4585-46b2-a736-0b624183d21f',
  'x-envoy-upstream-service-time',
  '443',
  'apim-request-id',
  '2fa8160d-4585-46b2-a736-0b624183d21f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/2fa8160d-4585-46b2-a736-0b624183d21f')
  .reply(200, {"status":"running","createdDateTime":"2021-04-28T19:33:38Z","lastUpdatedDateTime":"2021-04-28T19:33:38Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '026db218-d1f3-4093-9fbf-f920640a06ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/2fa8160d-4585-46b2-a736-0b624183d21f')
  .reply(200, {"status":"running","createdDateTime":"2021-04-28T19:33:38Z","lastUpdatedDateTime":"2021-04-28T19:33:38Z"}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '9b15abf5-652b-4230-bd56-13cc860845f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyzeResults/2fa8160d-4585-46b2-a736-0b624183d21f')
  .reply(200, {"status":"succeeded","createdDateTime":"2021-04-28T19:33:38Z","lastUpdatedDateTime":"2021-04-28T19:33:41Z","analyzeResult":{"version":"2.1.0","readResults":[{"page":1,"angle":-0.0752,"width":1688,"height":3000,"unit":"pixel"}],"documentResults":[{"docType":"prebuilt:receipt","pageRange":[1,1],"fields":{"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Name":{"type":"string","valueString":"Surface Pro 6","text":"Surface Pro 6","boundingBox":[364,1559,675,1561.7,674.5,1625.7,363.5,1623],"page":1,"confidence":0.914},"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[327,1558,352,1559,351,1623,327,1623],"page":1,"confidence":0.971},"TotalPrice":{"type":"number","valueNumber":999,"text":"999.00","boundingBox":[974,1792,1135,1796,1133,1859,973,1855],"page":1,"confidence":0.983}}},{"type":"object","valueObject":{"Name":{"type":"string","valueString":"SurfacePen","text":"SurfacePen","boundingBox":[349,2017,624,2013,624,2079,350,2084],"page":1,"confidence":0.718},"Quantity":{"type":"number","valueNumber":1,"text":"1","boundingBox":[315,2018,336,2018,337,2084,316,2085],"page":1,"confidence":0.976},"TotalPrice":{"type":"number","valueNumber":99.99,"text":"$ 99.99","boundingBox":[963,2025,1128,2025,1128,2092,963,2092],"page":1,"confidence":0.967}}}]},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","text":"123 Main Street Redmond, WA 98052","boundingBox":[311.4,688,751.3,689,750.8,859.6,311,858.5],"page":1,"confidence":0.975},"MerchantName":{"type":"string","valueString":"Contoso","text":"Contoso","boundingBox":[324,590,501,601,498,654,320,645],"page":1,"confidence":0.974},"MerchantPhoneNumber":{"type":"phoneNumber","text":"123-456-7890","boundingBox":[303,1003,621,1009,619,1071,303,1064],"page":1,"confidence":0.988},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.99},"Subtotal":{"type":"number","valueNumber":1098.99,"text":"1098.99","boundingBox":[963,2255,1137,2251,1138,2325,965,2329],"page":1,"confidence":0.982},"Tax":{"type":"number","valueNumber":104.4,"text":"$ 104.40","boundingBox":[939.7,2370.4,1130,2366.7,1131.3,2435.3,941,2439],"page":1,"confidence":0.985},"Total":{"type":"number","valueNumber":1203.39,"text":"$ 1203.39","boundingBox":[914.1,2589.8,1123,2612,1116,2677.4,907.2,2655.1],"page":1,"confidence":0.957},"TransactionDate":{"type":"date","valueDate":"2019-06-10","text":"6/10/2019","boundingBox":[299,1221,497,1222,496,1292,299,1292],"page":1,"confidence":0.987},"TransactionTime":{"type":"time","valueTime":"13:59:00","text":"13:59","boundingBox":[511,1223,628,1224,625,1292,509,1292],"page":1,"confidence":0.985}}}]}}, [
  'Content-Length',
  '2664',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '91f06f97-c083-4615-9c2c-eb71a3821da7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:33:43 GMT'
]);