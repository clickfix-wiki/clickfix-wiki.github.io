#!/usr/bin/env python3
"""
ClickFix Wiki Static Site Generator
A Python-based static site generator for the ClickFix Wiki
"""

import os
import yaml
import shutil
from pathlib import Path
from typing import Dict, List, Any

# Import our modules
from jinja2 import Environment, FileSystemLoader
from src.generators import generate_tools_html, generate_lures_html, generate_tags_html
from src.utils import format_platform, format_presentation
from src.pages import PageProcessor
from src.config import ConfigLoader

class ClickFixWikiBuilder:
    def __init__(self):
        self.techniques_dir = Path("techniques")
        self.output_dir = Path("_site")
        self.assets_dir = Path("assets")
        self.pages_dir = Path("pages")
        self.templates_dir = Path("templates")
        self.page_processor = PageProcessor(self.pages_dir)
        self.config = ConfigLoader()
        self.jinja_env = Environment(loader=FileSystemLoader('templates'))
        
    def load_yaml_file(self, file_path: Path) -> Dict[str, Any]:
        """Load and parse a YAML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
            return None
    
    def get_all_entries(self) -> List[Dict[str, Any]]:
        """Load all YAML files from the techniques directory"""
        entries = []
        
        if not self.techniques_dir.exists():
            print(f"Techniques directory {self.techniques_dir} not found")
            return entries
            
        for yaml_file in self.techniques_dir.glob("*.yaml"):
            entry = self.load_yaml_file(yaml_file)
            if entry:
                entry['id'] = yaml_file.stem
                entries.append(entry)
                print(f"Loaded: {yaml_file.name}")
        
        return entries
    
    def generate_index_html(self, entries: List[Dict[str, Any]]) -> str:
        """Generate the main index.html file"""
        template = self.jinja_env.get_template('index.html.j2')
        tools_html = generate_tools_html(entries, self.config)
        
        # Generate navigation
        pages = self.page_processor.get_all_pages()
        navigation_html = self.page_processor.generate_navigation_html(pages)
        
        return template.render(
            config=self.config.config,
            tools_html=tools_html,
            navigation_html=navigation_html,
            total_tools=len(entries)
        )
    
    def generate_entry_page(self, entry: Dict[str, Any]) -> str:
        """Generate individual entry page HTML"""
        template = self.jinja_env.get_template('entry.html.j2')
        tags_html = generate_tags_html(entry)
        lures_html = generate_lures_html(entry, self.config)
        
        # Generate navigation
        pages = self.page_processor.get_all_pages()
        navigation_html = self.page_processor.generate_navigation_html_relative(pages)
        
        # Handle date conversion
        added_at = entry.get('added_at', 'Unknown')
        if hasattr(added_at, 'strftime'):
            added_at = added_at.strftime('%Y-%m-%d')
        elif added_at is None:
            added_at = 'Unknown'
        else:
            added_at = str(added_at)
        
        # Prepare entry data for template
        entry_data = {
            'name': entry.get('name', 'Unnamed Tool'),
            'platform': format_platform(entry.get('platform', 'Unknown')),
            'presentation': format_presentation(entry.get('presentation', 'Unknown')),
            'added_at': added_at
        }
        
        return template.render(
            config=self.config.config,
            entry=entry_data,
            tags_html=tags_html,
            lures_html=lures_html,
            navigation_html=navigation_html
        )
    
    def build_site(self):
        """Build the complete static site"""
        print("Building ClickFix Wiki...")
        
        # Create output directory
        self.output_dir.mkdir(exist_ok=True)
        (self.output_dir / "pages").mkdir(exist_ok=True)
        
        # Load all entries
        entries = self.get_all_entries()
        print(f"Loaded {len(entries)} entries")
        
        # Generate index.html
        index_html = self.generate_index_html(entries)
        with open(self.output_dir / "index.html", 'w', encoding='utf-8') as f:
            f.write(index_html)
        print("Generated: index.html")
        
        # Generate individual entry pages
        for entry in entries:
            page_html = self.generate_entry_page(entry)
            page_path = self.output_dir / "pages" / f"{entry['id']}.html"
            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(page_html)
            print(f"Generated: pages/{entry['id']}.html")
        
        # Generate static pages
        pages = self.page_processor.get_all_pages()
        for page in pages:
            page_html = self.page_processor.generate_page_html(page)
            page_path = self.output_dir / "pages" / f"{page['slug']}.html"
            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(page_html)
            print(f"Generated: pages/{page['slug']}.html")
        
        # Copy static assets
        self.copy_static_assets()
        
        print("Build complete!")
        return len(entries)
    
    def copy_static_assets(self):
        """Copy CSS, JS, and other static assets"""
        assets_to_copy = [
            ('assets/styles.css', 'styles.css'),
            ('script.js', 'script.js'),
            ('images', 'images')
        ]
        
        for src, dst in assets_to_copy:
            src_path = Path(src)
            dst_path = self.output_dir / dst
            
            if src_path.exists():
                if src_path.is_file():
                    shutil.copy2(src_path, dst_path)
                    print(f"Copied: {src}")
                elif src_path.is_dir():
                    if dst_path.exists():
                        shutil.rmtree(dst_path)
                    shutil.copytree(src_path, dst_path)
                    print(f"Copied: {src}/")

def main():
    """Main build function"""
    builder = ClickFixWikiBuilder()
    try:
        num_entries = builder.build_site()
        print(f"\nBuild successful! Generated {num_entries} entry pages.")
    except Exception as e:
        print(f"\nBuild failed: {e}")
        return 1
    return 0

if __name__ == "__main__":
    exit(main()) 