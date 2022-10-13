let nock = require('nock');

module.exports.hash = "fdef2deb21856e75277d47d3231c3642";

module.exports.testInfo = {"uniqueName":{"share":"share166562953928007659","dir":"dir166562954262100514","dir￾0":"dir￾0166562954291707607","dir￾1":"dir￾1166562954320201991","dir￾2":"dir￾2166562954345709584","file￾0":"file￾0166562954374001040","file￾1":"file￾1166562954399405302","file￾2":"file￾2166562954424703334"},"newDate":{}}

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:22 GMT',
  'ETag',
  '"0x8DAACC5F3C4D7AE"',
  'x-ms-request-id',
  '0b0406bd-701a-0008-52ae-dec247000000',
  'x-ms-client-request-id',
  '37d58a07-1554-40a0-8169-693ae7a92463',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:21 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:22 GMT',
  'ETag',
  '"0x8DAACC5F3F8CD35"',
  'x-ms-request-id',
  '0b0406c0-701a-0008-53ae-dec247000000',
  'x-ms-client-request-id',
  '3ab80482-92c1-47e6-beb1-c458a66f5445',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:22.8050229Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:22.8050229Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:22.8050229Z',
  'x-ms-file-permission-key',
  '4319988430575558214*13209974753615755271',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:21 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514/dir%EF%BF%BE0166562954291707607')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:23 GMT',
  'ETag',
  '"0x8DAACC5F42164F6"',
  'x-ms-request-id',
  '0b0406c2-701a-0008-54ae-dec247000000',
  'x-ms-client-request-id',
  'd15f9575-af02-4534-944f-50809d9ba815',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:23.0710518Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:23.0710518Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:23.0710518Z',
  'x-ms-file-permission-key',
  '4319988430575558214*13209974753615755271',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:22 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514/dir%EF%BF%BE1166562954320201991')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:23 GMT',
  'ETag',
  '"0x8DAACC5F44BF6DC"',
  'x-ms-request-id',
  '0b0406c3-701a-0008-55ae-dec247000000',
  'x-ms-client-request-id',
  'ba916f57-e6e2-489a-934c-4f6d883cb470',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:23.3500380Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:23.3500380Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:23.3500380Z',
  'x-ms-file-permission-key',
  '4319988430575558214*13209974753615755271',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:22 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514/dir%EF%BF%BE2166562954345709584')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:23 GMT',
  'ETag',
  '"0x8DAACC5F472DFC3"',
  'x-ms-request-id',
  '0b0406c4-701a-0008-56ae-dec247000000',
  'x-ms-client-request-id',
  '8d7bc87b-4fea-444b-b7e7-5bedda38e2a6',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:23.6050371Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:23.6050371Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:23.6050371Z',
  'x-ms-file-permission-key',
  '4319988430575558214*13209974753615755271',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:22 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514/file%EF%BF%BE0166562954374001040')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:23 GMT',
  'ETag',
  '"0x8DAACC5F49DE747"',
  'x-ms-request-id',
  '0b0406c6-701a-0008-57ae-dec247000000',
  'x-ms-client-request-id',
  '65012876-7eaa-4f71-8f65-016c5bc3e62f',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:23.8870343Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:23.8870343Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:23.8870343Z',
  'x-ms-file-permission-key',
  '6153226917883006817*13209974753615755271',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '14988049928633188352',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:22 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514/file%EF%BF%BE1166562954399405302')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:24 GMT',
  'ETag',
  '"0x8DAACC5F4C4A9B5"',
  'x-ms-request-id',
  '0b0406c7-701a-0008-58ae-dec247000000',
  'x-ms-client-request-id',
  '035251ad-9a9e-45e4-b7a1-5d58ec64fb1c',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:24.1410485Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:24.1410485Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:24.1410485Z',
  'x-ms-file-permission-key',
  '6153226917883006817*13209974753615755271',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '12682206919419494400',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:24 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166562953928007659/dir166562954262100514/file%EF%BF%BE2166562954424703334')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 13 Oct 2022 02:52:24 GMT',
  'ETag',
  '"0x8DAACC5F4EAA82D"',
  'x-ms-request-id',
  '0b0406c8-701a-0008-59ae-dec247000000',
  'x-ms-client-request-id',
  'a9853962-8512-4f75-af1a-9e36daa7ada6',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2022-10-13T02:52:24.3900461Z',
  'x-ms-file-last-write-time',
  '2022-10-13T02:52:24.3900461Z',
  'x-ms-file-creation-time',
  '2022-10-13T02:52:24.3900461Z',
  'x-ms-file-permission-key',
  '6153226917883006817*13209974753615755271',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '17293892937846882304',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 02:52:24 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share166562953928007659/dir166562954262100514')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.preprod.core.windows.net/\" ShareName=\"share166562953928007659\" DirectoryPath=\"dir166562954262100514\"><DirectoryId>13835128424026341376</DirectoryId><Entries><Directory><Name Encoded=\"true\">dir%EF%BF%BE0166562954291707607</Name><FileId>11529285414812647424</FileId><Properties><CreationTime>2022-10-13T02:52:23.0710518Z</CreationTime><LastAccessTime>2022-10-13T02:52:23.0710518Z</LastAccessTime><LastWriteTime>2022-10-13T02:52:23.0710518Z</LastWriteTime><ChangeTime>2022-10-13T02:52:23.0710518Z</ChangeTime><Last-Modified>Thu, 13 Oct 2022 02:52:23 GMT</Last-Modified><Etag>\"0x8DAACC5F42164F6\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>4319988430575558214*13209974753615755271</PermissionKey></Directory><Directory><Name Encoded=\"true\">dir%EF%BF%BE1166562954320201991</Name><FileId>16140971433240035328</FileId><Properties><CreationTime>2022-10-13T02:52:23.3500380Z</CreationTime><LastAccessTime>2022-10-13T02:52:23.3500380Z</LastAccessTime><LastWriteTime>2022-10-13T02:52:23.3500380Z</LastWriteTime><ChangeTime>2022-10-13T02:52:23.3500380Z</ChangeTime><Last-Modified>Thu, 13 Oct 2022 02:52:23 GMT</Last-Modified><Etag>\"0x8DAACC5F44BF6DC\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>4319988430575558214*13209974753615755271</PermissionKey></Directory><Directory><Name Encoded=\"true\">dir%EF%BF%BE2166562954345709584</Name><FileId>10376363910205800448</FileId><Properties><CreationTime>2022-10-13T02:52:23.6050371Z</CreationTime><LastAccessTime>2022-10-13T02:52:23.6050371Z</LastAccessTime><LastWriteTime>2022-10-13T02:52:23.6050371Z</LastWriteTime><ChangeTime>2022-10-13T02:52:23.6050371Z</ChangeTime><Last-Modified>Thu, 13 Oct 2022 02:52:23 GMT</Last-Modified><Etag>\"0x8DAACC5F472DFC3\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>4319988430575558214*13209974753615755271</PermissionKey></Directory><File><Name Encoded=\"true\">file%EF%BF%BE0166562954374001040</Name><FileId>14988049928633188352</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2022-10-13T02:52:23.8870343Z</CreationTime><LastAccessTime>2022-10-13T02:52:23.8870343Z</LastAccessTime><LastWriteTime>2022-10-13T02:52:23.8870343Z</LastWriteTime><ChangeTime>2022-10-13T02:52:23.8870343Z</ChangeTime><Last-Modified>Thu, 13 Oct 2022 02:52:23 GMT</Last-Modified><Etag>\"0x8DAACC5F49DE747\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>6153226917883006817*13209974753615755271</PermissionKey></File><File><Name Encoded=\"true\">file%EF%BF%BE1166562954399405302</Name><FileId>12682206919419494400</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2022-10-13T02:52:24.1410485Z</CreationTime><LastAccessTime>2022-10-13T02:52:24.1410485Z</LastAccessTime><LastWriteTime>2022-10-13T02:52:24.1410485Z</LastWriteTime><ChangeTime>2022-10-13T02:52:24.1410485Z</ChangeTime><Last-Modified>Thu, 13 Oct 2022 02:52:24 GMT</Last-Modified><Etag>\"0x8DAACC5F4C4A9B5\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>6153226917883006817*13209974753615755271</PermissionKey></File><File><Name Encoded=\"true\">file%EF%BF%BE2166562954424703334</Name><FileId>17293892937846882304</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2022-10-13T02:52:24.3900461Z</CreationTime><LastAccessTime>2022-10-13T02:52:24.3900461Z</LastAccessTime><LastWriteTime>2022-10-13T02:52:24.3900461Z</LastWriteTime><ChangeTime>2022-10-13T02:52:24.3900461Z</ChangeTime><Last-Modified>Thu, 13 Oct 2022 02:52:24 GMT</Last-Modified><Etag>\"0x8DAACC5F4EAA82D\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>6153226917883006817*13209974753615755271</PermissionKey></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0406c9-701a-0008-5aae-dec247000000',
  'x-ms-client-request-id',
  'd85ed56d-182f-44af-a9ce-d40b735f027c',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:24 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659/dir166562954262100514/file%EF%BF%BE0166562954374001040')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406ca-701a-0008-5bae-dec247000000',
  'x-ms-client-request-id',
  '234ba8f4-cf71-418c-a867-667a3f20b526',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:25 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659/dir166562954262100514/file%EF%BF%BE1166562954399405302')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406cb-701a-0008-5cae-dec247000000',
  'x-ms-client-request-id',
  'ccadebdf-32c3-4206-93fc-9274fc81f931',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:25 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659/dir166562954262100514/file%EF%BF%BE2166562954424703334')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406cc-701a-0008-5dae-dec247000000',
  'x-ms-client-request-id',
  '898ba999-1f33-4e6e-b194-9fb7a216a4f6',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:25 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659/dir166562954262100514/dir%EF%BF%BE0166562954291707607')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406cd-701a-0008-5eae-dec247000000',
  'x-ms-client-request-id',
  'c4dc6d51-bfc5-48e2-b604-3ab620610e53',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:25 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659/dir166562954262100514/dir%EF%BF%BE1166562954320201991')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406ce-701a-0008-5fae-dec247000000',
  'x-ms-client-request-id',
  '362d25be-de6a-4878-a058-f1c8c29f4eca',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:25 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659/dir166562954262100514/dir%EF%BF%BE2166562954345709584')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406cf-701a-0008-60ae-dec247000000',
  'x-ms-client-request-id',
  '7925a646-4acc-4e51-8700-a10249289a26',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:26 GMT'
]);

nock('https://fakestorageaccount.file.preprod.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166562953928007659')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0406d0-701a-0008-61ae-dec247000000',
  'x-ms-client-request-id',
  'dbdfe5ba-b015-42df-a903-6b4c23581848',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Thu, 13 Oct 2022 02:52:26 GMT'
]);
