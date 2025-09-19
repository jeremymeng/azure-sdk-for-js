#!/bin/bash

# This script finds and cleans up redundant unreleased sections in CHANGELOG.md files
# It removes the second unreleased section if there are two consecutive unreleased sections
# Now supports beta versions correctly

echo "Searching for CHANGELOG.md files with consecutive unreleased sections including beta versions..."

# Find all CHANGELOG.md files in the repo
find sdk -name "CHANGELOG.md" -type f > all-changelogs.txt
TOTAL_FILES=$(wc -l < all-changelogs.txt)
echo "Found $TOTAL_FILES CHANGELOG.md files to check"

# Counter for changes made
CHANGES_MADE=0

# Process each CHANGELOG.md file
COUNTER=0
while read -r changelog_path; do
  COUNTER=$((COUNTER + 1))
  
  # Extract the package name from the path
  package_name=$(echo "$changelog_path" | grep -o "sdk/[^/]*/[^/]*" | sed 's|sdk/||')
  
  # Use awk to detect consecutive unreleased sections
  has_consecutive=$(awk '
    BEGIN { found_first = 0; consecutive = 0; }
    /^## [0-9]+\.[0-9]+\.[0-9]+(-beta\.[0-9]+)? \(Unreleased\)/ {
      if (found_first == 0) {
        found_first = 1;
      } else if (!seen_released) {
        consecutive = 1;
        exit;
      }
    }
    /^## [0-9]+\.[0-9]+\.[0-9]+(-beta\.[0-9]+)? \([0-9]{4}-[0-9]{2}-[0-9]{2}\)/ {
      seen_released = 1;
    }
    END { print consecutive; }
  ' "$changelog_path")
  
  if [ "$has_consecutive" -eq 1 ]; then
    echo "[$COUNTER/$TOTAL_FILES] Processing $package_name at $changelog_path"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file using awk to remove the second unreleased section
    awk '
      BEGIN { skip = 0; unreleased_count = 0; }
      /^## [0-9]+\.[0-9]+\.[0-9]+(-beta\.[0-9]+)? \(Unreleased\)/ {
        unreleased_count++;
        if (unreleased_count == 1) {
          print;
        } else if (!seen_released) {
          skip = 1;
          next;
        } else {
          print; # This is an unreleased section after a released one, keep it
        }
      }
      /^## [0-9]+\.[0-9]+\.[0-9]+(-beta\.[0-9]+)? \([0-9]{4}-[0-9]{2}-[0-9]{2}\)/ {
        seen_released = 1;
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
  fi
done < all-changelogs.txt

echo "Completed processing all CHANGELOG files!"
echo "Made changes to $CHANGES_MADE CHANGELOG.md files"