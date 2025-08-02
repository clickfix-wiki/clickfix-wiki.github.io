"""
ClickFix Wiki Pages Module
Handles Markdown page processing and navigation generation
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Any
from .utils import render_markdown

class PageProcessor:
    def __init__(self, pages_dir: Path = Path("pages")):
        self.pages_dir = pages_dir
        
    def get_all_pages(self) -> List[Dict[str, Any]]:
        """Load all Markdown pages from the pages directory"""
        pages = []
        
        if not self.pages_dir.exists():
            print(f"Pages directory {self.pages_dir} not found")
            return pages
            
        for md_file in self.pages_dir.glob("*.md"):
            page = self.load_markdown_page(md_file)
            if page:
                pages.append(page)
                print(f"Loaded page: {md_file.name}")
        
        return pages
    
    def load_markdown_page(self, file_path: Path) -> Dict[str, Any]:
        """Load and parse a Markdown page file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract title from first heading
            title = self.extract_title(content)
            
            # Generate slug from filename
            slug = file_path.stem
            
            # Parse content
            html_content = render_markdown(content)
            
            return {
                'title': title,
                'slug': slug,
                'content': html_content,
                'filename': file_path.name
            }
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
            return None
    
    def extract_title(self, content: str) -> str:
        """Extract title from Markdown content (first # heading)"""
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('# '):
                return line[2:].strip()
        return "Untitled Page"
    
    def generate_navigation_html(self, pages: List[Dict[str, Any]]) -> str:
        """Generate navigation HTML for all pages"""
        nav_html = '<a href="index.html" class="nav-link">Home</a>'
        
        for page in pages:
            nav_html += f'<a href="pages/{page["slug"]}.html" class="nav-link">{page["title"]}</a>'
        
        return nav_html
    
    def generate_navigation_html_relative(self, pages: List[Dict[str, Any]]) -> str:
        """Generate navigation HTML for pages with relative paths (for subdirectories)"""
        nav_html = '<a href="../index.html" class="nav-link">Home</a>'
        
        for page in pages:
            nav_html += f'<a href="../pages/{page["slug"]}.html" class="nav-link">{page["title"]}</a>'
        
        return nav_html
    
    def generate_page_html(self, page: Dict[str, Any]) -> str:
        """Generate HTML for a single page"""
        template = self.get_page_template()
        
        # Generate navigation for this page
        pages = self.get_all_pages()
        navigation_html = self.generate_navigation_html_relative(pages)
        
        html = template.replace("{{TITLE}}", page['title'])
        html = html.replace("{{CONTENT}}", page['content'])
        html = html.replace("{{SLUG}}", page['slug'])
        html = html.replace("{{NAVIGATION_HTML}}", navigation_html)
        
        return html
    
    def get_page_template(self):
        """Get the page template"""
        return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - ClickFix Wiki</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>ClickFix Wiki</h1>
            <p>Code execution by social engineering instructions</p>
            <nav class="site-navigation">
                {{NAVIGATION_HTML}}
            </nav>
        </div>
    </div>

    <div class="container">
        <div class="page-content">
            <div class="page-body">
                {{CONTENT}}
            </div>
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <p>Documenting Windows system tools for educational and legitimate system administration purposes</p>
        </div>
    </div>
</body>
</html>''' 