# ClickFix Wiki
A comprehensive documentation of Windows system tools and command-line utilities to help users understand and safely use system administration tools.

## What is ClickFix Wiki?

ClickFix Wiki provides detailed documentation for Windows system tools and command-line utilities. This resource helps users understand how to properly use these tools for legitimate system administration tasks while being aware of their potential misuse in social engineering attacks.

## Features

- **Tool Documentation**: Detailed guides for Windows system tools
- **Step-by-Step Instructions**: Clear procedures for using each tool
- **Prerequisites**: Requirements and permissions needed
- **References**: Official Microsoft documentation links
- **Category Organization**: Tools organized by function and type
- **GitHub Pages Compatible**: Simple HTML/CSS/JS implementation

## Structure

```
clickfix-wiki.github.io/
├── .github/workflows/deploy.yml # GitHub Actions for deployment
├── index.html                   # Main website with simplified cards
├── techniques/                  # YAML files for each tool
│   ├── cmd.yaml                # Command Prompt documentation
│   ├── powershell.yaml         # PowerShell documentation
│   └── regedit.yaml            # Registry Editor documentation
├── technique-template.html      # Template for individual pages
├── technique-template.yaml      # Template for new tool files
├── generate-pages.js            # Script to generate individual pages
├── clean.js                     # Script to clean generated files
├── yaml-quick-reference.md      # Quick reference for YAML format
├── package.json                 # Project metadata
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

**Note**: Individual tool pages (`pages/` directory) are generated automatically during the build process and are not committed to the repository.

## YAML File Format

Each tool is stored in its own YAML file with the following structure:

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

For a quick reference of the YAML format, see `yaml-quick-reference.md`.

## Deployment

This website is designed to work with GitHub Pages. Simply:

1. Push this repository to GitHub
2. Enable GitHub Pages in repository settings
3. The site will be available at `https://clickfix-wiki.github.io`

## Contributing

To add new tools:

1. Copy `technique-template.yaml` to create a new tool file
2. Fill in the tool information following the established format
3. Add techniques with steps, prerequisites, and references
4. Submit a pull request

The HTML pages will be generated automatically during the GitHub Actions build process.

### Available Scripts

- `npm run start` - Start local development server (generates pages locally)
- `npm run generate-pages` - Generate individual tool pages locally
- `npm run clean` - Remove generated files
- `npm run build` - Generate pages (alias for generate-pages)

## Current Tools

The database currently includes documentation for the following Windows system tools:

- **Command Prompt (cmd.exe)**: Windows command-line interpreter for executing commands and batch files
- **PowerShell (powershell.exe)**: Advanced command-line shell and scripting language for Windows
- **Registry Editor (regedit.exe)**: Windows registry editor for viewing and modifying system registry

## Categories

- **command-line**: Command-line tools and utilities
- **system-tools**: System administration and configuration tools

## Tag Categories

### Operating System
- **Windows**: Tools specific to Windows operating system

### Interface Type
- **CLI**: Command-line interface tools
- **GUI**: Graphical user interface tools

### Function
- **Command Line**: Command-line execution tools
- **Scripting**: Scripting and automation tools
- **System Tools**: System administration tools
- **Registry**: Registry manipulation tools
- **System Configuration**: System configuration tools

## Tool Categories

### Command Line Tools
- **Command Prompt**: Basic command-line operations
- **PowerShell**: Advanced scripting and automation

### System Administration
- **Registry Editor**: System registry management
- **System Configuration**: System settings and configuration

## Security Notice

This documentation is provided for educational and legitimate system administration purposes. These tools can be powerful and should be used responsibly:

- Always understand what a command does before executing it
- Use administrator privileges only when necessary
- Be cautious when modifying system registry
- Follow security best practices when using system tools
- These tools can be misused in social engineering attacks - this documentation helps users understand proper usage

## License

This project is open source and available under the MIT License.

## Disclaimer

This website is for educational and legitimate system administration purposes only. The tools documented here are standard Windows system utilities that can be used for both legitimate and malicious purposes. This documentation is provided to help users understand proper usage and be aware of potential security implications. 
