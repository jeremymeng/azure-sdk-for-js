let nock = require('nock');

module.exports.hash = "3fc5740afa8d751ac63cde56f92b9419";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:56:26Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:55:17Z"},{"timestamp":"2020-08-29T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:54:42Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:52:52Z"},{"timestamp":"2020-08-27T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:57:32Z"},{"timestamp":"2020-08-26T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:49:58Z"},{"timestamp":"2020-08-25T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:49:48Z"},{"timestamp":"2020-08-24T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:47:21Z"},{"timestamp":"2020-08-23T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:52:40Z"},{"timestamp":"2020-08-22T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:43:16Z"},{"timestamp":"2020-08-21T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:46:04Z"},{"timestamp":"2020-08-20T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:39:00Z"},{"timestamp":"2020-08-19T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:58:46Z"},{"timestamp":"2020-08-18T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:56:19Z"},{"timestamp":"2020-08-17T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:55:08Z"},{"timestamp":"2020-08-16T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:54:32Z"},{"timestamp":"2020-08-15T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:55:06Z"},{"timestamp":"2020-08-14T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:56:16Z"},{"timestamp":"2020-08-13T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:58:44Z"},{"timestamp":"2020-08-12T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:50:48Z"},{"timestamp":"2020-08-11T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:47:20Z"},{"timestamp":"2020-08-10T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:47:12Z"},{"timestamp":"2020-08-09T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:50:55Z"},{"timestamp":"2020-08-08T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:50:37Z"},{"timestamp":"2020-08-07T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:43:08Z"},{"timestamp":"2020-08-06T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:41:56Z"},{"timestamp":"2020-08-05T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:47:09Z"},{"timestamp":"2020-08-04T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:44:39Z"},{"timestamp":"2020-08-03T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-06-02T05:38:53Z"},{"timestamp":"2020-08-02T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:47:01Z"},{"timestamp":"2020-08-01T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:42:58Z"}]}, [
  'Content-Length',
  '4003',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5f7bd6a0-7e66-4f85-a4e9-5934ef355a18',
  'x-envoy-upstream-service-time',
  '5242',
  'apim-request-id',
  '5f7bd6a0-7e66-4f85-a4e9-5934ef355a18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 05:59:06 GMT'
]);
