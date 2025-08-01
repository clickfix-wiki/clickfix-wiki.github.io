# YAML Quick Reference

## Required Fields
```yaml
Name: "Tool Name"
Description: "Brief description of the tool"
Author: "ClickFix Wiki"
Created: "YYYY-MM-DD"
Category: "category-name"
Tags: ["Windows", "CLI", "GUI", "System Tools"]

Techniques:
  - Name: "Technique Name"
    Description: "Description of the technique"
    Steps:
      - "Step 1 description"
      - "Step 2 description"
      - "Step 3 description"
    Prerequisites: "Requirements and permissions needed"
    References:
      - "https://official-documentation-url"
```

## Available Tags

### Operating System
- `Windows` - Tools specific to Windows operating system

### Interface Type
- `CLI` - Command-line interface tools
- `GUI` - Graphical user interface tools

### Function
- `Command Line` - Command-line execution tools
- `Scripting` - Scripting and automation tools
- `System Tools` - System administration tools
- `Registry` - Registry manipulation tools
- `System Configuration` - System configuration tools

## Categories
- `command-line` - Command-line tools and utilities
- `system-tools` - System administration and configuration tools

## Example
```yaml
Name: "Command Prompt (cmd.exe)"
Description: "Windows command-line interpreter for executing commands and batch files"
Author: "ClickFix Wiki"
Created: "2024-01-15"
Category: "command-line"
Tags: ["Windows", "CLI", "Command Line", "System Tools"]

Techniques:
  - Name: "Basic Command Execution"
    Description: "Execute commands directly in Command Prompt"
    Steps:
      - "Open Command Prompt (Press Win+R, type 'cmd', press Enter)"
      - "Type the command: dir"
      - "Press Enter to execute"
    Prerequisites: "Windows operating system"
    References:
      - "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd"
``` 