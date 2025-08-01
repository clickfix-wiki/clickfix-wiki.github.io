# ClickFix Techniques
A comprehensive database of social engineering pretenses and Indicators of ClickFix (IoCF) to help identify and prevent social engineering attacks.

## What is ClickFix?

ClickFix refers to social engineering techniques where scammers trick victims into pasting malicious scripts, commands, or files into their systems through various pretexts. This can lead to system compromise, data theft, and financial loss.

## Features

- **Searchable Database**: Find techniques by title, description, or IoCFs
- **Tag-based Filtering**: Filter by OS, capabilities, and other categories
- **Comprehensive IoCFs**: Each technique includes detailed indicators of compromise
- **Severity Ratings**: Techniques are categorized by severity level
- **Prevention Tips**: Each technique includes prevention strategies
- **GitHub Pages Compatible**: Simple HTML/CSS/JS implementation

## Structure

```
cfbins2/
├── index.html                    # Main website with simplified cards
├── techniques/                   # YAML files for each technique
│   ├── fake-support-call.yaml
│   ├── fake-email-attachment.yaml
│   ├── fake-software-update.yaml
│   ├── fake-antivirus-scan.yaml
│   ├── fake-prize-notification.yaml
│   └── fake-job-offer.yaml
├── technique-template.html       # Template for individual pages
├── generate-pages.js            # Script to generate individual pages
├── add-technique.js             # Helper script for adding new techniques
├── .github/workflows/deploy.yml # GitHub Actions for deployment
├── package.json                 # Project metadata
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

**Note**: Individual technique pages (`pages/` directory) are generated automatically during the build process and are not committed to the repository.

## YAML File Format

Each technique is stored in its own YAML file with the following structure:

```yaml
id: unique-technique-id
title: Technique Name
description: Brief description of the technique
severity: low|medium|high
category: category-name
tags:
  - Windows
  - Mac
  - Linux
  - GUI
  - CLI
  - Run Command
  - Open File Explorer
  - Clear Mark of The Web
  - UAC
  - Remote Access
  - Download
  - Popup
  - Payment
  - Personal Information
  - Document Request
  - Fake Alert
  - Email
  - Web Browser
  - File Attachment
  - Phone Call
iocfs:
  - Indicator of ClickFix 1
  - Indicator of ClickFix 2
  - ...
examples:
  - Example scenario 1
  - Example scenario 2
  - ...
prevention:
  - Prevention tip 1
  - Prevention tip 2
  - ...
```

## Deployment

This website is designed to work with GitHub Pages. Simply:

1. Push this repository to GitHub
2. Enable GitHub Pages in repository settings
3. The site will be available at `https://username.github.io/repository-name`

## Contributing

To add new techniques:

1. Run `node add-technique.js` to create a new technique interactively
2. Or manually create a new YAML file in the `techniques/` directory
3. Follow the established format
4. Submit a pull request

The HTML pages will be generated automatically during the GitHub Actions build process.

### Available Scripts

- `npm run start` - Start local development server (generates pages locally)
- `npm run add-technique` - Add a new technique interactively
- `npm run generate-pages` - Generate individual technique pages locally
- `npm run clean` - Remove generated files

## Categories

- **Phone Scams**: Techniques involving phone calls
- **Email Scams**: Techniques involving email communication
- **Web Scams**: Techniques involving websites and popups

## Tag Categories

### Operating System
- **Windows**: Techniques targeting Windows systems
- **Mac**: Techniques targeting macOS systems
- **Linux**: Techniques targeting Linux systems

### Capabilities
- **GUI**: Techniques using graphical interfaces
- **CLI**: Techniques using command-line interfaces
- **Run Command**: Techniques that execute commands
- **Open File Explorer**: Techniques that open file managers
- **Clear Mark of The Web**: Techniques that bypass security warnings
- **UAC**: Techniques involving User Account Control
- **Remote Access**: Techniques that grant remote access
- **Download**: Techniques involving file downloads
- **Popup**: Techniques using popup windows
- **Payment**: Techniques involving financial transactions
- **Personal Information**: Techniques that steal personal data
- **Document Request**: Techniques requesting documents
- **Fake Alert**: Techniques using fake security alerts

### Other
- **Email**: Techniques involving email communication
- **Web Browser**: Techniques using web browsers
- **File Attachment**: Techniques involving file attachments
- **Phone Call**: Techniques involving phone calls

## Severity Levels

- **Low**: Basic social engineering techniques
- **Medium**: More sophisticated techniques requiring some technical knowledge
- **High**: Advanced techniques requiring significant technical expertise

## License

This project is open source and available under the MIT License.

## Disclaimer

This website is for educational and awareness purposes only. The techniques documented here are used by malicious actors, and this information is provided to help identify and prevent such attacks. 
