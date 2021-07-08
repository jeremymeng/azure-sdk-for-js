param (
    [hashtable] $DeploymentOutputs,
    [string] $TenantId,
    [string] $TestApplicationId,
    [string] $TestApplicationSecret
)

Get-AzEnvironment | Write-Host

if ( $DeploymentOutputs['CONTAINER_REGISTRY_ENDPOINT'].EndsWith('.azurecr.us') ) {
    Connect-AzAccount –Environment AzureUSGovernment
} elseif ( $DeploymentOutputs['CONTAINER_REGISTRY_ENDPOINT'].EndsWith('.azurecr.cn') ) {
    Connect-AzAccount –Environment AzureChinaCloud
}

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINER_REGISTRY_NAME'] `
    -SourceImage 'library/busybox' -SourceRegistryUri 'registry.hub.docker.com' `
    -Mode 'Force'

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINER_REGISTRY_NAME'] `
    -SourceImage 'library/hello-world' -SourceRegistryUri 'registry.hub.docker.com' `
    -Mode 'Force' `
    -TargetTag 'library/hello-world:test1','library/hello-world:test-delete'

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINER_REGISTRY_ANONYMOUS_NAME'] `
    -SourceImage 'library/hello-world' -SourceRegistryUri 'registry.hub.docker.com' `
    -Mode 'Force' `
    -TargetTag 'library/hello-world:latest','library/hello-world:v1','library/hello-world:v2','library/hello-world:v3','library/hello-world:v4'
