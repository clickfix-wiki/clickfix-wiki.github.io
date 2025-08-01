# YAML Quick Reference

## Required Fields
```yaml
id: unique-technique-id
title: Technique Name
description: Brief description
severity: low|medium|high
category: phone-scam|email-scam|web-scam
tags: [list of tags]
iocfs: [list of indicators]
examples: [list of examples]
prevention: [list of prevention tips]
```

## Available Tags

### Operating System
- `Windows` - Techniques targeting Windows
- `Mac` - Techniques targeting macOS
- `Linux` - Techniques targeting Linux

### Capabilities
- `GUI` - Uses graphical interfaces
- `CLI` - Uses command-line interfaces
- `Run Command` - Executes commands
- `Open File Explorer` - Opens file managers
- `Clear Mark of The Web` - Bypasses security warnings
- `UAC` - Involves User Account Control
- `Remote Access` - Grants remote access
- `Download` - Involves file downloads
- `Popup` - Uses popup windows
- `Payment` - Involves financial transactions
- `Personal Information` - Steals personal data
- `Document Request` - Requests documents
- `Fake Alert` - Uses fake security alerts

### Other
- `Email` - Involves email communication
- `Web Browser` - Uses web browsers
- `File Attachment` - Involves file attachments
- `Phone Call` - Involves phone calls

## Example
```yaml
id: fake-support-call
title: Fake Technical Support Call
description: Scammer pretends to be from tech companies offering urgent support.
severity: medium
category: phone-scam
tags:
  - Windows
  - Mac
  - Linux
  - GUI
  - CLI
  - Remote Access
  - Phone Call
iocfs:
  - Unsolicited phone calls claiming to be from tech companies
  - Urgency and pressure tactics
  - Requests to install remote access software
examples:
  - "Microsoft calling about your computer being infected"
  - "Apple support calling about your iCloud being compromised"
prevention:
  - Never give remote access to unsolicited callers
  - Hang up on unsolicited tech support calls
  - Verify company contact information independently
``` 