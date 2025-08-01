# Contributing to ClickFix Wiki

Thank you for your interest in contributing to ClickFix Wiki! This guide will help you add new entries to our catalog of Windows system utilities and techniques.

## Quick Start

1. **Copy the template**: Use `YML-Template.yml` as a starting point
2. **Create a new file**: Add your YML file to the `_entries/` directory
3. **Follow the format**: Ensure your YML follows the schema in `YML-Schema.yml`
4. **Test locally**: Run `bundle exec jekyll serve` to preview your changes
5. **Submit a PR**: Create a pull request with your new entry

## Adding a New Entry

### Step 1: Create the YML File

Create a new file in the `_entries/` directory with a descriptive name (e.g., `notepad.yml`, `regedit.yml`).

### Step 2: Use the Template

Copy the content from `YML-Template.yml` and fill in your entry details:

```yaml
---
layout: entry
title: "your-entry-name"
---

Name: "Your Entry Name"
Description: "Brief description of what this utility/technique does"
Author: "Your Name"
Created: "2024-01-01"
Commands:
  - Command: "command-to-execute"
    Description: "What this command does"
    Category: "Category Name"
    Platform: ["Windows"]
    Interface: ["CLI"]
    Prerequisites: "Any prerequisites needed"
    Examples:
      - Description: "Example description"
        Command: "example command"
        Output: "Expected output"
    Mitigations:
      - "Security mitigation 1"
      - "Security mitigation 2"
    References:
      - "https://reference-url.com"
    Tags:
      - "tag1"
      - "tag2"
```

### Step 3: Required Fields

- **Name**: The name of the utility or technique
- **Description**: A clear, concise description
- **Author**: Your name or handle
- **Created**: Date in YYYY-MM-DD format
- **Commands**: Array of command objects (see schema for details)

### Step 4: Optional Fields

- **Prerequisites**: Any requirements or dependencies
- **Examples**: Usage examples with commands and outputs
- **Mitigations**: Security considerations and countermeasures
- **References**: Links to documentation or related resources
- **Tags**: Keywords for categorization and search

## Categories

Use these standard categories for consistency:

### Platforms
- Windows
- Mac
- Linux

### Interfaces
- CLI (Command Line Interface)
- GUI (Graphical User Interface)

### Common Categories
- Command Execution
- File Operations
- Registry Manipulation
- Network Operations
- System Information
- Security Tools

## Guidelines

1. **Be accurate**: Ensure all commands and examples work as described
2. **Be comprehensive**: Include relevant examples and mitigations
3. **Be clear**: Use clear, concise language
4. **Be consistent**: Follow the established format and style
5. **Be helpful**: Include practical examples and security considerations

## Testing Your Entry

1. **Local testing**: Run `bundle exec jekyll serve` to preview your entry
2. **Check formatting**: Ensure the YML is valid and follows the schema
3. **Verify links**: Test all external links and references
4. **Review content**: Have someone else review your entry for clarity

## Schema Reference

See `YML-Schema.yml` for the complete schema definition and field descriptions.

## Questions?

If you have questions or need help, please:
1. Check the existing entries for examples
2. Review the schema documentation
3. Open an issue on GitHub
4. Ask in the discussions section

Thank you for contributing to ClickFix Wiki! 