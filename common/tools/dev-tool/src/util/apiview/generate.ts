// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeFile, ReviewLine, ReviewToken, TokenKind } from "./models";
import {
  ApiDeclaredItem,
  ApiDocumentedItem,
  ApiItem,
  ApiItemKind,
  ApiModel,
  ExcerptTokenKind,
} from "@microsoft/api-extractor-model";
import { splitAndBuild } from "./jstokens";

const PARSER_VERSION = "99";

interface Metadata {
  Name: string;
  PackageName: string;
  PackageVersion: string;
  ParserVersion: string;
  Language: "JavaScript";
}

interface SubpathExport {
  name: string;
  api: ApiModel;
}

// key: item's canonical reference, value: sub paths that include it
const exported = new Map<string, Set<string>>();

function emptyLine(relatedToLine?: string): ReviewLine {
  return { RelatedToLine: relatedToLine, Tokens: [] };
}

function buildDependencies(reviewLines: ReviewLine[], dependencies: Record<string, string>) {
  const header: ReviewLine = {
    LineId: "Dependencies",
    Tokens: [
      {
        Kind: TokenKind.StringLiteral,
        Value: "Dependencies:",
        NavigationDisplayName: "Dependencies",
        RenderClasses: ["dependencies"],
      },
    ],
  };

  const dependencyLines: ReviewLine[] = [];
  for (const dependency of Object.keys(dependencies)) {
    const nameToken: ReviewToken = {
      Kind: TokenKind.StringLiteral,
      Value: dependency,
    };
    const versionToken: ReviewToken = {
      Kind: TokenKind.StringLiteral,
      Value: ` ${dependencies[dependency]}`,
      SkipDiff: true,
    };
    const dependencyLine: ReviewLine = {
      LineId: dependency,
      Tokens: [nameToken, { Kind: TokenKind.Punctuation, Value: ":" }, versionToken],
    };
    dependencyLines.push(dependencyLine);
  }
  header.Children = dependencyLines;
  reviewLines.push(header);
  reviewLines.push(emptyLine(header.LineId));
}

function buildSubpathExports(reviewLines: ReviewLine[], subpaths: SubpathExport[]) {
  for (const subpath of subpaths) {
    const exportLine: ReviewLine = {
      LineId: `Subpath-export-${subpath}`,
      Tokens: [
        {
          Kind: TokenKind.Keyword,
          Value: "export",
        },
        {
          Kind: TokenKind.StringLiteral,
          Value: ` "${subpath}"`,
          NavigationDisplayName: `"${subpath}" subpath`,
        },
      ],
      Children: [],
    };

    for (const modelPackage of subpath.api.packages) {
      for (const entryPoint of modelPackage.entryPoints) {
        for (const member of entryPoint.members) {
          const canonicalRef = member.canonicalReference.toString();
          const containingExport = exported.get(canonicalRef) ?? new Set<string>();
          if (!containingExport.has(subpath.name)) {
            containingExport.add(subpath.name);
            exported.set(canonicalRef, containingExport);
          }
          buildMember(exportLine.Children!, member);
        }
      }
    }
    reviewLines.push(exportLine);
  }
}

function buildDocumentation(reviewLines: ReviewLine[], member: ApiItem, relatedTo: string) {
  if (member instanceof ApiDocumentedItem) {
    const lines = member.tsdocComment?.emitAsTsdoc().split("\n");
    for (const l of lines ?? []) {
      const docToken: ReviewToken = {
        Kind: TokenKind.Comment,
        IsDocumentation: true,
        Value: l,
      };
      reviewLines.push({
        Tokens: [docToken],
        RelatedToLine: relatedTo,
      });
    }
  }
}

function buildMember(reviewLines: ReviewLine[], item: ApiItem) {
  const itemId = item.canonicalReference.toString();
  const line: ReviewLine = {
    LineId: itemId,
    Children: [],
    Tokens: [],
  };

  buildDocumentation(reviewLines, item, itemId);

  // TODO: add release tag

  if (item instanceof ApiDeclaredItem) {
    if (item.kind === ApiItemKind.Namespace) {
      // TODO: we don't usually use namespace in SDK, but... build namespace header here
    }

    let itemKind: string = "unknown";
    switch (item.kind) {
      case ApiItemKind.Interface:
      case ApiItemKind.Class:
      case ApiItemKind.Namespace: // TODO: why namespace again in old code?
      case ApiItemKind.Enum:
        itemKind = item.kind.toLowerCase();
        break;
      case ApiItemKind.Function:
        itemKind = "method";
        break;
      case ApiItemKind.TypeAlias:
        itemKind = "struct";
        break;
    }

    for (const excerpt of item.excerptTokens) {
      if (excerpt.kind === ExcerptTokenKind.Reference && excerpt.canonicalReference) {
        const token: ReviewToken = {
          Kind: TokenKind.TypeName,
          NavigateToId: excerpt.canonicalReference.toString(),
          Value: item.displayName,
        };
        line.Tokens.push(token);
      } else {
        line.Children!.push(...splitAndBuild(excerpt.text, itemId, item.displayName, itemKind));
      }
    }
  }

  if (
    item.kind === ApiItemKind.Interface ||
    item.kind === ApiItemKind.Class ||
    item.kind === ApiItemKind.Namespace ||
    item.kind === ApiItemKind.Enum
  ) {
    for (const member of item.members) {
      buildMember(line.Children!, member);
    }
  }
  reviewLines.push(line);

  // TODO: closing line of namespace
  if (item instanceof ApiDeclaredItem && item.kind === ApiItemKind.Namespace) {
    reviewLines.push(emptyLine(/* line id of the namespace line */));
  }
}

function buildReview(review: ReviewLine[], dependencies: Record<string, string>) {
  buildDependencies(review, dependencies);
  buildSubpathExports(review, []);
}

export function GenerateApiview(options: {
  meta: Metadata;
  packageJson: PackageJson;
  apiJSONs: string[];
}): CodeFile {
  const { packageJson } = options;
  const meta: Metadata = {
    Name: packageJson.name,
    PackageName: packageJson.name,
    PackageVersion: packageJson.version,
    ParserVersion: PARSER_VERSION,
    Language: "JavaScript",
  };

  const review: ReviewLine[] = [];
  buildReview(review, packageJson.dependencies);

  return {
    ...meta,
    ReviewLines: review,
  };
}
