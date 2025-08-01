# Pages Directory

This directory contains all the static pages for the ClickFix Wiki website.

## Available Pages

- **`about.md`** - About page with project information
- **`api.md`** - API documentation page
- **`binaries.md`** - Lists all binary (.exe) entries
- **`libraries.md`** - Lists all library (.dll, .lib) entries
- **`scripts.md`** - Lists all script (.ps1, .bat, .vbs, .js) entries

## How to Add New Pages

1. **Create a new markdown file** in this directory
2. **Add front matter** with layout and metadata:

```yaml
---
layout: page
title: "Your Page Title"
description: "Brief description of the page"
---
```

3. **Add your content** in markdown format
4. **Update navigation** in `_config.yml` if needed

## Page Structure

Each page should have:
- **Front matter** with layout, title, and description
- **Clear headings** for organization
- **Relevant content** that fits the site's purpose
- **Links to other pages** where appropriate

## Customization

You can easily customize any page by:
- **Editing the markdown content**
- **Adding new sections**
- **Including Liquid templates** for dynamic content
- **Adding custom CSS classes** for styling

## Examples

### Simple Page
```yaml
---
layout: page
title: "Contact"
description: "Get in touch with the ClickFix Wiki team"
---

# Contact Us

Get in touch with the ClickFix Wiki team...

### Contact Information
- Email: team@clickfix-wiki.github.io
- GitHub: [https://github.com/clickfix-wiki/clickfix-wiki.github.io](https://github.com/clickfix-wiki/clickfix-wiki.github.io)
```

### Dynamic Page
```yaml
---
layout: page
title: "Recent Entries"
description: "Recently added entries"
---

# Recent Entries

{% assign recent_entries = site.entries | sort: 'Created' | reverse | limit: 10 %}
{% for entry in recent_entries %}
<div class="entry-card">
  <h3><a href="{{ entry.url }}">{{ entry.Name }}</a></h3>
  <p>{{ entry.Description }}</p>
</div>
{% endfor %}
```

## Navigation

To add a page to the navigation, update the `nav` section in `_config.yml`:

```yaml
nav:
  - title: Your Page
    url: /your-page/
```

The pages will be automatically accessible at the URLs specified in the navigation. 