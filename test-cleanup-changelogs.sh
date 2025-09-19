#!/bin/bash

# This script tests the cleanup on the first 5 packages
# Extract the first 5 package names from wrong-version.txt
head -n 5 wrong-version.txt | cut -d':' -f1 > test-package-names.txt

# Count total packages
TOTAL_PACKAGES=$(wc -l < test-package-names.txt)
echo "Found $TOTAL_PACKAGES test packages to process"

# Counter for changes made
CHANGES_MADE=0

# Process each package
COUNTER=0
while read -r package_name; do
  COUNTER=$((COUNTER + 1))
  
  # Convert package name to directory path
  if [[ $package_name == "@azure/"* ]]; then
    # Extract the package name without @azure/
    pkg_name=${package_name#@azure/}
    # Special handling for some packages with different directory structures
    if [[ $pkg_name == arm-* ]]; then
      # Extract the service name from arm-*
      service=${pkg_name#arm-}
      if [[ -d "sdk/$service/arm-$service" ]]; then
        dir_path="sdk/$service/arm-$service"
      else
        # Try some common alternatives
        for possible_dir in "sdk/$pkg_name" "sdk/$service/$pkg_name"; do
          if [[ -d "$possible_dir" ]]; then
            dir_path="$possible_dir"
            break
          fi
        done
      fi
    else
      # Try direct mapping first
      if [[ -d "sdk/$pkg_name" ]]; then
        dir_path="sdk/$pkg_name"
      else
        # Look for directories containing the package name
        for possible_dir in $(find sdk -type d -name "$pkg_name" 2>/dev/null); do
          if [[ -d "$possible_dir" ]]; then
            dir_path="$possible_dir"
            break
          fi
        done
      fi
    fi
  elif [[ $package_name == "@azure-rest/"* ]]; then
    # Extract the package name without @azure-rest/
    pkg_name=${package_name#@azure-rest/}
    # Try to find the directory with -rest suffix
    for possible_dir in $(find sdk -type d -name "*$pkg_name*-rest" 2>/dev/null); do
      if [[ -d "$possible_dir" ]]; then
        dir_path="$possible_dir"
        break
      fi
    done
  fi
  
  # Check if CHANGELOG.md exists
  changelog_path="$dir_path/CHANGELOG.md"
  if [[ -f "$changelog_path" ]]; then
    echo "[$COUNTER/$TOTAL_PACKAGES] Processing $package_name CHANGELOG at $changelog_path"
    
    # Display first 15 lines of CHANGELOG for inspection
    echo "First 15 lines of CHANGELOG:"
    head -n 15 "$changelog_path"
    
    # Check if there are two consecutive unreleased sections
    # This uses awk to detect two consecutive "## x.x.x (Unreleased)" sections
    has_consecutive_unreleased=$(awk '/^## [0-9]+\.[0-9]+\.[0-9]+ \(Unreleased\)/{count++; if(count==2) {print "yes"; exit}} /^## [0-9]+\.[0-9]+\.[0-9]+ \([0-9]{4}-[0-9]{2}-[0-9]{2}\)/{exit}' "$changelog_path")
    
    if [[ "$has_consecutive_unreleased" == "yes" ]]; then
      echo "  Found consecutive unreleased sections - would remove second section"
      CHANGES_MADE=$((CHANGES_MADE + 1))
    else
      echo "  No consecutive unreleased sections found"
    fi
  else
    echo "[$COUNTER/$TOTAL_PACKAGES] CHANGELOG.md not found for $package_name"
  fi
  
done < test-package-names.txt

echo "Completed processing test packages!"
echo "Would make changes to $CHANGES_MADE CHANGELOG.md files"
