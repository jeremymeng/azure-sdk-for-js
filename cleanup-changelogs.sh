#!/bin/bash

# This script finds and cleans up redundant unreleased sections in CHANGELOG.md files
# It removes the second unreleased section if there are two consecutive unreleased sections

# Extract the package directories from wrong-version.txt
cut -d':' -f1 wrong-version.txt > package-names.txt

# Count total packages
TOTAL_PACKAGES=$(wc -l < package-names.txt)
echo "Found $TOTAL_PACKAGES packages to process"

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
    
    # Check if there are two consecutive unreleased sections by looking for pattern directly
    unreleased_count=$(grep -c '## [0-9]\+\.[0-9]\+\.[0-9]\+ (Unreleased)' "$changelog_path")
    
    if [[ $unreleased_count -ge 2 ]]; then
      # Create a temporary file
      temp_file=$(mktemp)
      
      # Process the file to remove the second unreleased section
      awk '
        BEGIN { skip = 0; unreleased_count = 0; }
        /^## [0-9]+\.[0-9]+\.[0-9]+ \(Unreleased\)/ {
          unreleased_count++;
          if (unreleased_count == 1) {
            print;
          } else if (unreleased_count == 2) {
            skip = 1;
            next;
          }
        }
        /^## [0-9]+\.[0-9]+\.[0-9]+ \([0-9]{4}-[0-9]{2}-[0-9]{2}\)/ {
          skip = 0;
          print;
          next;
        }
        {
          if (!skip) print;
        }
      ' "$changelog_path" > "$temp_file"
      
      # Replace the original file with the modified content
      mv "$temp_file" "$changelog_path"
      echo "  Removed redundant unreleased section"
      CHANGES_MADE=$((CHANGES_MADE + 1))
    else
      echo "  No multiple unreleased sections found"
    fi
  else
    echo "[$COUNTER/$TOTAL_PACKAGES] CHANGELOG.md not found for $package_name"
  fi
  
done < package-names.txt

echo "Completed processing all packages!"
echo "Made changes to $CHANGES_MADE CHANGELOG.md files"
