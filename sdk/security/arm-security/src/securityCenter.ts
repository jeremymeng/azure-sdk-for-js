/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  LocationsImpl,
  OperationsImpl,
  TasksImpl,
  AutoProvisioningSettingsImpl,
  CompliancesImpl,
  InformationProtectionPoliciesImpl,
  WorkspaceSettingsImpl,
  AlertsSuppressionRulesImpl,
  AutomationsImpl,
  RegulatoryComplianceStandardsImpl,
  RegulatoryComplianceControlsImpl,
  RegulatoryComplianceAssessmentsImpl,
  SubAssessmentsImpl,
  ConnectorsImpl,
  SecurityContactsImpl,
  SoftwareInventoriesImpl,
  CustomAssessmentAutomationsImpl,
  CustomEntityStoreAssignmentsImpl,
  MdeOnboardingsImpl,
  GovernanceAssignmentsImpl,
  GovernanceRulesImpl,
  ApplicationsImpl,
  ApplicationOperationsImpl,
  SecurityConnectorApplicationsImpl,
  SecurityConnectorApplicationImpl,
  DefenderForStorageImpl,
  SecurityOperatorsImpl,
  SqlVulnerabilityAssessmentBaselineRulesImpl,
  SqlVulnerabilityAssessmentScansImpl,
  SqlVulnerabilityAssessmentScanResultsImpl,
  SensitivitySettingsImpl,
  HealthReportsImpl,
  AzureDevOpsOrgsImpl,
  AzureDevOpsProjectsImpl,
  AzureDevOpsReposImpl,
  DevOpsConfigurationsImpl,
  GitHubOwnersImpl,
  GitHubReposImpl,
  GitLabGroupsImpl,
  GitLabSubgroupsImpl,
  GitLabProjectsImpl,
  DevOpsOperationResultsImpl,
  SecurityConnectorsImpl,
  ComplianceResultsImpl,
  AdvancedThreatProtectionImpl,
  DeviceSecurityGroupsImpl,
  IotSecuritySolutionAnalyticsImpl,
  IotSecuritySolutionsAnalyticsAggregatedAlertImpl,
  IotSecuritySolutionsAnalyticsRecommendationImpl,
  IotSecuritySolutionImpl,
  AdaptiveNetworkHardeningsImpl,
  AllowedConnectionsImpl,
  AdaptiveApplicationControlsImpl,
  DiscoveredSecuritySolutionsImpl,
  ExternalSecuritySolutionsImpl,
  JitNetworkAccessPoliciesImpl,
  SecureScoresImpl,
  SecureScoreControlsImpl,
  SecureScoreControlDefinitionsImpl,
  SecuritySolutionsImpl,
  SecuritySolutionsReferenceDataOperationsImpl,
  ServerVulnerabilityAssessmentOperationsImpl,
  TopologyImpl,
  AssessmentsMetadataImpl,
  AssessmentsImpl,
  AlertsImpl,
  SettingsImpl,
  ServerVulnerabilityAssessmentsSettingsImpl,
  APICollectionsImpl,
  PricingsImpl,
} from "./operations";
import {
  Locations,
  Operations,
  Tasks,
  AutoProvisioningSettings,
  Compliances,
  InformationProtectionPolicies,
  WorkspaceSettings,
  AlertsSuppressionRules,
  Automations,
  RegulatoryComplianceStandards,
  RegulatoryComplianceControls,
  RegulatoryComplianceAssessments,
  SubAssessments,
  Connectors,
  SecurityContacts,
  SoftwareInventories,
  CustomAssessmentAutomations,
  CustomEntityStoreAssignments,
  MdeOnboardings,
  GovernanceAssignments,
  GovernanceRules,
  Applications,
  ApplicationOperations,
  SecurityConnectorApplications,
  SecurityConnectorApplication,
  DefenderForStorage,
  SecurityOperators,
  SqlVulnerabilityAssessmentBaselineRules,
  SqlVulnerabilityAssessmentScans,
  SqlVulnerabilityAssessmentScanResults,
  SensitivitySettings,
  HealthReports,
  AzureDevOpsOrgs,
  AzureDevOpsProjects,
  AzureDevOpsRepos,
  DevOpsConfigurations,
  GitHubOwners,
  GitHubRepos,
  GitLabGroups,
  GitLabSubgroups,
  GitLabProjects,
  DevOpsOperationResults,
  SecurityConnectors,
  ComplianceResults,
  AdvancedThreatProtection,
  DeviceSecurityGroups,
  IotSecuritySolutionAnalytics,
  IotSecuritySolutionsAnalyticsAggregatedAlert,
  IotSecuritySolutionsAnalyticsRecommendation,
  IotSecuritySolution,
  AdaptiveNetworkHardenings,
  AllowedConnections,
  AdaptiveApplicationControls,
  DiscoveredSecuritySolutions,
  ExternalSecuritySolutions,
  JitNetworkAccessPolicies,
  SecureScores,
  SecureScoreControls,
  SecureScoreControlDefinitions,
  SecuritySolutions,
  SecuritySolutionsReferenceDataOperations,
  ServerVulnerabilityAssessmentOperations,
  Topology,
  AssessmentsMetadata,
  Assessments,
  Alerts,
  Settings,
  ServerVulnerabilityAssessmentsSettings,
  APICollections,
  Pricings,
} from "./operationsInterfaces";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import {
  SecurityCenterOptionalParams,
  UpdateSensitivitySettingsRequest,
  UpdateSensitivitySettingsOptionalParams,
  UpdateSensitivitySettingsResponse,
  GetSensitivitySettingsOptionalParams,
  GetSensitivitySettingsOperationResponse,
} from "./models";

export class SecurityCenter extends coreClient.ServiceClient {
  $host: string;
  subscriptionId?: string;

  /**
   * Initializes a new instance of the SecurityCenter class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Azure subscription ID
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: SecurityCenterOptionalParams,
  );
  constructor(
    credentials: coreAuth.TokenCredential,
    options?: SecurityCenterOptionalParams,
  );
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionIdOrOptions?: SecurityCenterOptionalParams | string,
    options?: SecurityCenterOptionalParams,
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }

    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: SecurityCenterOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials,
    };

    const packageDetails = `azsdk-js-arm-security/6.0.0-beta.6`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://management.azure.com",
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] =
        options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName,
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName,
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge,
          },
        }),
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.locations = new LocationsImpl(this);
    this.operations = new OperationsImpl(this);
    this.tasks = new TasksImpl(this);
    this.autoProvisioningSettings = new AutoProvisioningSettingsImpl(this);
    this.compliances = new CompliancesImpl(this);
    this.informationProtectionPolicies = new InformationProtectionPoliciesImpl(
      this,
    );
    this.workspaceSettings = new WorkspaceSettingsImpl(this);
    this.alertsSuppressionRules = new AlertsSuppressionRulesImpl(this);
    this.automations = new AutomationsImpl(this);
    this.regulatoryComplianceStandards = new RegulatoryComplianceStandardsImpl(
      this,
    );
    this.regulatoryComplianceControls = new RegulatoryComplianceControlsImpl(
      this,
    );
    this.regulatoryComplianceAssessments =
      new RegulatoryComplianceAssessmentsImpl(this);
    this.subAssessments = new SubAssessmentsImpl(this);
    this.connectors = new ConnectorsImpl(this);
    this.securityContacts = new SecurityContactsImpl(this);
    this.softwareInventories = new SoftwareInventoriesImpl(this);
    this.customAssessmentAutomations = new CustomAssessmentAutomationsImpl(
      this,
    );
    this.customEntityStoreAssignments = new CustomEntityStoreAssignmentsImpl(
      this,
    );
    this.mdeOnboardings = new MdeOnboardingsImpl(this);
    this.governanceAssignments = new GovernanceAssignmentsImpl(this);
    this.governanceRules = new GovernanceRulesImpl(this);
    this.applications = new ApplicationsImpl(this);
    this.applicationOperations = new ApplicationOperationsImpl(this);
    this.securityConnectorApplications = new SecurityConnectorApplicationsImpl(
      this,
    );
    this.securityConnectorApplication = new SecurityConnectorApplicationImpl(
      this,
    );
    this.defenderForStorage = new DefenderForStorageImpl(this);
    this.securityOperators = new SecurityOperatorsImpl(this);
    this.sqlVulnerabilityAssessmentBaselineRules =
      new SqlVulnerabilityAssessmentBaselineRulesImpl(this);
    this.sqlVulnerabilityAssessmentScans =
      new SqlVulnerabilityAssessmentScansImpl(this);
    this.sqlVulnerabilityAssessmentScanResults =
      new SqlVulnerabilityAssessmentScanResultsImpl(this);
    this.sensitivitySettings = new SensitivitySettingsImpl(this);
    this.healthReports = new HealthReportsImpl(this);
    this.azureDevOpsOrgs = new AzureDevOpsOrgsImpl(this);
    this.azureDevOpsProjects = new AzureDevOpsProjectsImpl(this);
    this.azureDevOpsRepos = new AzureDevOpsReposImpl(this);
    this.devOpsConfigurations = new DevOpsConfigurationsImpl(this);
    this.gitHubOwners = new GitHubOwnersImpl(this);
    this.gitHubRepos = new GitHubReposImpl(this);
    this.gitLabGroups = new GitLabGroupsImpl(this);
    this.gitLabSubgroups = new GitLabSubgroupsImpl(this);
    this.gitLabProjects = new GitLabProjectsImpl(this);
    this.devOpsOperationResults = new DevOpsOperationResultsImpl(this);
    this.securityConnectors = new SecurityConnectorsImpl(this);
    this.complianceResults = new ComplianceResultsImpl(this);
    this.advancedThreatProtection = new AdvancedThreatProtectionImpl(this);
    this.deviceSecurityGroups = new DeviceSecurityGroupsImpl(this);
    this.iotSecuritySolutionAnalytics = new IotSecuritySolutionAnalyticsImpl(
      this,
    );
    this.iotSecuritySolutionsAnalyticsAggregatedAlert =
      new IotSecuritySolutionsAnalyticsAggregatedAlertImpl(this);
    this.iotSecuritySolutionsAnalyticsRecommendation =
      new IotSecuritySolutionsAnalyticsRecommendationImpl(this);
    this.iotSecuritySolution = new IotSecuritySolutionImpl(this);
    this.adaptiveNetworkHardenings = new AdaptiveNetworkHardeningsImpl(this);
    this.allowedConnections = new AllowedConnectionsImpl(this);
    this.adaptiveApplicationControls = new AdaptiveApplicationControlsImpl(
      this,
    );
    this.discoveredSecuritySolutions = new DiscoveredSecuritySolutionsImpl(
      this,
    );
    this.externalSecuritySolutions = new ExternalSecuritySolutionsImpl(this);
    this.jitNetworkAccessPolicies = new JitNetworkAccessPoliciesImpl(this);
    this.secureScores = new SecureScoresImpl(this);
    this.secureScoreControls = new SecureScoreControlsImpl(this);
    this.secureScoreControlDefinitions = new SecureScoreControlDefinitionsImpl(
      this,
    );
    this.securitySolutions = new SecuritySolutionsImpl(this);
    this.securitySolutionsReferenceDataOperations =
      new SecuritySolutionsReferenceDataOperationsImpl(this);
    this.serverVulnerabilityAssessmentOperations =
      new ServerVulnerabilityAssessmentOperationsImpl(this);
    this.topology = new TopologyImpl(this);
    this.assessmentsMetadata = new AssessmentsMetadataImpl(this);
    this.assessments = new AssessmentsImpl(this);
    this.alerts = new AlertsImpl(this);
    this.settings = new SettingsImpl(this);
    this.serverVulnerabilityAssessmentsSettings =
      new ServerVulnerabilityAssessmentsSettingsImpl(this);
    this.aPICollections = new APICollectionsImpl(this);
    this.pricings = new PricingsImpl(this);
  }

  /**
   * Updates data sensitivity settings for sensitive data discovery
   * @param sensitivitySettings The data sensitivity settings to update
   * @param options The options parameters.
   */
  updateSensitivitySettings(
    sensitivitySettings: UpdateSensitivitySettingsRequest,
    options?: UpdateSensitivitySettingsOptionalParams,
  ): Promise<UpdateSensitivitySettingsResponse> {
    return this.sendOperationRequest(
      { sensitivitySettings, options },
      updateSensitivitySettingsOperationSpec,
    );
  }

  /**
   * Gets data sensitivity settings for sensitive data discovery
   * @param options The options parameters.
   */
  getSensitivitySettings(
    options?: GetSensitivitySettingsOptionalParams,
  ): Promise<GetSensitivitySettingsOperationResponse> {
    return this.sendOperationRequest(
      { options },
      getSensitivitySettingsOperationSpec,
    );
  }

  locations: Locations;
  operations: Operations;
  tasks: Tasks;
  autoProvisioningSettings: AutoProvisioningSettings;
  compliances: Compliances;
  informationProtectionPolicies: InformationProtectionPolicies;
  workspaceSettings: WorkspaceSettings;
  alertsSuppressionRules: AlertsSuppressionRules;
  automations: Automations;
  regulatoryComplianceStandards: RegulatoryComplianceStandards;
  regulatoryComplianceControls: RegulatoryComplianceControls;
  regulatoryComplianceAssessments: RegulatoryComplianceAssessments;
  subAssessments: SubAssessments;
  connectors: Connectors;
  securityContacts: SecurityContacts;
  softwareInventories: SoftwareInventories;
  customAssessmentAutomations: CustomAssessmentAutomations;
  customEntityStoreAssignments: CustomEntityStoreAssignments;
  mdeOnboardings: MdeOnboardings;
  governanceAssignments: GovernanceAssignments;
  governanceRules: GovernanceRules;
  applications: Applications;
  applicationOperations: ApplicationOperations;
  securityConnectorApplications: SecurityConnectorApplications;
  securityConnectorApplication: SecurityConnectorApplication;
  defenderForStorage: DefenderForStorage;
  securityOperators: SecurityOperators;
  sqlVulnerabilityAssessmentBaselineRules: SqlVulnerabilityAssessmentBaselineRules;
  sqlVulnerabilityAssessmentScans: SqlVulnerabilityAssessmentScans;
  sqlVulnerabilityAssessmentScanResults: SqlVulnerabilityAssessmentScanResults;
  sensitivitySettings: SensitivitySettings;
  healthReports: HealthReports;
  azureDevOpsOrgs: AzureDevOpsOrgs;
  azureDevOpsProjects: AzureDevOpsProjects;
  azureDevOpsRepos: AzureDevOpsRepos;
  devOpsConfigurations: DevOpsConfigurations;
  gitHubOwners: GitHubOwners;
  gitHubRepos: GitHubRepos;
  gitLabGroups: GitLabGroups;
  gitLabSubgroups: GitLabSubgroups;
  gitLabProjects: GitLabProjects;
  devOpsOperationResults: DevOpsOperationResults;
  securityConnectors: SecurityConnectors;
  complianceResults: ComplianceResults;
  advancedThreatProtection: AdvancedThreatProtection;
  deviceSecurityGroups: DeviceSecurityGroups;
  iotSecuritySolutionAnalytics: IotSecuritySolutionAnalytics;
  iotSecuritySolutionsAnalyticsAggregatedAlert: IotSecuritySolutionsAnalyticsAggregatedAlert;
  iotSecuritySolutionsAnalyticsRecommendation: IotSecuritySolutionsAnalyticsRecommendation;
  iotSecuritySolution: IotSecuritySolution;
  adaptiveNetworkHardenings: AdaptiveNetworkHardenings;
  allowedConnections: AllowedConnections;
  adaptiveApplicationControls: AdaptiveApplicationControls;
  discoveredSecuritySolutions: DiscoveredSecuritySolutions;
  externalSecuritySolutions: ExternalSecuritySolutions;
  jitNetworkAccessPolicies: JitNetworkAccessPolicies;
  secureScores: SecureScores;
  secureScoreControls: SecureScoreControls;
  secureScoreControlDefinitions: SecureScoreControlDefinitions;
  securitySolutions: SecuritySolutions;
  securitySolutionsReferenceDataOperations: SecuritySolutionsReferenceDataOperations;
  serverVulnerabilityAssessmentOperations: ServerVulnerabilityAssessmentOperations;
  topology: Topology;
  assessmentsMetadata: AssessmentsMetadata;
  assessments: Assessments;
  alerts: Alerts;
  settings: Settings;
  serverVulnerabilityAssessmentsSettings: ServerVulnerabilityAssessmentsSettings;
  aPICollections: APICollections;
  pricings: Pricings;
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const updateSensitivitySettingsOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Security/sensitivitySettings/current",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GetSensitivitySettingsResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.sensitivitySettings,
  queryParameters: [Parameters.apiVersion13],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getSensitivitySettingsOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Security/sensitivitySettings/current",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GetSensitivitySettingsResponse,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion13],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
