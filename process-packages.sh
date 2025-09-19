#!/bin/bash

# This script iterates through package names in non-private-packages.txt,
# feeds each name to get-release-date.sh, and logs the output

LOG_FILE="release-dates.log"
DELAY=1  # Delay in seconds between requests

# Create or clear the log file
echo "Package Release Dates" > $LOG_FILE
echo "====================" >> $LOG_FILE
echo "Generated on: $(date)" >> $LOG_FILE
echo "" >> $LOG_FILE

# Count the total number of packages
TOTAL_PACKAGES=$(wc -l < non-private-packages.txt)
echo "Processing $TOTAL_PACKAGES packages..."

# Process each package
COUNTER=0
while read -r package_name; do
  COUNTER=$((COUNTER + 1))
  echo "[$COUNTER/$TOTAL_PACKAGES] Processing $package_name..."
  
  # Get the release date and append to log file
  ./get-release-date.sh "$package_name" >> $LOG_FILE
  
  # Add a separator line
  echo "----------------------------------------" >> $LOG_FILE
  
  # Delay to avoid overwhelming the npm registry
  sleep $DELAY
done < non-private-packages.txt

echo "Completed! Results saved to $LOG_FILE"
