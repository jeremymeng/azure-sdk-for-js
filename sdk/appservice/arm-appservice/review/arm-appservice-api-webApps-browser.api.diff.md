# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1077,9 +1077,10 @@
 // @public
 export function startWebSiteNetworkTraceSlot(context: WebSiteManagementContext, resourceGroupName: string, name: string, slot: string, options?: WebAppsStartWebSiteNetworkTraceSlotOptionalParams): Promise<WebAppsStartWebSiteNetworkTraceSlotResponse>;
 
 // @public
-export function stop(context: WebSiteManagementContext, resourceGroupName: string, name: string, options?: WebAppsStopOptionalParams): Promise<void>;
+function stop_2(context: WebSiteManagementContext, resourceGroupName: string, name: string, options?: WebAppsStopOptionalParams): Promise<void>;
+export { stop_2 as stop }
 
 // @public
 export function stopContinuousWebJob(context: WebSiteManagementContext, resourceGroupName: string, name: string, webJobName: string, options?: WebAppsStopContinuousWebJobOptionalParams): Promise<void>;
 

```