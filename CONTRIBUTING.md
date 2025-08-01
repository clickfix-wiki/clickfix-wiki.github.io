# Contributing to ClickFix Wiki

Thank you for your interest in contributing to ClickFix Wiki! This document provides guidelines for contributing to the project.

## What We're Looking For

ClickFix Wiki documents Windows system utilities, commands, and techniques that can be used for various system operations, security research, and administrative tasks. We're particularly interested in:

- **Windows utilities** that have unexpected functionality
- **Command-line tools** that can be used for system operations
- **GUI applications** with command-line capabilities
- **Scripting techniques** for automation and system management
- **Security research tools** and techniques
- **Administrative utilities** for system management

## Categories

Our content is organized by the following categories:

### Platforms
- **Windows** - Windows-specific utilities and commands
- **Mac** - macOS-specific utilities and commands  
- **Linux** - Linux-specific utilities and commands

### Interface Types
- **GUI** - Graphical user interface tools
- **CLI** - Command-line interface tools

### Capabilities
- **Open File Explorer** - Tools for file system navigation
- **Run Command** - Command execution utilities
- **Clear Mark of The Web** - MOTW removal techniques
- **UAC** - User Account Control bypass and manipulation
- **Command Execution** - Various command execution methods
- **File Operations** - File system operations
- **System Information** - System information gathering
- **Network Operations** - Network-related operations
- **Registry Operations** - Windows registry operations
- **Service Management** - Windows service management
- **Process Management** - Process manipulation
- **User Management** - User account operations
- **Security Operations** - Security-related operations
- **PowerShell** - PowerShell-specific techniques
- **Batch Scripting** - Batch file techniques
- **VBScript** - VBScript techniques
- **JavaScript** - JavaScript techniques
- **Other** - Miscellaneous techniques

## How to Contribute

### 1. Fork the Repository

1. Go to [https://github.com/clickfix-wiki/clickfix-wiki.github.io](https://github.com/clickfix-wiki/clickfix-wiki.github.io)
2. Click the "Fork" button to create your own copy of the repository

### 2. Create a New Branch

```bash
git clone https://github.com/YOUR_USERNAME/clickfix-wiki.github.io.git
cd clickfix-wiki.github.io
git checkout -b feature/your-feature-name
```

### 3. Add Your Entry

1. Create a new YML file in the `yml/` directory
2. Use the template from `YML-Template.yml` as a starting point
3. Follow the schema defined in `YML-Schema.yml`

### 4. Example Entry

Here's an example of a complete entry:

```yaml
Name: "reg.exe"
Description: "Windows Registry Editor - Command-line registry editing tool"
Author: "Your Name"
Created: "2024-01-01"
Commands:
  - Command: "reg.exe add \"HKLM\\Software\\Example\" /v TestValue /t REG_SZ /d \"Test Data\""
    Description: "Add a registry key and value"
    Category: "Registry Operations"
    Platform: ["Windows"]
    Interface: ["CLI"]
    Prerequisites: "Administrator privileges for HKLM operations"
    Examples:
      - Description: "Add a registry key"
        Command: "reg.exe add \"HKLM\\Software\\Example\" /v TestValue /t REG_SZ /d \"Test Data\""
        Output: "The operation completed successfully."
    Mitigations:
      - "Monitor registry modifications"
      - "Restrict registry access via Group Policy"
      - "Use Windows Defender Application Control"
    References:
      - "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/reg"
    Tags:
      - "registry"
      - "windows-native"
      - "administration"
```

### 5. Test Your Changes

1. Install Jekyll locally:
   ```bash
   gem install jekyll bundler
   bundle install
   ```

2. Run the site locally:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000` to preview your changes

### 6. Submit Your Pull Request

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add entry for reg.exe"
   git push origin feature/your-feature-name
   ```

2. Go to your fork on GitHub and click "New Pull Request"
3. Fill out the pull request template
4. Submit the pull request

## Entry Guidelines

### Required Fields

- **Name**: The name of the utility or command
- **Description**: A brief description of what this utility does
- **Author**: Your name or GitHub username
- **Created**: Date in YYYY-MM-DD format
- **Commands**: Array of command objects

### Command Object Fields

- **Command**: The actual command or technique
- **Description**: Description of what this command does
- **Category**: One of the predefined categories
- **Platform**: Array of platforms (Windows, Mac, Linux)
- **Interface**: Array of interfaces (GUI, CLI)

### Optional Fields

- **Prerequisites**: Any prerequisites needed to run this command
- **Examples**: Array of example objects with Description, Command, and optional Output
- **Mitigations**: Array of security considerations or mitigations
- **References**: Array of reference links
- **Tags**: Array of additional tags for categorization

### Example Object Fields

- **Description**: Description of the example
- **Command**: The example command
- **Output**: Expected output (optional)

## Code Style Guidelines

### YAML Formatting

- Use 2 spaces for indentation
- Use quotes around strings that contain special characters
- Use arrays for multiple values
- Keep line length under 120 characters

### File Naming

- Use lowercase with hyphens for file names
- Use descriptive names that match the utility
- Examples: `cmd.yml`, `powershell.yml`, `reg.yml`

### Content Guidelines

- Be accurate and test your commands
- Include relevant security considerations
- Provide clear, working examples
- Include references to official documentation
- Use appropriate tags for categorization

## Review Process

1. **Automated Checks**: GitHub Actions will run automated checks
2. **Manual Review**: Maintainers will review your pull request
3. **Feedback**: You may receive feedback and requested changes
4. **Approval**: Once approved, your changes will be merged

## Questions or Issues?

If you have questions or encounter issues:

1. Check existing issues on GitHub
2. Create a new issue with a clear description
3. Join our discussions in the Issues section

## License

By contributing to ClickFix Wiki, you agree that your contributions will be licensed under the same license as the project (GPL-3.0).

## Thank You!

Thank you for contributing to ClickFix Wiki! Your contributions help make this resource more comprehensive and useful for the security research and system administration communities. 