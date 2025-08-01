---
layout: page
title: API Documentation
description: Programmatic access to ClickFix Wiki data
---

# API Documentation

ClickFix Wiki provides programmatic access to its data through various endpoints and data formats.

## Data Format

All data is stored in YAML format with a consistent schema. Each entry follows the structure defined in `YML-Schema.yml`.

### Example Entry Structure

```yaml
Name: "cmd.exe"
Description: "Windows Command Prompt"
Author: "ClickFix Wiki Team"
Created: "2024-01-01"
Commands:
  - Command: "cmd.exe /c command"
    Description: "Execute a command and terminate"
    Category: "Command Execution"
    Platform: ["Windows"]
    Interface: ["CLI"]
    Prerequisites: "Windows operating system"
    Examples:
      - Description: "Execute a simple command"
        Command: "cmd.exe /c dir"
        Output: "Directory listing"
    Mitigations:
      - "Monitor command execution in logs"
    References:
      - "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd"
    Tags:
      - "command-execution"
      - "shell"
```

## API Endpoints

### Raw YAML Data

Access raw YAML files directly:

```
https://clickfix-wiki.github.io/yml/{filename}.yml
```

Example:
- `https://clickfix-wiki.github.io/yml/cmd.yml`
- `https://clickfix-wiki.github.io/yml/powershell.yml`

### JSON API (Planned)

We plan to provide JSON endpoints for easier programmatic access:

```
GET /api/v1/entries
GET /api/v1/entries/{name}
GET /api/v1/categories
GET /api/v1/platforms
GET /api/v1/search?q={query}
```

### RSS Feed

Subscribe to updates via RSS:

```
https://clickfix-wiki.github.io/feed.xml
```

## Data Access Methods

### 1. Direct File Access

Download YAML files directly from the repository:

```bash
# Clone the repository
git clone https://github.com/clickfix-wiki/clickfix-wiki.github.io.git

# Access YAML files
ls yml/*.yml
```

### 2. GitHub API

Use GitHub's API to access repository contents:

```bash
# Get repository contents
curl https://api.github.com/repos/clickfix-wiki/clickfix-wiki.github.io/contents/yml

# Get specific file
curl https://api.github.com/repos/clickfix-wiki/clickfix-wiki.github.io/contents/yml/cmd.yml
```

### 3. Web Scraping

Parse the generated HTML pages:

```python
import requests
from bs4 import BeautifulSoup

url = "https://clickfix-wiki.github.io/yml/cmd/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
# Parse content...
```

## Schema Validation

All YAML files should conform to the schema defined in `YML-Schema.yml`. You can validate files using:

```bash
# Using Python with PyYAML and jsonschema
python -c "
import yaml
import json
from jsonschema import validate

with open('YML-Schema.yml', 'r') as f:
    schema = yaml.safe_load(f)

with open('yml/cmd.yml', 'r') as f:
    data = yaml.safe_load(f)

validate(instance=data, schema=schema)
print('Schema validation passed')
"
```

## Rate Limiting

- **GitHub API**: 60 requests per hour for unauthenticated requests
- **Website**: No rate limiting currently
- **Repository**: No rate limiting for public access

## Authentication

Currently, no authentication is required for accessing public data. For contributing, see our [Contributing Guidelines](CONTRIBUTING.md).

## Examples

### Python Example

```python
import requests
import yaml

def get_entry(name):
    """Fetch a specific entry from ClickFix Wiki"""
    url = f"https://raw.githubusercontent.com/clickfix-wiki/clickfix-wiki.github.io/master/yml/{name}.yml"
    response = requests.get(url)
    if response.status_code == 200:
        return yaml.safe_load(response.text)
    return None

# Get cmd.exe entry
cmd_entry = get_entry("cmd")
if cmd_entry:
    print(f"Name: {cmd_entry['Name']}")
    print(f"Description: {cmd_entry['Description']}")
    for command in cmd_entry['Commands']:
        print(f"Command: {command['Command']}")
```

### JavaScript Example

```javascript
async function getEntry(name) {
    const url = `https://raw.githubusercontent.com/clickfix-wiki/clickfix-wiki.github.io/master/yml/${name}.yml`;
    const response = await fetch(url);
    if (response.ok) {
        const text = await response.text();
        // Parse YAML (you'll need a YAML parser like js-yaml)
        return yaml.parse(text);
    }
    return null;
}

// Get cmd.exe entry
getEntry('cmd').then(entry => {
    if (entry) {
        console.log(`Name: ${entry.Name}`);
        console.log(`Description: ${entry.Description}`);
        entry.Commands.forEach(command => {
            console.log(`Command: ${command.Command}`);
        });
    }
});
```

### PowerShell Example

```powershell
function Get-ClickFixEntry {
    param([string]$Name)
    
    $url = "https://raw.githubusercontent.com/clickfix-wiki/clickfix-wiki.github.io/master/yml/$Name.yml"
    $response = Invoke-RestMethod -Uri $url -Method Get
    
    return $response
}

# Get cmd.exe entry
$cmdEntry = Get-ClickFixEntry -Name "cmd"
if ($cmdEntry) {
    Write-Host "Name: $($cmdEntry.Name)"
    Write-Host "Description: $($cmdEntry.Description)"
    foreach ($command in $cmdEntry.Commands) {
        Write-Host "Command: $($command.Command)"
    }
}
```

## Contributing to the API

If you'd like to contribute to the API development:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests
5. Submit a pull request

## Support

For API-related questions or issues:

- Create an issue on GitHub
- Join our discussions
- Check existing documentation

## Changelog

- **v1.0.0** - Initial release with YAML data structure
- **v1.1.0** - Added RSS feed support
- **v1.2.0** - Enhanced schema validation
- **v1.3.0** - Added JSON API endpoints (planned) 