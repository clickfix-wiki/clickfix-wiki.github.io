# YAML Quick Reference

This document provides a quick reference for the YAML file format used in ClickFix Wiki.

## Required Fields

- `Name`: The name of the tool
- `Description`: Brief description of the tool and its purpose
- `Author`: Author of the documentation (usually "ClickFix Wiki")
- `Created`: Creation date in YYYY-MM-DD format
- `Category`: Tool category (command-line, gui, system-tools, networking, security)
- `Tags`: Array of tags for filtering and categorization
- `Techniques`: Array of specific techniques for using the tool

## Available Tags

### Operating System
- `Windows` - Tools specific to Windows operating system
- `Linux` - Tools specific to Linux operating system
- `macOS` - Tools specific to macOS operating system

### Interface Type
- `CLI` - Command-line interface tools
- `GUI` - Graphical user interface tools

### Function
- `Command Line` - Command-line execution tools
- `Scripting` - Scripting and automation tools
- `System Tools` - System administration tools
- `Registry` - Registry manipulation tools (Windows)
- `System Configuration` - System configuration tools
- `Networking` - Network administration and troubleshooting tools
- `Security` - Security and access control tools
- `File Management` - File system management tools
- `Process Management` - Process monitoring and control tools
- `Network Tools` - Network analysis and monitoring tools
- `Security Tools` - Security analysis and protection tools
- `Development Tools` - Software development utilities

## Technique Structure

Each technique must include:

- `Name`: Name of the technique
- `Description`: Description of what the technique does
- `Steps`: Array of step-by-step instructions
- `Prerequisites`: Requirements, permissions, or knowledge needed
- `References`: Array of URLs to official documentation

## Example

```yaml
Name: "Bash Shell"
Description: "Unix/Linux command-line shell for executing commands and scripts"
Author: "ClickFix Wiki"
Created: "2024-01-15"
Category: "command-line"
Tags: ["Linux", "macOS", "CLI", "Command Line", "Scripting"]

Techniques:
  - Name: "Basic Command Execution"
    Description: "Execute commands directly in Bash"
    Steps:
      - "Open Terminal (Ctrl+Alt+T on Linux, Cmd+Space then 'Terminal' on macOS)"
      - "Type the command: ls"
      - "Press Enter to execute"
    Prerequisites: "Linux or macOS operating system"
    References:
      - "https://www.gnu.org/software/bash/manual/bash.html"
```

## Categories

- `command-line`: Command-line tools and utilities
- `gui`: Graphical user interface tools
- `system-tools`: System administration and configuration tools
- `networking`: Network administration and troubleshooting tools
- `security`: Security and access control tools 