"""
ClickFix Wiki HTML Generators
Handles generation of HTML content from YAML data
"""

from typing import Dict, List, Any
from .utils import render_markdown, format_platform, format_presentation, get_contact_url, get_all_capabilities

def generate_tools_html(entries: List[Dict[str, Any]], config) -> str:
    """Generate tools HTML for the index page"""
    tools_html = ""
    for entry in entries:
        # Get all capabilities from all lures
        all_capabilities = get_all_capabilities(entry)
        
        # Count lures
        lure_count = len(entry.get('lures', []))
        
        # Generate tags HTML
        tags_html = ""
        platform = entry.get('platform', '')
        if platform:
            platform_formatted = format_platform(platform)
            if platform_formatted == 'Windows':
                tags_html += f'<span class="tool-tag platform-tag" data-platform="{platform_formatted}"><i class="fab fa-windows" style="color: #0078d4;"></i> {platform_formatted}</span>'
            elif platform_formatted == 'Mac':
                tags_html += f'<span class="tool-tag platform-tag" data-platform="{platform_formatted}"><i class="fab fa-apple" style="color: #000000;"></i> {platform_formatted}</span>'
            elif platform_formatted == 'Linux':
                tags_html += f'<span class="tool-tag platform-tag" data-platform="{platform_formatted}"><i class="fab fa-linux" style="color: #f47421;"></i> {platform_formatted}</span>'
            else:
                tags_html += f'<span class="tool-tag platform-tag" data-platform="{platform_formatted}">{platform_formatted}</span>'
        if entry.get('presentation'):
            presentation = entry.get('presentation', '')
            presentation_formatted = format_presentation(presentation)
            if presentation_formatted == 'GUI':
                tags_html += f'<span class="tool-tag presentation-tag" data-presentation="{presentation_formatted}"><i class="fas fa-window-maximize"></i> {presentation_formatted}</span>'
            elif presentation_formatted == 'CLI':
                tags_html += f'<span class="tool-tag presentation-tag" data-presentation="{presentation_formatted}"><i class="fas fa-terminal"></i> {presentation_formatted}</span>'
            else:
                tags_html += f'<span class="tool-tag presentation-tag" data-presentation="{presentation_formatted}">{presentation_formatted}</span>'
        if all_capabilities:
            for capability in sorted(all_capabilities):
                if capability == 'UAC':
                    tags_html += f'<span class="tool-tag capability-tag" data-capability="{capability}"><i class="fas fa-shield-alt" style="color: #194360;"></i> {capability}</span>'
                elif capability == 'MOTW':
                    tags_html += f'<span class="tool-tag capability-tag" data-capability="{capability}"><i class="fas fa-check-circle" style="color: #4CAF50;"></i> {capability}</span>'
                elif capability == 'File Explorer':
                    tags_html += f'<span class="tool-tag capability-tag" data-capability="{capability}"><i class="fas fa-folder" style="color: #FFA726;"></i> {capability}</span>'
                else:
                    tags_html += f'<span class="tool-tag capability-tag" data-capability="{capability}">{capability}</span>'
        
        # Get lure count text
        lure_text = config.get('lure_count_singular') if lure_count == 1 else config.get('lure_count_plural')
        
        tools_html += f'''
        <a href="pages/{entry['id']}.html" class="tool-item" data-id="{entry['id']}">
            <div class="tool-title">{entry.get('name', 'Unnamed Tool')}</div>
            <div class="tool-tags">
                {tags_html}
                <div class="tool-lure-count">{lure_count} {lure_text}</div>
            </div>
        </a>
        '''
    
    return tools_html

def generate_lures_html(entry: Dict[str, Any], config) -> str:
    """Generate lures HTML for an entry"""
    lures = entry.get('lures', [])
    lures_html = ""
    
    # Define colors for different lure cards
    lure_colors = [
        '#667eea',  # Blue
        '#f093fb',  # Pink
        '#f093fb',  # Purple
        '#4facfe',  # Light Blue
        '#43e97b',  # Green
        '#fa709a',  # Rose
        '#a8edea',  # Cyan
        '#fed6e3',  # Light Pink
        '#ffecd2',  # Orange
        '#fcb69f'   # Peach
    ]
    
    if lures:
        for i, lure in enumerate(lures):
            # Get color for this lure card
            color = lure_colors[i % len(lure_colors)]
            
            # Generate preamble HTML with proper line break handling
            preamble_html = ""
            if lure.get('preamble'):
                preamble_text = render_markdown(lure['preamble'])
                # Handle multiple newlines by converting to <br> tags
                preamble_text = preamble_text.replace('\n\n', '</p><p>').replace('\n', '<br>')
                preamble_html = f'<div class="lure-preamble">{preamble_text}</div>'
            
            # Generate epilogue HTML with proper line break handling
            epilogue_html = ""
            if lure.get('epilogue'):
                epilogue_text = render_markdown(lure['epilogue'])
                # Handle multiple newlines by converting to <br> tags
                epilogue_text = epilogue_text.replace('\n\n', '</p><p>').replace('\n', '<br>')
                epilogue_html = f'<div class="lure-epilogue">{epilogue_text}</div>'
            
            # Generate steps HTML with bold numbers on same line
            steps_html = ""
            if lure.get('steps'):
                for j, step in enumerate(lure['steps'], 1):
                    step_text = render_markdown(step)
                    # Remove <p> tags that Markdown might add
                    step_text = step_text.replace('<p>', '').replace('</p>', '')
                    # Add natural sentence spacing around <strong> tags
                    # step_text = step_text.replace('<strong>', ' <strong> ').replace('</strong>', '</strong> ')
                    # Clean up any double spaces and ensure proper sentence spacing
                    step_text = ' '.join(step_text.split())
                    # Ensure proper spacing after the number
                    steps_html += f'<li><strong>{j}.</strong> {step_text}</li>'
            else:
                steps_html = '<li><strong>1.</strong> No steps specified</li>'
            
            # Generate references HTML as unordered list
            references_html = ""
            if lure.get('references'):
                for ref in lure['references']:
                    references_html += f'<li><a href="{ref}" target="_blank">{ref}</a></li>'
            
            # Generate mitigations HTML as unordered list
            mitigations_html = ""
            if lure.get('mitigations'):
                for mitigation in lure['mitigations']:
                    mitigation_text = render_markdown(mitigation)
                    mitigations_html += f'<li>{mitigation_text}</li>'
            
            # Generate compact contributor HTML with tooltip
            contributor_html = generate_compact_contributor_html(lure.get('contributor'), i, lure)
            
            # Generate capabilities HTML for top-right of lure card
            capabilities_html = ""
            capabilities_list = []
            if lure.get('capabilities'):
                for capability in lure['capabilities']:
                    # Add Font Awesome icons for specific capabilities
                    icon_html = ""
                    if capability == "UAC":
                        icon_html = '<i class="fas fa-shield-alt" style="color: #000080;"></i>'
                    elif capability == "MOTW":
                        icon_html = '<i class="fas fa-check-circle" style="color: #28a745;"></i>'
                    elif capability == "File Explorer":
                        icon_html = '<i class="fas fa-folder" style="color: #FFA726;"></i>'
                    
                    capabilities_html += f'<span class="capability-tag">{icon_html} {capability}</span>'
                    capabilities_list.append(capability)
            
            # Prepare data attributes for copy functionality
            preamble_text = lure.get('preamble', '').replace('"', '&quot;').replace('\n', '\\n')
            epilogue_text = lure.get('epilogue', '').replace('"', '&quot;').replace('\n', '\\n')
            
            # Prepare steps text for copying
            steps_text = ""
            if lure.get('steps'):
                for j, step in enumerate(lure['steps'], 1):
                    steps_text += f"{j}. {step}\\n"
            else:
                steps_text = "1. No steps specified\\n"
            
            capabilities_text = ", ".join(capabilities_list)
            
            lures_html += f'''
            <div class="lure-item" style="border-left-color: {color};" 
                 data-nickname="{lure.get('nickname', 'Unnamed Lure')}"
                 data-preamble="{preamble_text}"
                 data-steps="{steps_text}"
                 data-epilogue="{epilogue_text}"
                 data-capabilities="{capabilities_text}">
                <div class="lure-header">
                    <h3 class="lure-name">{lure.get('nickname', 'Unnamed Lure')}</h3>
                    <div class="lure-capabilities">
                        {capabilities_html}
                    </div>
                </div>
                
                {preamble_html}
                
                <div class="lure-steps">
                    <ol class="steps-list">
                        {steps_html}
                    </ol>
                </div>
                
                {epilogue_html}
                
                {f'<div class="lure-references"><h4>References:</h4><ul class="references-list">{references_html}</ul></div>' if references_html else ''}
                
                {f'<div class="lure-mitigations"><h4>Mitigations:</h4><ul class="mitigations-list">{mitigations_html}</ul></div>' if mitigations_html else ''}
                
                <hr class="lure-divider">
                
                {contributor_html}
            </div>
            '''
    else:
        lures_html = '<p class="no-lures">No lures documented for this tool yet.</p>'
    
    return lures_html

def generate_contributor_html(contributor: Dict[str, Any]) -> str:
    """Generate contributor HTML"""
    if not contributor:
        return ""
    
    contributor_html = f'<div class="contributor">'
    contributor_html += f'<h4>Contributor:</h4>'
    contributor_html += f'<p class="contributor-name">{contributor.get("name", "Unknown")}'
    
    if contributor.get('handle'):
        contributor_html += f' <span class="handle">@{contributor["handle"]}</span>'
    
    contributor_html += '</p>'
    
    # Add contact links
    if contributor.get('contacts'):
        contacts_html = '<div class="contributor-contacts">'
        for platform, value in contributor['contacts'].items():
            if value:
                icon_class = f"icon-{platform}"
                contacts_html += f'<a href="{get_contact_url(platform, value)}" class="contact-link {icon_class}" target="_blank" title="{platform.title()}"></a>'
        contacts_html += '</div>'
        contributor_html += contacts_html
    
    contributor_html += '</div>'
    return contributor_html

def generate_compact_contributor_html(contributor: Dict[str, Any], lure_index: int, lure: Dict[str, Any]) -> str:
    """Generate compact contributor HTML for bottom of lure cards with tooltip"""
    if not contributor:
        return ""
    
    contributor_html = f'<div class="lure-contributor">'
    contributor_html += f'<span class="contributor-label">Contributor:</span> '
    contributor_html += f'<span class="contributor-name" onclick="toggleContributorContacts({lure_index})">{contributor.get("name", "Unknown")}'
    
    if contributor.get('handle'):
        contributor_html += f' (@{contributor["handle"]})'
    
    contributor_html += '</span>'
    
    # Add added date if available
    if lure.get('added_at'):
        contributor_html += f' <span class="contributor-date">({lure["added_at"]})</span>'
    
    # Add contact links with Font Awesome icons in tooltip
    if contributor.get('contacts'):
        contacts_html = f'<div class="contributor-contacts" id="contributor-contacts-{lure_index}">'
        for platform, value in contributor['contacts'].items():
            if value:
                icon_class = get_contact_icon_class(platform)
                contacts_html += f'<a href="{get_contact_url(platform, value)}" class="contact-link" target="_blank" title="{platform.title()}"><i class="{icon_class}"></i></a>'
        contacts_html += '</div>'
        contributor_html += contacts_html
    
    contributor_html += '</div>'
    return contributor_html

def get_contact_icon_class(platform: str) -> str:
    """Get Font Awesome icon class for contact platform"""
    icon_map = {
        'linkedin': 'fab fa-linkedin',
        'twitter': 'fab fa-twitter',
        'youtube': 'fab fa-youtube',
        'github': 'fab fa-github',
        'facebook': 'fab fa-facebook',
        'email': 'fas fa-envelope',
        'instagram': 'fab fa-instagram',
        'website': 'fas fa-globe'
    }
    return icon_map.get(platform.lower(), 'fas fa-link')

def generate_tags_html(entry: Dict[str, Any]) -> str:
    """Generate tags HTML for an entry"""
    all_capabilities = get_all_capabilities(entry)
    
    tags_html = ""
    if all_capabilities:
        for capability in sorted(all_capabilities):
            tags_html += f'<span class="tool-tag">{capability}</span>'
    
    # Add platform and presentation tags
    platform_tag = f'<span class="tool-tag platform-tag">{format_platform(entry.get("platform", ""))}</span>'
    presentation_tag = f'<span class="tool-tag presentation-tag">{format_presentation(entry.get("presentation", ""))}</span>'
    tags_html = platform_tag + presentation_tag + tags_html
    
    return tags_html 