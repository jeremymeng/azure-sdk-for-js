/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * Request parameter to train a new custom model.
 */
export interface TrainRequest {
  /**
   * Source path containing the training documents.
   */
  source: string;
  /**
   * Filter to apply to the documents in the source path for training.
   */
  sourceFilter?: TrainSourceFilter;
  /**
   * Use label file for training a model.
   */
  useLabelFile?: boolean;
}

/**
 * Filter to apply to the documents in the source path for training.
 */
export interface TrainSourceFilter {
  /**
   * A case-sensitive prefix string to filter documents in the source path for training. For example, when using a Azure storage blob Uri, use the prefix to restrict sub folders for training.
   */
  prefix?: string;
  /**
   * A flag to indicate if sub folders within the set of prefix folders will also need to be included when searching for content to be preprocessed.
   */
  includeSubFolders?: boolean;
}

export interface ErrorResponse {
  error: ErrorInformation;
}

export interface ErrorInformation {
  code: string;
  message: string;
}

/**
 * Response to the list custom models operation.
 */
export interface Models {
  /**
   * Summary of all trained custom models.
   */
  summary?: ModelsSummary;
  /**
   * Collection of trained custom models.
   */
  modelList?: ModelInfo[];
  /**
   * Link to the next page of custom models.
   */
  nextLink?: string;
}

/**
 * Summary of all trained custom models.
 */
export interface ModelsSummary {
  /**
   * Current count of trained custom models.
   */
  count: number;
  /**
   * Max number of models that can be trained for this subscription.
   */
  limit: number;
  /**
   * Date and time (UTC) when the summary was last updated.
   */
  lastUpdatedOn: Date;
}

/**
 * Basic custom model information.
 */
export interface ModelInfo {
  /**
   * Model identifier.
   */
  modelId: string;
  /**
   * Status of the model.
   */
  status: ModelStatus;
  /**
   * Date and time (UTC) when the model was created.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedOn: Date;
}

/**
 * Response to the get custom model operation.
 */
export interface Model {
  /**
   * Basic custom model information.
   */
  modelInfo: ModelInfo;
  /**
   * Keys extracted by the custom model.
   */
  keys?: KeysResult;
  /**
   * Custom model training result.
   */
  trainResult?: TrainResult;
}

/**
 * Keys extracted by the custom model.
 */
export interface KeysResult {
  /**
   * Object mapping clusterIds to a list of keys.
   */
  clusters: { [propertyName: string]: string[] };
}

/**
 * Custom model training result.
 */
export interface TrainResult {
  /**
   * List of the documents used to train the model and any errors reported in each document.
   */
  trainingDocuments: TrainingDocumentInfo[];
  /**
   * List of fields used to train the model and the train operation error reported by each.
   */
  fields?: FormFieldsReport[];
  /**
   * Average accuracy.
   */
  averageModelAccuracy?: number;
  /**
   * Errors returned during the training operation.
   */
  errors?: ErrorInformation[];
}

/**
 * Report for a custom model training document.
 */
export interface TrainingDocumentInfo {
  /**
   * Training document name.
   */
  documentName: string;
  /**
   * Total number of pages trained.
   */
  pages: number;
  /**
   * List of errors.
   */
  errors: ErrorInformation[];
  /**
   * Status of the training operation.
   */
  status: TrainStatus;
}

/**
 * Report for a custom model training field.
 */
export interface FormFieldsReport {
  /**
   * Training field name.
   */
  fieldName: string;
  /**
   * Estimated extraction accuracy for this field.
   */
  accuracy: number;
}

/**
 * Uri or local path to source data.
 */
export interface SourcePath {
  /**
   * File source path.
   */
  source?: string;
}

/**
 * Status and result of the queued analyze operation.
 */
export interface AnalyzeOperationResult {
  /**
   * Operation status.
   */
  status: OperationStatus;
  /**
   * Date and time (UTC) when the analyze operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedOn: Date;
  /**
   * Results of the analyze operation.
   */
  analyzeResult?: AnalyzeResult;
}

/**
 * Analyze operation result.
 */
export interface AnalyzeResult {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * Text extracted from the input.
   */
  readResults: ReadResult[];
  /**
   * Page-level information extracted from the input.
   */
  pageResults?: PageResult[];
  /**
   * Document-level information extracted from the input.
   */
  documentResults?: DocumentResult[];
  /**
   * List of errors reported during the analyze operation.
   */
  errors?: ErrorInformation[];
}

/**
 * Text extracted from a page in the input document.
 */
export interface ReadResult {
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The general orientation of the text in clockwise direction, measured in degrees between (-180, 180].
   */
  angle: number;
  /**
   * The width of the image/PDF in pixels/inches, respectively.
   */
  width: number;
  /**
   * The height of the image/PDF in pixels/inches, respectively.
   */
  height: number;
  /**
   * The unit used by the width, height and boundingBox properties. For images, the unit is "pixel". For PDF, the unit is "inch".
   */
  unit: LengthUnit;
  /**
   * The detected language on the page overall.
   */
  language?: Language;
  /**
   * When includeTextDetails is set to true, a list of recognized text lines. The maximum number of lines returned is 300 per page. The lines are sorted top to bottom, left to right, although in certain cases proximity is treated with higher priority. As the sorting order depends on the detected text, it may change across images and OCR version updates. Thus, business logic should be built upon the actual line location instead of order.
   */
  lines?: TextLine[];
}

/**
 * An object representing an extracted text line.
 */
export interface TextLine {
  /**
   * The text content of the line.
   */
  text: string;
  /**
   * Bounding box of an extracted line.
   */
  boundingBox: number[];
  /**
   * The detected language of this line, if different from the overall page language.
   */
  language?: Language;
  /**
   * List of words in the text line.
   */
  words: TextWord[];
}

/**
 * An object representing a word.
 */
export interface TextWord {
  /**
   * The text content of the word.
   */
  text: string;
  /**
   * Bounding box of an extracted word.
   */
  boundingBox: number[];
  /**
   * Confidence value.
   */
  confidence?: number;
}

/**
 * Extracted information from a single page.
 */
export interface PageResult {
  /**
   * Page number.
   */
  pageNumber: number;
  /**
   * Cluster identifier.
   */
  clusterId?: number;
  /**
   * List of key-value pairs extracted from the page.
   */
  keyValuePairs?: KeyValuePair[];
  /**
   * List of data tables extracted from the page.
   */
  tables?: DataTable[];
}

/**
 * Information about the extracted key-value pair.
 */
export interface KeyValuePair {
  /**
   * A user defined label for the key/value pair entry.
   */
  label?: string;
  /**
   * Information about the extracted key in a key-value pair.
   */
  key: KeyValueElement;
  /**
   * Information about the extracted value in a key-value pair.
   */
  value: KeyValueElement;
  /**
   * Confidence value.
   */
  confidence: number;
}

/**
 * Information about the extracted key or value in a key-value pair.
 */
export interface KeyValueElement {
  /**
   * The text content of the key or value.
   */
  text: string;
  /**
   * Bounding box of the key or value.
   */
  boundingBox?: number[];
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting this key or value.
   */
  elements?: string[];
}

/**
 * Information about the extracted table contained in a page.
 */
export interface DataTable {
  /**
   * Number of rows.
   */
  rows: number;
  /**
   * Number of columns.
   */
  columns: number;
  /**
   * List of cells contained in the table.
   */
  cells: DataTableCell[];
}

/**
 * Information about the extracted cell in a table.
 */
export interface DataTableCell {
  /**
   * Row index of the cell.
   */
  rowIndex: number;
  /**
   * Column index of the cell.
   */
  columnIndex: number;
  /**
   * Number of rows spanned by this cell.
   */
  rowSpan?: number;
  /**
   * Number of columns spanned by this cell.
   */
  columnSpan?: number;
  /**
   * Text content of the cell.
   */
  text: string;
  /**
   * Bounding box of the cell.
   */
  boundingBox: number[];
  /**
   * Confidence value.
   */
  confidence: number;
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting this table cell.
   */
  elements?: string[];
  /**
   * Is the current cell a header cell?
   */
  isHeader?: boolean;
  /**
   * Is the current cell a footer cell?
   */
  isFooter?: boolean;
}

/**
 * A set of extracted fields corresponding to the input document.
 */
export interface DocumentResult {
  /**
   * Document type.
   */
  docType: string;
  /**
   * First and last page number where the document is found.
   */
  pageRange: number[];
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FieldValue };
}

/**
 * Recognized field value.
 */
export interface FieldValue {
  /**
   * Type of field value.
   */
  type: FieldValueType;
  /**
   * String value.
   */
  valueString?: string;
  /**
   * Date value.
   */
  valueDate?: string;
  /**
   * Time value.
   */
  valueTime?: string;
  /**
   * Phone number value.
   */
  valuePhoneNumber?: string;
  /**
   * Floating point value.
   */
  valueNumber?: number;
  /**
   * Integer value.
   */
  valueInteger?: number;
  /**
   * Array of field values.
   */
  valueArray?: FieldValue[];
  /**
   * Dictionary of named field values.
   */
  valueObject?: { [propertyName: string]: FieldValue };
  /**
   * Text content of the extracted field.
   */
  text?: string;
  /**
   * Bounding box of the field value, if appropriate.
   */
  boundingBox?: number[];
  /**
   * Confidence score.
   */
  confidence?: number;
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting this field.
   */
  elements?: string[];
  /**
   * The 1-based page number in the input document.
   */
  pageNumber?: number;
}

/**
 * Defines headers for formRecognizerClient_trainCustomModelAsync operation.
 */
export interface FormRecognizerClientTrainCustomModelAsyncHeaders {
  location?: string;
}

/**
 * Defines headers for formRecognizerClient_analyzeWithCustomModel operation.
 */
export interface FormRecognizerClientAnalyzeWithCustomModelHeaders {
  operationLocation?: string;
}

/**
 * Defines headers for formRecognizerClient_analyzeReceiptAsync operation.
 */
export interface FormRecognizerClientAnalyzeReceiptAsyncHeaders {
  operationLocation?: string;
}

/**
 * Defines headers for formRecognizerClient_analyzeLayoutAsync operation.
 */
export interface FormRecognizerClientAnalyzeLayoutAsyncHeaders {
  operationLocation?: string;
}

/**
 * Defines values for Enum0.
 */
export type Enum0 = "full" | "summary";
/**
 * Defines values for Language.
 */
export type Language = "en" | "es";
/**
 * Defines values for ModelStatus.
 */
export type ModelStatus = "creating" | "ready" | "invalid";
/**
 * Defines values for TrainStatus.
 */
export type TrainStatus = "succeeded" | "partiallySucceeded" | "failed";
/**
 * Defines values for ContentType.
 */
export type ContentType =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "image/tiff";
/**
 * Defines values for OperationStatus.
 */
export type OperationStatus = "notStarted" | "running" | "succeeded" | "failed";
/**
 * Defines values for LengthUnit.
 */
export type LengthUnit = "pixel" | "inch";
/**
 * Defines values for FieldValueType.
 */
export type FieldValueType =
  | "string"
  | "date"
  | "time"
  | "phoneNumber"
  | "number"
  | "integer"
  | "array"
  | "object";

/**
 * Contains response data for the trainCustomModelAsync operation.
 */
export type FormRecognizerClientTrainCustomModelAsyncResponse = FormRecognizerClientTrainCustomModelAsyncHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: FormRecognizerClientTrainCustomModelAsyncHeaders;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientGetCustomModelsOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Specify whether to return summary or full list of models.
   */
  op?: Enum0;
}

/**
 * Contains response data for the getCustomModels operation.
 */
export type FormRecognizerClientGetCustomModelsResponse = Models & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Models;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientGetCustomModelOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Include list of extracted keys in model information.
   */
  includeKeys?: boolean;
}

/**
 * Contains response data for the getCustomModel operation.
 */
export type FormRecognizerClientGetCustomModelResponse = Model & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Model;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientAnalyzeWithCustomModel$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Upload file type
   */
  contentType?: ContentType;
  /**
   * .json, .pdf, .jpg, .png or .tiff type file stream.
   */
  fileStream?: coreHttp.HttpRequestBody;
}

/**
 * Optional parameters.
 */
export interface FormRecognizerClientAnalyzeWithCustomModel$jsonOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * .json, .pdf, .jpg, .png or .tiff type file stream.
   */
  fileStream?: SourcePath;
}

/**
 * Optional parameters.
 */
export type FormRecognizerClientAnalyzeWithCustomModelOptionalParams =
  | FormRecognizerClientAnalyzeWithCustomModel$binaryOptionalParams
  | FormRecognizerClientAnalyzeWithCustomModel$jsonOptionalParams;

/**
 * Contains response data for the analyzeWithCustomModel operation.
 */
export type FormRecognizerClientAnalyzeWithCustomModelResponse = FormRecognizerClientAnalyzeWithCustomModelHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: FormRecognizerClientAnalyzeWithCustomModelHeaders;
  };
};

/**
 * Contains response data for the getAnalyzeFormResult operation.
 */
export type FormRecognizerClientGetAnalyzeFormResultResponse = AnalyzeOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResult;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientAnalyzeReceiptAsync$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Upload file type
   */
  contentType?: ContentType;
  /**
   * .json, .pdf, .jpg, .png or .tiff type file stream.
   */
  fileStream?: coreHttp.HttpRequestBody;
}

/**
 * Optional parameters.
 */
export interface FormRecognizerClientAnalyzeReceiptAsync$jsonOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * .json, .pdf, .jpg, .png or .tiff type file stream.
   */
  fileStream?: SourcePath;
}

/**
 * Optional parameters.
 */
export type FormRecognizerClientAnalyzeReceiptAsyncOptionalParams =
  | FormRecognizerClientAnalyzeReceiptAsync$binaryOptionalParams
  | FormRecognizerClientAnalyzeReceiptAsync$jsonOptionalParams;

/**
 * Contains response data for the analyzeReceiptAsync operation.
 */
export type FormRecognizerClientAnalyzeReceiptAsyncResponse = FormRecognizerClientAnalyzeReceiptAsyncHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: FormRecognizerClientAnalyzeReceiptAsyncHeaders;
  };
};

/**
 * Contains response data for the getAnalyzeReceiptResult operation.
 */
export type FormRecognizerClientGetAnalyzeReceiptResultResponse = AnalyzeOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResult;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientAnalyzeLayoutAsync$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Upload file type
   */
  contentType?: ContentType;
  /**
   * .json, .pdf, .jpg, .png or .tiff type file stream.
   */
  fileStream?: coreHttp.HttpRequestBody;
}

/**
 * Optional parameters.
 */
export interface FormRecognizerClientAnalyzeLayoutAsync$jsonOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * .json, .pdf, .jpg, .png or .tiff type file stream.
   */
  fileStream?: SourcePath;
}

/**
 * Optional parameters.
 */
export type FormRecognizerClientAnalyzeLayoutAsyncOptionalParams =
  | FormRecognizerClientAnalyzeLayoutAsync$binaryOptionalParams
  | FormRecognizerClientAnalyzeLayoutAsync$jsonOptionalParams;

/**
 * Contains response data for the analyzeLayoutAsync operation.
 */
export type FormRecognizerClientAnalyzeLayoutAsyncResponse = FormRecognizerClientAnalyzeLayoutAsyncHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: FormRecognizerClientAnalyzeLayoutAsyncHeaders;
  };
};

/**
 * Contains response data for the getAnalyzeLayoutResult operation.
 */
export type FormRecognizerClientGetAnalyzeLayoutResultResponse = AnalyzeOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResult;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientGetCustomModelsNextOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Specify whether to return summary or full list of models.
   */
  op?: Enum0;
}

/**
 * Contains response data for the getCustomModelsNext operation.
 */
export type FormRecognizerClientGetCustomModelsNextResponse = Models & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Models;
  };
};

/**
 * Optional parameters.
 */
export interface FormRecognizerClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
