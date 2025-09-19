#!/bin/bash

# This script finds and cleans up redundant unreleased sections in CHANGELOG.md files
# It removes the second unreleased section if there are two consecutive unreleased sections

# Create a file to store packages with actual directory paths
echo "Creating package paths mapping..."
rm -f package-paths.txt

# Extract the package directories from wrong-version.txt
cut -d':' -f1 wrong-version.txt > package-names.txt

# Create a map of package names to their actual directory paths
while read -r package_name; do
  # Convert package name to package path patterns
  if [[ $package_name == "@azure/"* ]]; then
    # Extract the package part after @azure/
    package_part=${package_name#@azure/}
    
    # Try to find matching directories
    found=false
    for dir in $(find sdk -type d -name "$package_part" 2>/dev/null); do
      if [[ -f "$dir/CHANGELOG.md" ]]; then
        echo "$package_name:$dir" >> package-paths.txt
        found=true
        break
      fi
    done
    
    if [[ "$found" == "false" ]]; then
      # Try to handle arm-* packages where directory structure might be different
      if [[ $package_part == arm-* ]]; then
        service=${package_part#arm-}
        potential_path="sdk/$service/$package_part"
        if [[ -f "$potential_path/CHANGELOG.md" ]]; then
          echo "$package_name:$potential_path" >> package-paths.txt
          found=true
        fi
      fi
    fi
    
    if [[ "$found" == "false" ]]; then
      echo "Warning: Could not find directory for $package_name"
    fi
  elif [[ $package_name == "@azure-rest/"* ]]; then
    # Extract the package part after @azure-rest/
    package_part=${package_name#@azure-rest/}
    
    # Try to find matching directories with -rest suffix
    found=false
    for dir in $(find sdk -type d -name "*-rest" 2>/dev/null); do
      if [[ -f "$dir/CHANGELOG.md" && "$dir" == *"$package_part"* || "$dir" == *"${package_part//-/_}"* ]]; then
        echo "$package_name:$dir" >> package-paths.txt
        found=true
        break
      fi
    done
    
    if [[ "$found" == "false" ]]; then
      echo "Warning: Could not find directory for $package_name"
    fi
  fi
done < package-names.txt

# Count total packages
TOTAL_PACKAGES=$(wc -l < package-paths.txt)
echo "Found $TOTAL_PACKAGES packages with paths to process"

# Counter for changes made
CHANGES_MADE=0

# Process each package with known path
COUNTER=0
while IFS=: read -r package_name dir_path; do
  COUNTER=$((COUNTER + 1))
  
  # Check if CHANGELOG.md exists
  changelog_path="$dir_path/CHANGELOG.md"
  if [[ -f "$changelog_path" ]]; then
    echo "[$COUNTER/$TOTAL_PACKAGES] Processing $package_name CHANGELOG at $changelog_path"
    
    # Create a temporary file to store the processed content
    temp_file=$(mktemp)
    
    # Read the file into an array of lines
    mapfile -t lines < "$changelog_path"
    
    # Variables for tracking state
    in_first_unreleased=false
    in_second_unreleased=false
    first_unreleased_done=false
    seen_first_unreleased=false
    seen_released=false
    
    # Process each line
    for ((i=0; i<${#lines[@]}; i++)); do
      line="${lines[$i]}"
      
      # Check for unreleased section header
      if [[ $line =~ ^##[[:space:]]+[0-9]+\.[0-9]+\.[0-9]+[[:space:]]+\(Unreleased\) ]]; then
        if ! $seen_first_unreleased; then
          # First unreleased section
          seen_first_unreleased=true
          echo "$line" >> "$temp_file"
        else
          # Skip second unreleased section
          if ! $seen_released; then
            in_second_unreleased=true
            # Don't write this line
          else
            # This is a later unreleased section after a released section, keep it
            echo "$line" >> "$temp_file"
          fi
        fi
      # Check for release with date
      elif [[ $line =~ ^##[[:space:]]+[0-9]+\.[0-9]+\.[0-9]+[[:space:]]+\([0-9]{4}-[0-9]{2}-[0-9]{2}\) ]]; then
        seen_released=true
        in_second_unreleased=false
        echo "$line" >> "$temp_file"
      elif $in_second_unreleased; then
        # Skip lines in the second unreleased section
        continue
      else
        # Write the line to the output file
        echo "$line" >> "$temp_file"
      fi
    done
    
    # Compare the files to see if changes were made
    if ! cmp -s "$temp_file" "$changelog_path"; then
      # Files are different, changes were made
      mv "$temp_file" "$changelog_path"
      echo "  Removed redundant unreleased section"
      CHANGES_MADE=$((CHANGES_MADE + 1))
    else
      # No changes made
      rm "$temp_file"
      echo "  No redundant sections removed"
    fi
  else
    echo "[$COUNTER/$TOTAL_PACKAGES] CHANGELOG.md not found for $package_name at $dir_path"
  fi
  
done < package-paths.txt

echo "Completed processing all packages!"
echo "Made changes to $CHANGES_MADE CHANGELOG.md files"
