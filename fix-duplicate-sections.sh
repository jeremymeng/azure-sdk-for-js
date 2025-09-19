#!/bin/bash

# This script identifies and fixes CHANGELOG.md files with consecutive unreleased sections

echo "Identifying CHANGELOG.md files with consecutive unreleased sections..."

# Find all CHANGELOG.md files in the repo
find sdk -name "CHANGELOG.md" -type f > all-changelogs.txt
TOTAL_FILES=$(wc -l < all-changelogs.txt)
echo "Found $TOTAL_FILES CHANGELOG.md files to check"

# Counter for files with issues
ISSUES_FIXED=0

# Process each CHANGELOG.md file
while read -r changelog_path; do
  # Check for consecutive unreleased sections
  unreleased_count=$(grep -c "^## [0-9]\+\.[0-9]\+\.[0-9]\+\(-beta\.[0-9]\+\)\? (Unreleased)" "$changelog_path")
  
  if [ "$unreleased_count" -gt 1 ]; then
    echo "Fixing $changelog_path..."
    
    # Use Perl for more powerful pattern matching and replacement
    # This looks for any pattern of consecutive Unreleased sections with any content between them
    # and keeps only the first section
    perl -i -0pe 's/(## [0-9]+\.[0-9]+\.[0-9]+(?:-beta\.[0-9]+)? \(Unreleased\))(?:.*?)(## [0-9]+\.[0-9]+\.[0-9]+(?:-beta\.[0-9]+)? \(Unreleased\))/$1/s' "$changelog_path"
    
    # Check if the fix worked
    new_unreleased_count=$(grep -c "^## [0-9]\+\.[0-9]\+\.[0-9]\+\(-beta\.[0-9]\+\)\? (Unreleased)" "$changelog_path")
    if [ "$new_unreleased_count" -lt "$unreleased_count" ]; then
      echo "  Fixed: Removed redundant unreleased section"
      ISSUES_FIXED=$((ISSUES_FIXED + 1))
    else
      # If Perl approach didn't work, try a more direct approach
      temp_file=$(mktemp)
      found_first=false
      
      # Process the file line by line
      while IFS= read -r line; do
        if [[ "$line" =~ ^##\ [0-9]+\.[0-9]+\.[0-9]+(-beta\.[0-9]+)?\ \(Unreleased\) ]]; then
          if [ "$found_first" = false ]; then
            found_first=true
            echo "$line" >> "$temp_file"
          fi
          # Skip this line if we've already seen an unreleased section
        else
          echo "$line" >> "$temp_file"
        fi
      done < "$changelog_path"
      
      # Replace the original file with our fixed version
      mv "$temp_file" "$changelog_path"
      echo "  Fixed: Used line-by-line processing to remove redundant unreleased sections"
      ISSUES_FIXED=$((ISSUES_FIXED + 1))
    fi
  fi
done < all-changelogs.txt

echo "Completed! Fixed $ISSUES_FIXED files."
echo "Running validation to check if all issues are fixed..."
./validate-changelogs.sh