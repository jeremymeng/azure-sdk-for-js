#!/bin/bash

# This script fixes a specific pattern of consecutive unreleased sections
# where they appear directly one after another

echo "Fixing consecutive unreleased sections that appear on consecutive lines..."

# Get the list of files with issues from the validation output
files_with_issues=$(./validate-changelogs.sh | grep "ISSUE:" | awk '{print $2}' | sed 's/^/sdk\//' | sed 's/$\/CHANGELOG.md/')

# Process each file with issues
for file_path in $files_with_issues; do
  # Construct the full path
  changelog_path="${file_path}/CHANGELOG.md"
  
  if [ -f "$changelog_path" ]; then
    echo "Processing $changelog_path"
    
    # Use sed to fix the specific pattern where duplicate unreleased sections appear on consecutive lines
    # This pattern looks for lines like:
    # ## x.x.x-beta.x (Unreleased)
    # ## x.x.x-beta.x (Unreleased)
    # And replaces them with just one instance
    sed -i -e '/^## [0-9]\+\.[0-9]\+\.[0-9]\+\(-beta\.[0-9]\+\)\? (Unreleased)$/{N;/^## [0-9]\+\.[0-9]\+\.[0-9]\+\(-beta\.[0-9]\+\)\? (Unreleased)$\n## [0-9]\+\.[0-9]\+\.[0-9]\+\(-beta\.[0-9]\+\)\? (Unreleased)$/d;}' "$changelog_path"
    
    echo "  Fixed duplicate unreleased section"
  else
    echo "File not found: $changelog_path"
  fi
done

echo "Running validation again to check if all issues are fixed..."
./validate-changelogs.sh