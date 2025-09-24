#!/bin/bash

# Script to increment versions for all packages in dataplane-unplanned.csv

echo "Processing packages from dataplane-unplanned.csv..."

# Read the CSV file and process each package
while IFS=',' read -r package_name package_version; do
  # Skip empty lines
  if [[ -z "$package_name" ]]; then
    continue
  fi
  
  # Convert package name to artifact name format (remove @, replace / with -)
  artifact_name=$(echo "$package_name" | sed 's/@//' | sed 's/\//-/')
  
  echo ""
  echo "==========================================="
  echo "Processing: $package_name -> $artifact_name"
  echo "Current version: $package_version"
  echo "==========================================="
  
  # Run the increment.js script
  cd eng/tools/versioning
  node increment.js --artifact-name "$artifact_name" --repo-root "../../../"
  
  # Check if the command was successful
  if [ $? -eq 0 ]; then
    echo "✓ Successfully processed $package_name"
  else
    echo "✗ Failed to process $package_name"
  fi
  
  # Go back to repo root
  cd ../../../
  
done < dataplane-unplanned.csv

echo ""
echo "All packages processed!"