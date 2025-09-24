#!/bin/bash

# Script to find all packages with Unreleased entries and check against npm registry

echo "Finding all packages with 'Unreleased' as first CHANGELOG entry..."

# Find all CHANGELOG.md files in the sdk directory
find sdk -name "CHANGELOG.md" -type f > all-changelogs.txt

# Initialize results
echo "Package Name,Package Path,Package Version,CHANGELOG Path,Latest NPM Stable,Latest NPM Beta,Match Type" > unreleased-packages-analysis.csv

total_files=$(wc -l < all-changelogs.txt)
processed=0

while read -r changelog_path; do
  processed=$((processed + 1))
  echo "[$processed/$total_files] Processing $changelog_path"
  
  # Extract package directory path
  package_dir=$(dirname "$changelog_path")
  package_json_path="$package_dir/package.json"
  
  # Check if package.json exists
  if [ ! -f "$package_json_path" ]; then
    echo "  Skipping: No package.json found"
    continue
  fi
  
  # Check if the first version entry is Unreleased
  first_version=$(grep -m 1 "^## [0-9]" "$changelog_path" 2>/dev/null | head -1)
  
  if [[ "$first_version" != *"(Unreleased)"* ]]; then
    echo "  Skipping: First entry is not Unreleased"
    continue
  fi
  
  # Extract npm package name and version from package.json
  if ! npm_package_name=$(jq -r '.name // empty' "$package_json_path" 2>/dev/null) || [ -z "$npm_package_name" ]; then
    echo "  Skipping: Cannot extract package name"
    continue
  fi
  
  if ! local_version=$(jq -r '.version // empty' "$package_json_path" 2>/dev/null) || [ -z "$local_version" ]; then
    echo "  Skipping: Cannot extract package version"
    continue
  fi
  
  echo "  Found: $npm_package_name@$local_version"
  
  # Get npm registry information with time data
  echo "  Checking npm registry..."
  if npm_data=$(npm view "$npm_package_name" --time --json 2>/dev/null) && [ -n "$npm_data" ]; then
    
    # Extract all versions with their publish times and sort by time
    version_times=$(echo "$npm_data" | jq -r '.time | to_entries | map(select(.key != "created" and .key != "modified")) | sort_by(.value) | .[] | "\(.key)|\(.value)"' 2>/dev/null)
    
    if [ -z "$version_times" ]; then
      echo "  No versions found in npm registry"
      continue
    fi
    
    # Get all versions sorted by publish time (most recent last)
    all_versions=$(echo "$version_times" | cut -d'|' -f1)
    
    # Find latest stable version (no pre-release identifiers) - sorted by time
    latest_stable=$(echo "$version_times" | grep -v -E "(alpha|beta|rc|preview)" | tail -1 | cut -d'|' -f1)
    
    # Find latest beta version - sorted by time
    latest_beta=$(echo "$version_times" | grep -E "beta" | tail -1 | cut -d'|' -f1)
    
    # Check if local version matches any published version
    match_type=""
    if echo "$all_versions" | grep -Fxq "$local_version"; then
      if [[ "$local_version" == "$latest_stable" ]]; then
        match_type="LATEST_STABLE"
      elif [[ "$local_version" == "$latest_beta" ]]; then
        match_type="LATEST_BETA"
      else
        match_type="PUBLISHED_VERSION"
      fi
      
      echo "  ✓ MATCH: $match_type"
      echo "$npm_package_name,$package_dir,$local_version,$changelog_path,$latest_stable,$latest_beta,$match_type" >> unreleased-packages-analysis.csv
    else
      echo "  ✗ No match: Version not published"
    fi
    
  else
    echo "  ✗ Package not found on npm or error occurred"
  fi
  
  echo ""
done < all-changelogs.txt

echo "Analysis complete! Results saved to unreleased-packages-analysis.csv"
echo "Summary:"
total_matches=$(tail -n +2 unreleased-packages-analysis.csv | wc -l)
echo "Total packages with Unreleased entries: $processed"
echo "Packages with matching npm versions: $total_matches"

if [ "$total_matches" -gt 0 ]; then
  echo ""
  echo "Match type breakdown:"
  echo "LATEST_STABLE: $(grep -c "LATEST_STABLE" unreleased-packages-analysis.csv)"
  echo "LATEST_BETA: $(grep -c "LATEST_BETA" unreleased-packages-analysis.csv)"
  echo "PUBLISHED_VERSION: $(grep -c "PUBLISHED_VERSION" unreleased-packages-analysis.csv)"
fi
