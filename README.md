# ClickFix Wiki

A comprehensive database of social engineering pretenses and Indicators of ClickFix (IoCF) techniques, built as a static site with Python backend.

## 🚀 Quick Start

### For Developers

1. **Add new techniques**: Simply create a new `.yaml` file in the `techniques/` directory
2. **Build the site**: Run `python build.py`
3. **View locally**: Open `_site/index.html` in your browser

### For Contributors

1. **Fork the repository**
2. **Add your YAML files** to the `techniques/` directory
3. **Push to your fork** - GitHub Actions will automatically build and deploy

## 📁 Project Structure

```
clickfix-wiki.github.io/
├── techniques/           # YAML data files (add new ones here!)
│   ├── cmd.yaml
│   ├── powershell.yaml
│   ├── regedit.yaml
│   ├── example.yaml
│   └── dxdiag.yaml
├── pages/               # Markdown pages (add new ones here!)
│   ├── about.md
│   ├── contact.md
│   └── your-page.md
├── build.py             # Python build script
├── dev.py               # Development helper
├── script.js            # Frontend JavaScript
├── assets/styles.css    # Frontend styles
├── requirements.txt     # Python dependencies
├── yaml_specification.md # YAML format specification
├── STATIC_PAGES_GUIDE.md # Static pages guide
├── _site/              # Generated static site (auto-created)
└── .github/workflows/   # GitHub Actions for auto-deployment
```

## 📝 Adding New Techniques

Create a new `.yaml` file in the `techniques/` directory with this structure:

```yaml
name: "Your Tool Name"
added_at: "YYYY-MM-DD"
platform: "windows|mac|linux"
presentation: "gui|cli"
lures:
  - nickname: "Lure Name"
    added_at: "YYYY-MM-DD"
    capabilities:
      - "UAC"
      - "MOTW"
      - "File Explorer"
    contributor:
      name: "Contributor Name"
      handle: "optional_handle"
      contacts:
        linkedin: "optional"
        twitter: "optional"
        youtube: "optional"
        email: "optional"
    preamble: >
      # Optional, Pure Markdown Syntax
      "Context and pretext information"
    steps:
      - "Step 1: Do this"
      - "Step 2: Do that"
    epilogue: >
      # Optional, also renders as Markdown
    references:
      - "https://example.com/reference"
    mitigations:
      - "Mitigation strategy A"
      - "Mitigation strategy B"
```

See `yaml_specification.md` for the complete specification.

## 📄 Adding Static Pages

Create new Markdown pages in the `pages/` directory:

```markdown
# Your Page Title

## Introduction

Your content here...

## Section 1

More content with **bold** and *italic* text.

## Links

[Link to external site](https://example.com)
[Internal link](pages/about.html)
```

Pages automatically:
- ✅ Appear in site navigation
- ✅ Get consistent styling
- ✅ Support full Markdown features
- ✅ Are cross-linked with other pages

See `STATIC_PAGES_GUIDE.md` for complete documentation.

## 🔧 Development

### Local Development

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Build and serve the site:
   ```bash
   # Just build
   python build.py
   
   # Or use the development helper
   python dev.py build     # Build only
   python dev.py serve     # Serve locally
   python dev.py watch     # Watch for changes
   python dev.py dev       # Build, serve, and watch
   ```

3. View the generated site in `_site/` directory or at `http://localhost:8000`

### Automatic Deployment

- Push to `main` branch → automatically builds and deploys to GitHub Pages
- No manual steps required!
- Site updates automatically when you add new YAML files

## 🎨 Features

- **Static Site**: Fast, secure, and reliable
- **Search & Filter**: Find tools by platform, interface, or capabilities
- **Markdown Support**: Rich formatting in all content fields
- **Contributor Profiles**: Track who contributed each lure
- **Mitigation Strategies**: Built-in security recommendations
- **Responsive Design**: Works on all devices
- **Easy Editing**: Just modify YAML files
- **Auto-Deployment**: GitHub Actions handles everything

## 📚 Documentation

The site documents Windows system tools for educational and legitimate system administration purposes. Each technique includes:

- Step-by-step instructions
- Prerequisites
- References and documentation links
- Categorization by OS, interface, and function

## 🤝 Contributing

1. Fork the repository
2. Add your YAML files to `techniques/`
3. Push to your fork
4. Create a pull request

The site will automatically rebuild and deploy when merged!

## 📄 License

MIT License - see LICENSE file for details. 
