#!/bin/bash

# This script takes an npm package name as input, finds the latest non-alpha version,
# fetches the CHANGELOG.md file, and extracts the version and date line.

if [ $# -eq 0 ]; then
  echo "Usage: $0 <package-name>"
  echo "Example: $0 @azure/arm-sql"
  exit 1
fi

PACKAGE_NAME=$1

# Get package version publication times and find the latest non-alpha version
VERSION_TIMES=$(npm view $PACKAGE_NAME time --json 2>/dev/null)

if [ $? -ne 0 ]; then
  echo "Error: Package not found or npm registry unavailable."
  exit 1
fi

# Extract all versions and their publication dates, excluding alpha versions
# Then sort by publication date and get the most recent one
LATEST_VERSION=$(echo $VERSION_TIMES | jq -r 'to_entries | map(select(.key != "modified" and .key != "created" and (.key | contains("alpha") | not))) | sort_by(.value) | .[-1].key')
NPM_PUBLISH_DATE=$(echo $VERSION_TIMES | jq -r --arg VERSION "$LATEST_VERSION" '.[$VERSION]')

if [ -z "$LATEST_VERSION" ]; then
  echo "No non-alpha versions found for $PACKAGE_NAME."
  exit 1
fi

# Try to fetch CHANGELOG.md from jsdelivr
CHANGELOG_URL="https://cdn.jsdelivr.net/npm/$PACKAGE_NAME@$LATEST_VERSION/CHANGELOG.md"

# Get the first 5 lines of the CHANGELOG.md file
CHANGELOG_CONTENT=$(curl -s "$CHANGELOG_URL" | head -n 5)

# Check if the CHANGELOG.md exists
if [[ -z "$CHANGELOG_CONTENT" || "$CHANGELOG_CONTENT" == *"404: Not Found"* ]]; then
  echo "$PACKAGE_NAME@$LATEST_VERSION (npm: $NPM_PUBLISH_DATE) - No CHANGELOG.md found"
  exit 0
fi

# Find the line containing the version number and release date (usually line 3 in the first 5 lines)
VERSION_DATE_LINE=$(echo "$CHANGELOG_CONTENT" | grep -E "## .*\([^)]*\)")

if [ -z "$VERSION_DATE_LINE" ]; then
  echo "$PACKAGE_NAME@$LATEST_VERSION (npm: $NPM_PUBLISH_DATE) - Version line not found in CHANGELOG"
else
  # Output the package name, version, npm publish date, and the version line from CHANGELOG
  echo "$PACKAGE_NAME: $VERSION_DATE_LINE (npm: $NPM_PUBLISH_DATE)"
fi
