/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import { TextAnalyticsClientContext } from "./textAnalyticsClientContext";

class TextAnalyticsClient extends TextAnalyticsClientContext {
  /**
   * Initializes a new instance of the TextAnalyticsClient class.
   * @param endpoint Supported Cognitive Services endpoints (protocol and hostname, for example:
   * https://westus.api.cognitive.microsoft.com).
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param [options] The parameter options
   */
  constructor(endpoint: string, credentials: msRest.ServiceClientCredentials, options?: msRest.ServiceClientOptions) {
    super(endpoint, credentials, options);
  }

  /**
   * See the <a
   * href="https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/overview#supported-languages">Text
   * Analytics Documentation</a> for details about the languages that are supported by key phrase
   * extraction.
   * @summary The API returns a list of strings denoting the key talking points in the input text.
   * @param input Collection of documents to analyze. Documents can now contain a language field to
   * indicate the text language
   * @param [options] The optional parameters
   * @returns Promise<Models.KeyPhrasesResponse>
   */
  keyPhrases(input: Models.MultiLanguageBatchInput, options?: msRest.RequestOptionsBase): Promise<Models.KeyPhrasesResponse>;
  /**
   * @param input Collection of documents to analyze. Documents can now contain a language field to
   * indicate the text language
   * @param callback The callback
   */
  keyPhrases(input: Models.MultiLanguageBatchInput, callback: msRest.ServiceCallback<Models.KeyPhraseBatchResult>): void;
  /**
   * @param input Collection of documents to analyze. Documents can now contain a language field to
   * indicate the text language
   * @param options The optional parameters
   * @param callback The callback
   */
  keyPhrases(input: Models.MultiLanguageBatchInput, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyPhraseBatchResult>): void;
  keyPhrases(input: Models.MultiLanguageBatchInput, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.KeyPhraseBatchResult>): Promise<Models.KeyPhrasesResponse> {
    return this.sendOperationRequest(
      {
        input,
        options
      },
      keyPhrasesOperationSpec,
      callback) as Promise<Models.KeyPhrasesResponse>;
  }

  /**
   * Scores close to 1 indicate 100% certainty that the identified language is true. A total of 120
   * languages are supported.
   * @summary The API returns the detected language and a numeric score between 0 and 1.
   * @param input Collection of documents to analyze.
   * @param [options] The optional parameters
   * @returns Promise<Models.DetectLanguageResponse>
   */
  detectLanguage(input: Models.BatchInput, options?: msRest.RequestOptionsBase): Promise<Models.DetectLanguageResponse>;
  /**
   * @param input Collection of documents to analyze.
   * @param callback The callback
   */
  detectLanguage(input: Models.BatchInput, callback: msRest.ServiceCallback<Models.LanguageBatchResult>): void;
  /**
   * @param input Collection of documents to analyze.
   * @param options The optional parameters
   * @param callback The callback
   */
  detectLanguage(input: Models.BatchInput, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.LanguageBatchResult>): void;
  detectLanguage(input: Models.BatchInput, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.LanguageBatchResult>): Promise<Models.DetectLanguageResponse> {
    return this.sendOperationRequest(
      {
        input,
        options
      },
      detectLanguageOperationSpec,
      callback) as Promise<Models.DetectLanguageResponse>;
  }

  /**
   * Scores close to 1 indicate positive sentiment, while scores close to 0 indicate negative
   * sentiment. A score of 0.5 indicates the lack of sentiment (e.g. a factoid statement). See the <a
   * href="https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/overview#supported-languages">Text
   * Analytics Documentation</a> for details about the languages that are supported by sentiment
   * analysis.
   * @summary The API returns a numeric score between 0 and 1.
   * @param input Collection of documents to analyze.
   * @param [options] The optional parameters
   * @returns Promise<Models.SentimentResponse>
   */
  sentiment(input: Models.MultiLanguageBatchInput, options?: msRest.RequestOptionsBase): Promise<Models.SentimentResponse>;
  /**
   * @param input Collection of documents to analyze.
   * @param callback The callback
   */
  sentiment(input: Models.MultiLanguageBatchInput, callback: msRest.ServiceCallback<Models.SentimentBatchResult>): void;
  /**
   * @param input Collection of documents to analyze.
   * @param options The optional parameters
   * @param callback The callback
   */
  sentiment(input: Models.MultiLanguageBatchInput, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SentimentBatchResult>): void;
  sentiment(input: Models.MultiLanguageBatchInput, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.SentimentBatchResult>): Promise<Models.SentimentResponse> {
    return this.sendOperationRequest(
      {
        input,
        options
      },
      sentimentOperationSpec,
      callback) as Promise<Models.SentimentResponse>;
  }

  /**
   * The API returns a list of recognized entities in a given document. To get even more information
   * on each recognized entity we recommend using the Bing Entity Search API by querying for the
   * recognized entities names. See the <a
   * href="https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/text-analytics-supported-languages">Supported
   * languages in Text Analytics API</a> for the list of enabled languages.The API returns a list of
   * known entities and general named entities ("Person", "Location", "Organization" etc) in a given
   * document. Known entities are returned with Wikipedia Id and Wikipedia link, and also Bing Id
   * which can be used in Bing Entity Search API. General named entities are returned with entity
   * types. If a general named entity is also a known entity, then all information regarding it
   * (Wikipedia Id, Bing Id, entity type etc) will be returned. See the <a
   * href="https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-entity-linking#supported-types-for-named-entity-recognition">Supported
   * Entity Types in Text Analytics API</a> for the list of supported Entity Types. See the <a
   * href="https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/text-analytics-supported-languages">Supported
   * languages in Text Analytics API</a> for the list of enabled languages.
   * @summary The API returns a list of recognized entities in a given document.
   * @param input Collection of documents to analyze.
   * @param [options] The optional parameters
   * @returns Promise<Models.EntitiesResponse>
   */
  entities(input: Models.MultiLanguageBatchInput, options?: msRest.RequestOptionsBase): Promise<Models.EntitiesResponse>;
  /**
   * @param input Collection of documents to analyze.
   * @param callback The callback
   */
  entities(input: Models.MultiLanguageBatchInput, callback: msRest.ServiceCallback<Models.EntitiesBatchResult>): void;
  /**
   * @param input Collection of documents to analyze.
   * @param options The optional parameters
   * @param callback The callback
   */
  entities(input: Models.MultiLanguageBatchInput, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.EntitiesBatchResult>): void;
  entities(input: Models.MultiLanguageBatchInput, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.EntitiesBatchResult>): Promise<Models.EntitiesResponse> {
    return this.sendOperationRequest(
      {
        input,
        options
      },
      entitiesOperationSpec,
      callback) as Promise<Models.EntitiesResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const keyPhrasesOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "keyPhrases",
  urlParameters: [
    Parameters.endpoint
  ],
  requestBody: {
    parameterPath: "input",
    mapper: {
      ...Mappers.MultiLanguageBatchInput,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.KeyPhraseBatchResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const detectLanguageOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "languages",
  urlParameters: [
    Parameters.endpoint
  ],
  requestBody: {
    parameterPath: "input",
    mapper: {
      ...Mappers.BatchInput,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.LanguageBatchResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const sentimentOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "sentiment",
  urlParameters: [
    Parameters.endpoint
  ],
  requestBody: {
    parameterPath: "input",
    mapper: {
      ...Mappers.MultiLanguageBatchInput,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.SentimentBatchResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const entitiesOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "entities",
  urlParameters: [
    Parameters.endpoint
  ],
  requestBody: {
    parameterPath: "input",
    mapper: {
      ...Mappers.MultiLanguageBatchInput,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.EntitiesBatchResult
    },
    default: {
      bodyMapper: Mappers.EntitiesErrorResponse
    }
  },
  serializer
};

export {
  TextAnalyticsClient,
  TextAnalyticsClientContext,
  Models as TextAnalyticsModels,
  Mappers as TextAnalyticsMappers
};
