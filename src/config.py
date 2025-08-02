"""
ClickFix Wiki Configuration Loader
Handles loading and processing of global configuration settings
"""

import yaml
from pathlib import Path
from typing import Dict, Any
from .utils import render_markdown

class ConfigLoader:
    def __init__(self, config_path: Path = Path("config.yml")):
        self.config_path = config_path
        self.config = self.load_config()
    
    def load_config(self) -> Dict[str, Any]:
        """Load configuration from YAML file"""
        try:
            with open(self.config_path, 'r', encoding='utf-8') as f:
                config = yaml.safe_load(f)
            
            # Don't process markdown for template values - keep them as raw strings
            print(f"Loaded configuration from {self.config_path}")
            return config
        except Exception as e:
            print(f"Error loading config: {e}")
            return self.get_default_config()
    
    def process_markdown(self, obj: Any) -> None:
        """Recursively process markdown in string values"""
        if isinstance(obj, dict):
            for key, value in obj.items():
                if isinstance(value, str):
                    obj[key] = render_markdown(value)
                else:
                    self.process_markdown(value)
        elif isinstance(obj, list):
            for item in obj:
                self.process_markdown(item)
    
    def get_default_config(self) -> Dict[str, Any]:
        """Get default configuration if config file is not found"""
        return {
            'title': 'ClickFix Wiki',
            'tagline': 'Code execution by social engineering instructions',
            'search_prompt': 'Search tools, lures, or capabilities...',
            'filter_label': 'Filter',
            'clear_filter_button_label': 'Clear All Filters',
            'show_count': False,
            'footer': 'Documenting Windows system tools for educational and legitimate system administration purposes',
            'nav_home': 'Home',
            'nav_about': 'About',
            'nav_contact': 'Contact',
            'platform_windows': 'Windows',
            'platform_mac': 'Mac',
            'platform_linux': 'Linux',
            'interface_gui': 'GUI',
            'interface_cli': 'CLI',
            'capability_uac': 'UAC',
            'capability_motw': 'MOTW',
            'capability_file_explorer': 'File Explorer',
            'back_to_tools': '← Back to all tools',
            'lures_section_title': 'Social Engineering Lures',
            'added_date_label': 'Added',
            'lure_count_singular': 'lure',
            'lure_count_plural': 'lures',
            'contributor_by': 'By',
            'contributor_handle_prefix': '@',
            'steps_label': 'Steps',
            'references_label': 'References',
            'mitigations_label': 'Mitigations',
            'preamble_label': 'Context',
            'epilogue_label': 'Additional Information',
            'contact_email': 'security@clickfix-wiki.org',
            'contact_twitter': '@ClickFixWiki',
            'contact_github': 'github.com/clickfix-wiki',
            'contact_linkedin': 'linkedin.com/company/clickfix-wiki',
            'disclaimer': 'This documentation is provided for **educational and legitimate security research purposes only**.'
        }
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value"""
        return self.config.get(key, default)
    
    def get_markdown(self, key: str, default: str = "") -> str:
        """Get configuration value as rendered markdown"""
        value = self.get(key, default)
        if isinstance(value, str):
            return render_markdown(value)
        return str(value) 