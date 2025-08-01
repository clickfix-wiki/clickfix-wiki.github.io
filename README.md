# ClickFix Wiki

A comprehensive documentation wiki for Windows, Linux, and macOS system tools and command-line utilities.

## Overview

ClickFix Wiki provides detailed documentation for system administration tools, command-line utilities, and system configuration tools across multiple operating systems. This wiki serves as a reference for IT professionals, system administrators, and developers who need to understand and use various system tools effectively.

## Features

- **Cross-Platform Support**: Documentation for Windows, Linux, and macOS tools
- **Comprehensive Tool Coverage**: Command-line tools, GUI applications, system utilities
- **Detailed Techniques**: Step-by-step instructions for each tool
- **Search and Filter**: Find tools by operating system, interface type, or function
- **Reference Links**: Direct links to official documentation
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
clickfix-wiki.github.io/
├── index.html                 # Main landing page
├── pages/                     # Generated HTML pages for individual tools
├── techniques/                # YAML files defining tools and techniques
│   ├── cmd.yaml              # Command Prompt documentation
│   ├── powershell.yaml       # PowerShell documentation
│   ├── regedit.yaml          # Registry Editor documentation
│   └── index.txt             # Auto-generated index of YAML files
├── generate-pages.js          # Build script to generate HTML pages
├── technique-template.html    # HTML template for individual tool pages
├── technique-template.yaml    # YAML template for creating new tools
├── clean.js                  # Cleanup script
├── yaml-quick-reference.md   # YAML format reference guide
├── package.json              # Project metadata and scripts
└── README.md                 # This file
```

## Available Scripts

- `npm run generate-pages` - Generate HTML pages from YAML files
- `npm run clean` - Clean generated files
- `npm run build` - Clean and regenerate all pages

## YAML File Format

Each tool is defined in a YAML file with the following structure:

```yaml
Name: "Tool Name"
Description: "Brief description of the tool and its purpose"
Author: "ClickFix Wiki"
Created: "2024-01-15"
Category: "command-line"  # Options: command-line, gui, system-tools, networking, security
Tags: ["Windows", "CLI", "System Tools"]  # Available tags: Windows, Linux, macOS, CLI, GUI, System Tools, Networking, Security, Scripting, System Administration, Registry, File Management, Process Management, Network Tools, Security Tools, Development Tools

Techniques:
  - Name: "Technique Name"
    Description: "Description of this specific technique"
    Steps:
      - "Step 1: First action to take"
      - "Step 2: Second action to take"
      - "Step 3: Third action to take"
    Prerequisites: "What is needed before starting (e.g., administrator privileges, specific software)"
    References:
      - "https://docs.microsoft.com/en-us/example-link"
      - "https://manpages.ubuntu.com/example-link"
      - "https://developer.apple.com/example-link"
```

## Categories

### Operating System
- **Windows**: Tools specific to Windows operating system
- **Linux**: Tools specific to Linux operating system
- **macOS**: Tools specific to macOS operating system

### Interface Type
- **CLI**: Command-line interface tools
- **GUI**: Graphical user interface tools

### Function
- **Command Line**: Command-line execution tools
- **Scripting**: Scripting and automation tools
- **System Tools**: System administration tools
- **Registry**: Registry manipulation tools (Windows)
- **System Configuration**: System configuration tools
- **Networking**: Network administration and troubleshooting tools
- **Security**: Security and access control tools
- **File Management**: File system management tools
- **Process Management**: Process monitoring and control tools
- **Network Tools**: Network analysis and monitoring tools
- **Security Tools**: Security analysis and protection tools
- **Development Tools**: Software development utilities

## Current Tools

### Windows Tools
- **Command Prompt (cmd.exe)** - Windows command-line interpreter
- **PowerShell (powershell.exe)** - Advanced Windows scripting shell
- **Registry Editor (regedit.exe)** - Windows registry management

### Cross-Platform Tools
- **Bash Shell** - Unix/Linux command-line shell (Linux, macOS)

## Contributing

To add a new tool:

1. Copy `technique-template.yaml` to create a new YAML file
2. Fill in the tool details following the template structure
3. Add appropriate tags for operating system, interface type, and function
4. Document specific techniques with steps, prerequisites, and references
5. Run `npm run generate-pages` to regenerate the HTML pages

### Guidelines

- Use clear, descriptive names for tools and techniques
- Include step-by-step instructions that are easy to follow
- Specify prerequisites clearly (e.g., administrator privileges, specific software)
- Provide links to official documentation when available
- Use appropriate tags to help users find tools by category
- Test your YAML syntax before committing

## Security Notice

This wiki documents legitimate system administration tools and techniques. All tools and techniques described are intended for educational purposes and legitimate system administration tasks. Users are responsible for ensuring they have proper authorization before using these tools on any system.

## Disclaimer

This documentation is provided for educational and legitimate system administration purposes only. Users are responsible for complying with all applicable laws and regulations when using these tools. The authors are not responsible for any misuse of the information provided.

## Deployment

This project is designed to be deployed on GitHub Pages. The site will be available at:
`https://[username].github.io/clickfix-wiki.github.io/`

## License

This project is open source and available under the MIT License. 
