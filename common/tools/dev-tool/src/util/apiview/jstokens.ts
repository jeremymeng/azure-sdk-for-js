// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ReviewLine, ReviewToken, TokenKind } from "./models";

const JS_KEYWORDS = new Set<string>([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "namespace",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "as",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "any",
  "boolean",
  "constructor",
  "declare",
  "get",
  "module",
  "require",
  "number",
  "set",
  "string",
  "symbol",
  "type",
  "from",
  "of",
  "keyof",
  "readonly",
]);

function isKeyword(s: string) {
  return JS_KEYWORDS.has(s);
}

export function splitAndBuild(
  s: string,
  currentTypeid: string,
  currentTypeName: string,
  memberKind: string,
) {
  const reviewLines: ReviewLine[] = [];
  const lines = s.split("\n");
  for (const l of lines) {
    const tokens: any[] = Array.from(jsTokens(l));
    const reviewTokens: ReviewToken[] = [];
    for (const token of tokens) {
      if (isKeyword(token.value)) {
        reviewTokens.push({ Kind: TokenKind.Keyword, Value: token.value });
      } else if (token.value === currentTypeName) {
        reviewTokens.push({
          Kind: TokenKind.TypeName,
          Value: token.value,
          NavigateToId: currentTypeid,
          NavigationDisplayName: token.value,
          RenderClasses: [memberKind],
        });
      } else if (token.type === "StringLiteral") {
        reviewTokens.push({ Kind: TokenKind.StringLiteral, Value: token.value });
      } else if (token.type === "Puncturator") {
        reviewTokens.push({ Kind: TokenKind.Punctuation, Value: token.value });
      } else if (token.type === "WhiteSpace") {
        reviewTokens.push({ Kind: TokenKind.Punctuation, Value: token.value });
      } else {
        reviewTokens.push({ Kind: TokenKind.Text, Value: token.value });
      }
    }
    reviewLines.push({
      Tokens: reviewTokens,
    });
  }
  return reviewLines;
}
