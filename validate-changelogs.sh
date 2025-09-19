#!/bin/bash

# This script validates that there are no CHANGELOG.md files with consecutive unreleased sections

echo "Validating all CHANGELOG.md files..."

# Find all CHANGELOG.md files in the repo
find sdk -name "CHANGELOG.md" -type f > all-changelogs.txt
TOTAL_FILES=$(wc -l < all-changelogs.txt)
echo "Found $TOTAL_FILES CHANGELOG.md files to check"

# Counter for files with issues
ISSUES_FOUND=0

# Process each CHANGELOG.md file
COUNTER=0
while read -r changelog_path; do
  COUNTER=$((COUNTER + 1))
  
  # Extract the package name from the path
  package_name=$(echo "$changelog_path" | grep -o "sdk/[^/]*/[^/]*" | sed 's|sdk/||')
  
  # Check for consecutive unreleased sections by reading the file and analyzing section patterns
  content=$(cat "$changelog_path")
  
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
  ' <<< "$content")
  
  if [ "$has_consecutive" -eq 1 ]; then
    echo "[$COUNTER/$TOTAL_FILES] ISSUE: $package_name has consecutive unreleased sections"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
    
    # Display the first 30 lines of the file for debugging
    echo "First 30 lines of the file:"
    head -n 30 "$changelog_path"
    echo "-----"
  fi
done < all-changelogs.txt

if [ "$ISSUES_FOUND" -eq 0 ]; then
  echo "✅ All CHANGELOG.md files are valid! No consecutive unreleased sections found."
else
  echo "❌ Found $ISSUES_FOUND CHANGELOG.md files with consecutive unreleased sections."
fi
