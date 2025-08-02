"""
ClickFix Wiki Utilities
Common utility functions used across the build system
"""

import markdown
from typing import Dict, Any

# Initialize markdown converter with extensions
_md = markdown.Markdown(extensions=[
    'markdown.extensions.fenced_code',
    'markdown.extensions.tables',
    'markdown.extensions.nl2br',
    'markdown.extensions.sane_lists'
])

def render_markdown(text: str) -> str:
    """Convert markdown text to HTML"""
    if not text:
        return ""
    return _md.convert(text)

def format_platform(platform: str) -> str:
    """Format platform for display (title case)"""
    if not platform:
        return "Unknown"
    return platform.title()

def format_presentation(presentation: str) -> str:
    """Format presentation for display (uppercase)"""
    if not presentation:
        return "Unknown"
    return presentation.upper()

def get_contact_url(platform: str, value: str) -> str:
    """Generate contact URL for different platforms"""
    if platform == 'linkedin':
        return f"https://linkedin.com/in/{value}"
    elif platform == 'twitter':
        return f"https://twitter.com/{value.replace('@', '')}"
    elif platform == 'youtube':
        return f"https://youtube.com/@{value}"
    elif platform == 'github':
        return f"https://github.com/{value}"
    elif platform == 'email':
        return f"mailto:{value}"
    elif platform == 'website':
        return value
    else:
        return "#"

def get_all_capabilities(entry: Dict[str, Any]) -> set:
    """Get all capabilities from all lures in an entry"""
    all_capabilities = set()
    for lure in entry.get('lures', []):
        all_capabilities.update(lure.get('capabilities', []))
    return all_capabilities 