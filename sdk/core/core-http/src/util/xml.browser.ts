// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { XML_ATTRKEY, XML_CHARKEY, XmlOptions } from "./xml.common";

// tslint:disable-next-line:no-null-keyword
const doc = document.implementation.createDocument(null, null, null);

const parser = new DOMParser();
export function parseXML(str: string, opts: XmlOptions = {}): Promise<any> {
  try {
    const dom = parser.parseFromString(str, "application/xml");
    throwIfError(dom);

    let obj;
    if (opts && opts.includeRoot) {
      obj = domToObject(dom, opts);
    } else {
      obj = domToObject(dom.childNodes[0], opts);
    }

    return Promise.resolve(obj);
  } catch (err) {
    return Promise.reject(err);
  }
}

let errorNS = "";
try {
  errorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0]
    .namespaceURI!;
} catch (ignored) {
  // Most browsers will return a document containing <parsererror>, but IE will throw.
}

function throwIfError(dom: Document): void {
  if (errorNS) {
    const parserErrors = dom.getElementsByTagNameNS(errorNS, "parsererror");
    if (parserErrors.length) {
      throw new Error(parserErrors.item(0)!.innerHTML);
    }
  }
}

function isElement(node: Node): node is Element {
  return !!(node as Element).attributes;
}

/**
 * Get the Element-typed version of the provided Node if the provided node is an element with
 * attributes. If it isn't, then undefined is returned.
 */
function asElementWithAttributes(node: Node): Element | undefined {
  return isElement(node) && node.hasAttributes() ? node : undefined;
}

function domToObject(node: Node, options: XmlOptions): any {
  let result: any = {};

  const childNodeCount: number = node.childNodes.length;

  const firstChildNode: Node = node.childNodes[0];
  const onlyChildTextValue: string | undefined =
    (firstChildNode &&
      childNodeCount === 1 &&
      firstChildNode.nodeType === Node.TEXT_NODE &&
      firstChildNode.nodeValue) ||
    undefined;

  const elementWithAttributes: Element | undefined = asElementWithAttributes(node);
  if (elementWithAttributes) {
    result[XML_ATTRKEY] = {};

    for (let i = 0; i < elementWithAttributes.attributes.length; i++) {
      const attr = elementWithAttributes.attributes[i];
      result[XML_ATTRKEY][attr.nodeName] = attr.nodeValue;
    }

    if (onlyChildTextValue) {
      result[options?.xmlCharKey ?? XML_CHARKEY] = onlyChildTextValue;
    }
  } else if (childNodeCount === 0) {
    result = "";
  } else if (onlyChildTextValue) {
    result = onlyChildTextValue;
  }

  if (!onlyChildTextValue) {
    for (let i = 0; i < childNodeCount; i++) {
      const child = node.childNodes[i];
      // Ignore leading/trailing whitespace nodes
      if (child.nodeType !== Node.TEXT_NODE) {
        const childObject: any = domToObject(child, options);
        if (!result[child.nodeName]) {
          result[child.nodeName] = childObject;
        } else if (Array.isArray(result[child.nodeName])) {
          result[child.nodeName].push(childObject);
        } else {
          result[child.nodeName] = [result[child.nodeName], childObject];
        }
      }
    }
  }

  return result;
}

const serializer = new XMLSerializer();

export function stringifyXML(content: any, opts: XmlOptions = {}): string {
  const rootName = (opts && opts.rootName) || "root";
  const dom = buildNode(content, rootName, opts)[0];
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + serializer.serializeToString(dom)
  );
}

function buildAttributes(attrs: { [key: string]: { toString(): string } }): Attr[] {
  const result = [];
  for (const key of Object.keys(attrs)) {
    const attr = doc.createAttribute(key);
    attr.value = attrs[key].toString();
    result.push(attr);
  }
  return result;
}

function buildNode(obj: any, elementName: string, options: XmlOptions): Node[] {
  if (
    obj === undefined ||
    obj === null ||
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    const elem = doc.createElement(elementName);
    elem.textContent = obj === undefined || obj === null ? "" : obj.toString();
    return [elem];
  } else if (Array.isArray(obj)) {
    const result = [];
    for (const arrayElem of obj) {
      for (const child of buildNode(arrayElem, elementName, options)) {
        result.push(child);
      }
    }
    return result;
  } else if (typeof obj === "object") {
    const elem = doc.createElement(elementName);
    for (const key of Object.keys(obj)) {
      if (key === XML_ATTRKEY) {
        for (const attr of buildAttributes(obj[key])) {
          elem.attributes.setNamedItem(attr);
        }
      } else if (key === (options.xmlCharKey ?? XML_CHARKEY)) {
        elem.textContent = obj[key].toString();
      } else {
        for (const child of buildNode(obj[key], key, options)) {
          elem.appendChild(child);
        }
      }
    }
    return [elem];
  } else {
    throw new Error(`Illegal value passed to buildObject: ${obj}`);
  }
}
