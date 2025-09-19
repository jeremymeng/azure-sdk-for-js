#!/bin/bash

# This script processes each package name from wrong-version.txt
# and invokes increment.js on it

# Extract just the package names from wrong-version.txt
echo "Extracting package names from wrong-version.txt..."
cut -d':' -f1 wrong-version.txt > package-names.txt

# Get current directory as repo root
REPO_ROOT=$(pwd)

# Count total packages
TOTAL_PACKAGES=$(wc -l < package-names.txt)
echo "Found $TOTAL_PACKAGES packages to process"

# Ask for confirmation before proceeding
echo ""
echo "This script will increment the version number for $TOTAL_PACKAGES packages."
echo "This will modify package.json files and CHANGELOG.md files."
read -p "Do you want to continue? (y/n): " CONFIRM

if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "Operation canceled."
  exit 0
fi

# Process each package
COUNTER=0
while read -r package_name; do
  COUNTER=$((COUNTER + 1))
  
  # Convert package names to artifact format expected by increment.js
  if [[ $package_name == "@azure/"* ]]; then
    # Convert @azure/package-name to azure-package-name format
    artifact_name=$(echo "$package_name" | sed 's|@azure/|azure-|')
  elif [[ $package_name == "@azure-rest/"* ]]; then
    # Convert @azure-rest/package-name to azure-rest-package-name format
    artifact_name=$(echo "$package_name" | sed 's|@azure-rest/|azure-rest-|')
  else
    # For any other formats, keep as is
    artifact_name="$package_name"
  fi
  
  echo "[$COUNTER/$TOTAL_PACKAGES] Processing $package_name (artifact: $artifact_name)..."
  
  # Invoke increment.js with the correct artifact name format and repo root
  node eng/tools/versioning/increment.js --artifact-name "$artifact_name" --repo-root "$REPO_ROOT/"
  
  # Add a small delay to avoid system resource issues
  sleep 0.2
done < package-names.txt

echo "Completed processing all packages!"
