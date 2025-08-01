---
layout: page
title: Scripts
description: Windows scripting utilities and techniques
---

# Scripts

A collection of Windows scripting utilities and techniques that can be used for automation, system administration, and security research.

## Available Scripts

{% assign script_entries = site.entries | where_exp: "entry", "entry.Name contains '.ps1' or entry.Name contains '.bat' or entry.Name contains '.vbs' or entry.Name contains '.js'" | sort: 'Name' %}
{% for entry in script_entries %}
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

## Script Types

- **PowerShell Scripts** (.ps1) - PowerShell automation and administration
- **Batch Files** (.bat/.cmd) - Command line batch processing
- **VBScript** (.vbs) - Windows Script Host automation
- **JavaScript** (.js) - Windows Script Host with JScript
- **Python Scripts** (.py) - Python automation on Windows

## Categories

- **System Administration** - Administrative tasks and automation
- **Security Research** - Security testing and analysis scripts
- **File Operations** - File and directory manipulation
- **Registry Operations** - Registry editing and management
- **Network Operations** - Network configuration and monitoring
- **User Management** - User account administration

## Contributing

To add a new script entry, please see our [contributing guide](CONTRIBUTING.md) and use the [YML template](YML-Template.yml). 