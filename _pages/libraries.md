---
layout: page
title: Libraries
description: Windows library files and DLL utilities
---

# Libraries

A collection of Windows library files, DLLs, and library-related utilities that can be used for system operations, development, and security research.

## Available Libraries

{% assign library_entries = site.entries | where_exp: "entry", "entry.Name contains '.dll' or entry.Name contains '.lib' or entry.Name contains 'library'" | sort: 'Name' %}
{% for entry in library_entries %}
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

## Library Types

- **Dynamic Link Libraries** (.dll) - Windows DLL files and functions
- **Static Libraries** (.lib) - Static library files
- **COM Libraries** - Component Object Model libraries
- **.NET Libraries** - .NET Framework assemblies
- **System Libraries** - Windows system libraries

## Categories

- **System Libraries** - Core Windows system libraries
- **Development Libraries** - Libraries for software development
- **Security Libraries** - Security-related libraries and functions
- **Network Libraries** - Network and communication libraries
- **Graphics Libraries** - Graphics and multimedia libraries
- **Database Libraries** - Database connectivity libraries

## Contributing

To add a new library entry, please see our [contributing guide](CONTRIBUTING.md) and use the [YML template](YML-Template.yml). 