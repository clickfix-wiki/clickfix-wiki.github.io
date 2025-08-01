---
layout: page
title: ClickFix Wiki
description: A comprehensive catalog of Windows system utilities, commands, and techniques for security research and system administration
---

# ClickFix Wiki

A comprehensive catalog of Windows system utilities, commands, and techniques for security research and system administration.

## About

ClickFix Wiki is a living documentation of Windows system utilities, commands, and techniques that can be used for various system operations, security research, and administrative tasks. This project serves as a reference for security researchers, system administrators, and IT professionals.

## Entries

{% assign entries = site.entries | sort: 'Name' %}
{% for entry in entries %}
<div class="entry-card">
  <h3><a href="{{ entry.url }}">{{ entry.Name }}</a></h3>
  <p>{{ entry.Description }}</p>
  <div class="entry-meta">
    <span class="author">By {{ entry.Author }}</span>
    <span class="date">{{ entry.Created }}</span>
  </div>
  {% if entry.Commands %}
  <div class="command-count">
    {{ entry.Commands.size }} command{% if entry.Commands.size != 1 %}s{% endif %}
  </div>
  {% endif %}
</div>
{% endfor %}

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

## Contributing

If you have found a new utility or technique that you would like to contribute, please review the contributing guidelines located here: [CONTRIBUTING.md](CONTRIBUTING.md)

A template for the required format has been provided here: [YML-Template.yml](YML-Template.yml)

## Related Projects

- [LOLBAS](https://github.com/LOLBAS-Project/LOLBAS) - Living Off The Land Binaries And Scripts
- [GTFOBins](https://gtfobins.github.io/) - Unix binaries for privilege escalation
- [LOLDrivers](https://loldrivers.io/) - Living Off The Land Drivers
- [LOLOL Farm](https://lolol.farm/) - Living Off The Land techniques 