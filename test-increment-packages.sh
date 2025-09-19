#!/bin/bash

# This script processes the first 2 package names from wrong-version.txt
# for testing purposes

# Extract just the package names from wrong-version.txt
echo "Extracting first 2 package names from wrong-version.txt for testing..."
cut -d':' -f1 wrong-version.txt | head -n 2 > test-package-names.txt

# Get current directory as repo root
REPO_ROOT=$(pwd)

# Count total packages
TOTAL_PACKAGES=$(wc -l < test-package-names.txt)
echo "Found $TOTAL_PACKAGES test packages to process"

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
  # Add --dry-run flag for testing to avoid making actual changes
  node eng/tools/versioning/increment.js --artifact-name "$artifact_name" --repo-root "$REPO_ROOT/" --dry-run
  
  # Add a small delay to avoid system resource issues
  sleep 0.2
done < test-package-names.txt

echo "Completed processing test packages!"
