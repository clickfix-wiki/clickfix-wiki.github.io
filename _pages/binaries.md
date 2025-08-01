---
layout: page
title: Binaries
description: Windows binary utilities and executables
---

# Binaries

A collection of Windows binary utilities and executables that can be used for various system operations, security research, and administrative tasks.

## Available Binaries

{% assign binary_entries = site.entries | where_exp: "entry", "entry.Name contains '.exe'" | sort: 'Name' %}
{% for entry in binary_entries %}
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

- **Command Execution** - Tools for running commands and scripts
- **File Operations** - Utilities for file system manipulation
- **Registry Operations** - Windows registry editing tools
- **System Information** - Tools for gathering system data
- **Network Operations** - Network-related utilities
- **Security Tools** - Security and administration utilities

## Contributing

To add a new binary entry, please see our [contributing guide](CONTRIBUTING.md) and use the [YML template](YML-Template.yml). 