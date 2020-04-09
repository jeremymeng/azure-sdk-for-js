// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeResult as AnalyzeResultModel,
  DataTable as DataTableModel,
  DocumentResult as DocumentResultModel,
  FieldValue as FieldValueModel,
  KeyValueElement as KeyValueElementModel,
  KeyValuePair as KeyValuePairModel,
  PageResult as PageResultModel,
  ReadResult as ReadResultModel,
  TextLine as TextLineModel,
  FormRecognizerClientGetAnalyzeFormResultResponse as GetAnalyzeFormResultResponse,
  FormRecognizerClientGetAnalyzeLayoutResultResponse as GetAnalyzeLayoutResultResponse,
  FormRecognizerClientGetAnalyzeReceiptResultResponse as GetAnalyzeReceiptResultResponse
} from "./generated/models";

import {
  FormPage,
  FormLine,
  FormElement,
  FormTableRow,
  FormTable,
  RecognizedForm,
  FormText,
  FormField,
  LabeledFormResultResponse,
  RecognizeFormResultResponse,
  RecognizeContentResultResponse,
  RecognizedContent,
  RecognizeReceiptResultResponse,
  FieldValue,
  RawReceiptResult,
  RecognizedReceipt,
  RawUSReceipt,
  ReceiptItemField,
  StringFieldValue,
  DateFieldValue,
  TimeFieldValue,
  PhoneNumberFieldValue,
  NumberFieldValue,
  IntegerFieldValue,
  ObjectFieldValue,
  ArrayFieldValue,
  Point2D
} from "./models";

export function toBoundingBox(original: number[]): Point2D[] {
  return [
    {x: original[0], y: original[1] },
    {x: original[2], y: original[3] },
    {x: original[4], y: original[5] },
    {x: original[6], y: original[7] }
  ]
}

export function toTextLine(original: TextLineModel, pageNumber: number): FormLine {
  const line: FormLine = {
    kind: "line",
    pageNumber: pageNumber,
    text: original.text,
    boundingBox: toBoundingBox(original.boundingBox),
    words: original.words.map((w) => {
      return {
        kind: "word",
        text: w.text,
        boundingBox: toBoundingBox(w.boundingBox),
        confidence: w.confidence,
        pageNumber: pageNumber
      };
    })
  };
  line.words = line.words.map((w) => {
    return { ...w, containingLine: line };
  });

  return line;
}

export function toFormPage(original: ReadResultModel): FormPage {
  return {
    pageNumber: original.pageNumber,
    textAngle: original.angle,
    width: original.width,
    height: original.height,
    unit: original.unit,
    lines: original.lines?.map((l) => toTextLine(l, original.pageNumber))
  };
}

// Note: might need to support other element types in future, e.g., checkbox
const textPattern = /\/readResults\/(\d+)\/lines\/(\d+)(?:\/words\/(\d+))?/;

export function toFormElement(
  element: string,
  readResults: FormPage[]
): FormElement {
  const result = textPattern.exec(element);
  if (!result || !result[0] || !result[1] || !result[2]) {
    throw new Error(`Unexpected element reference encountered: ${element}`);
  }

  const readIndex = Number.parseInt(result[1]);
  const lineIndex = Number.parseInt(result[2]);
  if (result[3]) {
    const wordIndex = Number.parseInt(result[3]);
    return readResults[readIndex].lines![lineIndex].words[wordIndex];
  } else {
    return readResults[readIndex].lines![lineIndex];
  }
}

export function toFormText(
  original: KeyValueElementModel,
  readResults?: FormPage[]
): FormText {
  return {
    text: original.text,
    boundingBox: original.boundingBox ? toBoundingBox(original.boundingBox) : undefined,
    textContent: original.elements?.map((element) => toFormElement(element, readResults!))
  };
}

export function toFormField(
  original: KeyValuePairModel,
  readResults?: FormPage[]
): FormField {
  return {
    name: original.label,
    confidence: original.confidence,
    fieldLabel: toFormText(original.key, readResults),
    valueText: toFormText(original.value, readResults),
    value: {
      type: "string",
      value: original.value.text
    }
  };
}

export function toFormTable(original: DataTableModel, readResults?: FormPage[]): FormTable {
  let rows: FormTableRow[] = [];
  for (let i = 0; i < original.rows; i++) {
    rows.push({ cells: [] });
  }
  for (const cell of original.cells) {
    rows[cell.rowIndex].cells.push({
      boundingBox: toBoundingBox(cell.boundingBox),
      columnIndex: cell.columnIndex,
      columnSpan: cell.columnSpan || 1,
      confidence: cell.confidence,
      textContent: cell.elements?.map((element) => toFormElement(element, readResults!)),
      isFooter: cell.isFooter || false,
      isHeader: cell.isHeader || false,
      rowIndex: cell.rowIndex,
      rowSpan: cell.rowSpan || 1,
      text: cell.text
    });
  }
  return {
    rowCount: original.rows,
    columnCount: original.columns,
    rows: rows
  };
}

export function toFormPages(
  readResults?: ReadResultModel[],
  pageResults?: PageResultModel[]
): FormPage[] {
  const transformed = readResults?.map(toFormPage);
  // maps from page numbers to the objects
  const readMap = new Map<number, FormPage>(transformed?.map(r => [r.pageNumber, r]));
  const pageMap = new Map<number, PageResultModel>(pageResults?.map(r => [r.pageNumber, r]));
  const result = [];
  for (const pageNumber of readMap.keys()) {
    const readResult = readMap.get(pageNumber);
    if (readResult) {
      const pageResult = pageMap.get(pageNumber);
      if (pageResult) {
        readResult.tables = pageResult.tables?.map((table) => toFormTable(table, transformed));
        result.push(readResult);
      }
    }
  }

  return result;
}

export function toRecognizeFormResultResponse(
  original: GetAnalyzeFormResultResponse
): RecognizeFormResultResponse {
  const pages = toFormPages(
    original.analyzeResult?.readResults,
    original.analyzeResult?.pageResults
  );
  const common = {
    status: original.status,
    createdOn: original.createdOn,
    lastUpdatedOn: original.createdOn,
    _response: original._response
  };

  if (original.status !== "succeeded") {
    return common;
  }

  const additional = original.analyzeResult
    ? {
        version: original.analyzeResult.version,
        forms: original.analyzeResult.documentResults && original.analyzeResult.documentResults.length > 0
          ? original.analyzeResult.documentResults.map((d) => toRecognizedForm(d, pages)) // supervised
          : original.analyzeResult.pageResults?.map((p) => toFormFromPageResult(p, pages)), // unsupervised
        errors: original.analyzeResult.errors
      }
    : undefined;
  return {
    ...common,
    ...additional
  };
}

export function toFieldValue(
  original: FieldValueModel,
  readResults: FormPage[]
): FieldValue {
  const result =
    original.type === "object" || original.type === "array"
      ? {}
      : {
          text: original.text,
          boundingBox: original.boundingBox ? toBoundingBox(original.boundingBox) : undefined,
          confidence: original.confidence,
          pageNumber: original.pageNumber,
          textContent: original.elements?.map((element) => toFormElement(element, readResults))
        };
  switch (original.type) {
    case "string":
      (result as StringFieldValue).type = "string";
      (result as StringFieldValue).value = original.valueString;
      break;
    case "date":
      (result as DateFieldValue).type = "date";
      (result as DateFieldValue).value = original.valueDate;
      break;
    case "time":
      (result as TimeFieldValue).type = "time";
      (result as TimeFieldValue).value = original.valueTime;
      break;
    case "phoneNumber":
      (result as PhoneNumberFieldValue).type = "phoneNumber";
      (result as PhoneNumberFieldValue).value = original.valuePhoneNumber;
      break;
    case "number":
      (result as NumberFieldValue).type = "number";
      (result as NumberFieldValue).value = original.valueNumber;
      break;
    case "integer":
      (result as IntegerFieldValue).type = "integer";
      (result as IntegerFieldValue).value = original.valueInteger;
      break;
    case "array":
      (result as ArrayFieldValue).type = "array";
      (result as ArrayFieldValue).value = original.valueArray?.map((a) =>
        toFieldValue(a, readResults)
      );
      break;
    case "object":
      (result as ObjectFieldValue).type = "object";
      (result as ObjectFieldValue).value = original.valueObject
        ? toFields(original.valueObject, readResults)
        : undefined;
      break;
    default:
      throw new Error(`Unknown field value type from ${original}`);
  }
  return (result as unknown) as FieldValue;
}

export function toFields(
  original: { [propertyName: string]: FieldValueModel },
  readResults: FormPage[]
): { [propertyName: string]: FieldValue } {
  const result: { [propertyName: string]: FieldValue } = {};
  for (const key in original) {
    if (original.hasOwnProperty(key)) {
      result[key] = toFieldValue(original[key], readResults);
    }
  }

  return result;
}

export function toFieldsFromFieldValue(
  original: { [propertyName: string]: FieldValueModel },
  readResults: FormPage[]
): { [propertyName: string]: FormField } {
    const result: { [propertyName: string]: FormField } = {};
    for (const key in original) {
      if (original.hasOwnProperty(key)) {
        const fieldValue = toFieldValue(original[key], readResults);
        if (fieldValue.type === "array" || fieldValue.type === "object") {
          const formField: FormField = {
            value: fieldValue
          }
          result[key] = formField
        } else {
          const formField: FormField = {
            confidence: fieldValue.confidence,
            name: key,
            valueText: {
              text: fieldValue.text,
              boundingBox: fieldValue.boundingBox,
              textContent: fieldValue.textContent
            },
            value: fieldValue
          }
          result[key] = formField;
        }
      }
    }
  
    return result;
  }
  
export function toFieldsFromKeyValuePairs(original: KeyValuePairModel[], pages: FormPage[]): { [propertyName: string]: FormField } {
  let result: { [propertyName: string]: FormField } = {};
  for (let i = 0; i < original.length; i ++) {
    const pair = original[i];
    const stringField = toFormField(pair, pages)
    stringField.name = stringField.name || `field-${i}`;

    result[`field-${i}`] = stringField;
  }

  return result;
}

export function toFormFromPageResult(original: PageResultModel, pages: FormPage[]): RecognizedForm {
  return {
    formType: `form-${original.clusterId}`,
    pageRange: { firstPageNumber: original.pageNumber, lastPageNumber: original.pageNumber },
    pages,
    fields: original.keyValuePairs ? toFieldsFromKeyValuePairs(original.keyValuePairs, pages) : {}
  }
}

export function toRecognizedForm(
  original: DocumentResultModel,
  pages: FormPage[]
): RecognizedForm {
  return {
    formType: original.docType,
    pageRange: { firstPageNumber: original.pageRange[0], lastPageNumber: original.pageRange[1] },
    fields: toFieldsFromFieldValue(original.fields, pages),
    pages
  };
}

export function toLabeledFormResultResponse(
  original: GetAnalyzeFormResultResponse
): LabeledFormResultResponse {
  const common = {
    status: original.status,
    createdOn: original.createdOn,
    lastUpdatedOn: original.createdOn,
    _response: original._response
  };
  if (original.status !== "succeeded") {
    return common;
  }
  const pages = toFormPages(
    original.analyzeResult?.readResults,
    original.analyzeResult?.pageResults
  );
  const additional = original.analyzeResult
    ? {
        version: original.analyzeResult.version,
        forms: original.analyzeResult.documentResults?.map((d) =>
          toRecognizedForm(d, pages)
        ),
        errors: original.analyzeResult.errors
      }
    : undefined;
  return {
    ...common,
    ...additional
  };
}

export function toRecognizeContentResultResponse(
  original: GetAnalyzeLayoutResultResponse
): RecognizeContentResultResponse {
  function toRecognizeContentResult(model?: AnalyzeResultModel): RecognizedContent | undefined {
    if (!model) {
      return undefined;
    }
    const pages = toFormPages(
      model.readResults,
      model.pageResults
    );
    return {
      version: model.version,
      pages: pages
    };
  }

  const common = {
    status: original.status,
    createdOn: original.createdOn,
    lastUpdatedOn: original.lastUpdatedOn,
    _response: original._response
  };
  if (original.status === "succeeded") {
    return {
      ...common,
      ...toRecognizeContentResult(original.analyzeResult)
    };
  } else {
    return common;
  }
}

function toReceiptResult(
  result: DocumentResultModel,
  readResults: FormPage[]
): RecognizedReceipt {
  if (result.docType !== "prebuilt:receipt") {
    throw new RangeError("The document type is not 'prebuilt:receipt'");
  }

  const transformedFields = toFields(result.fields, readResults);
  const rawReceiptFields = (transformedFields as unknown) as RawUSReceipt;
  return {
    docType: ((result as unknown) as RawReceiptResult).docType,
    pageRange: { firstPageNumber: result.pageRange[0], lastPageNumber: result.pageRange[1] },
    receiptType: rawReceiptFields.ReceiptType.value!,
    merchantName: rawReceiptFields.MerchantName?.value,
    merchantPhoneNumber: rawReceiptFields.MerchantPhoneNumber?.value,
    merchantAddress: rawReceiptFields.MerchantAddress?.value,
    items: rawReceiptFields.Items.value?.map((i) => {
      return {
        name: (i as ReceiptItemField).value.Name?.value,
        quantity: (i as ReceiptItemField).value.Quantity?.value,
        totalPrice: (i as ReceiptItemField).value.TotalPrice?.value
      };
    }),
    subtotal: rawReceiptFields.Subtotal?.value,
    tax: rawReceiptFields.Tax?.value,
    tip: rawReceiptFields.Tip?.value,
    total: rawReceiptFields.Total?.value,
    transactionDate: rawReceiptFields.TransactionDate?.value,
    transactionTime: rawReceiptFields.TransactionTime?.value,
    fields: transformedFields
  };
}

export function toReceiptResultResponse(
  result: GetAnalyzeReceiptResultResponse
): RecognizeReceiptResultResponse {
  const common = {
    status: result.status,
    createdOn: result.createdOn,
    lastUpdatedOn: result.lastUpdatedOn,
    _response: result._response
  };
  if (result.status !== "succeeded") {
    return common;
  }

  const readResults = result.analyzeResult!.readResults.map(toFormPage);
  return {
    ...common,
    version: result.analyzeResult!.version,
    rawExtractedPages: readResults,
    extractedReceipts: result.analyzeResult!.documentResults!.map((d) =>
      toReceiptResult(d, readResults)
    )
  };
}
