#!/bin/bash

# This script focuses specifically on finding and cleaning up consecutive unreleased sections
# in CHANGELOG.md files with exact pattern matching

echo "Searching for CHANGELOG.md files with consecutive unreleased sections..."

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
  
  # Check if the file contains two consecutive unreleased sections
  # This uses grep to look for the specific pattern
  if grep -q -A 20 "## [0-9]\+\.[0-9]\+\.[0-9]\+ (Unreleased)" "$changelog_path" | grep -q "## [0-9]\+\.[0-9]\+\.[0-9]\+ (Unreleased)"; then
    echo "[$COUNTER/$TOTAL_FILES] Checking $changelog_path"
    
    # Read file content
    content=$(cat "$changelog_path")
    
    # Use perl to handle the multiline pattern matching and replacement
    # This pattern looks for the first Unreleased section and everything until the next Unreleased section
    # Then removes the second Unreleased section and its content up to the next regular release
    new_content=$(perl -0777 -pe 's/(## \d+\.\d+\.\d+ \(Unreleased\)[^\#]*?)## \d+\.\d+\.\d+ \(Unreleased\)[^\#]*?(## \d+\.\d+\.\d+ \(\d{4}-\d{2}-\d{2}\))/$1$2/s' "$changelog_path")
    
    # If content changed, update the file
    if [ "$content" != "$new_content" ]; then
      echo "$new_content" > "$changelog_path"
      echo "  Removed redundant unreleased section"
      CHANGES_MADE=$((CHANGES_MADE + 1))
    else
      echo "  No changes needed (complex pattern not matched)"
    fi
  fi
done < all-changelogs.txt

echo "Completed processing all CHANGELOG files!"
echo "Made changes to $CHANGES_MADE CHANGELOG.md files"
