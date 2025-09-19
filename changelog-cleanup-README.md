# CHANGELOG.md Cleanup

This directory contains scripts that were used to clean up duplicate unreleased sections in CHANGELOG.md files across the Azure SDK for JavaScript repository.

## Problem

Some CHANGELOG.md files had duplicate "Unreleased" sections appearing consecutively, such as:

```markdown
# Release History

## 4.1.0-beta.3 (Unreleased)
## 4.1.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes
```

This duplication needed to be fixed to ensure consistent formatting of all CHANGELOG.md files.

## Scripts

The following scripts were created to address this issue:

1. `validate-changelogs.sh` - Checks all CHANGELOG.md files in the repository for consecutive unreleased sections
2. `fix-duplicate-sections.sh` - Identifies and fixes CHANGELOG.md files with consecutive unreleased sections

## Resolution

The fix script successfully processed all 414 CHANGELOG.md files and removed duplicate unreleased sections from 59 affected files. The validation script now confirms that all CHANGELOG.md files in the repository are valid with no consecutive unreleased sections.

## Pattern

The typical pattern of the issue was having two identical version headers with "(Unreleased)" appearing consecutively, with no content between them. The fix removes the redundant second header, preserving all content.

## Verification

You can run the validation script at any time to verify that all CHANGELOG.md files are properly formatted:

```bash
./validate-changelogs.sh
```

If it returns "✅ All CHANGELOG.md files are valid! No consecutive unreleased sections found." then all files are correctly formatted.