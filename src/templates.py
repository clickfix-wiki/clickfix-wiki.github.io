"""
ClickFix Wiki Templates
Contains all HTML templates used by the build system
"""

def get_index_template(config):
    """Get the index.html template"""
    return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>''' + config.get('title', 'ClickFix Wiki') + ''' - ''' + config.get('tagline', 'Code execution by social engineering instructions') + '''</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="script.js"></script>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>ClickFix Wiki</h1>
            <p>Code execution by social engineering instructions</p>
        </div>
    </div>

    <div class="container">
        <nav class="site-navigation">
            {{NAVIGATION_HTML}}
        </nav>
        <div class="search-section">
            <input type="text" class="search-box" id="searchBox" placeholder="''' + config.get('search_prompt', 'Search tools, lures, or capabilities...') + '''">
        </div>

        <div class="filter-section">
            <div class="filter-title">''' + config.get('filter_label', 'Filter') + ''':</div>
            
            <div class="filter-groups">
                <div class="filter-group">
                    <div class="filter-group-title">Platform</div>
                    <div class="filter-tags" id="platformTags">
                        <div class="filter-tag" data-platform="Windows" onclick="toggleFilter('platform', 'Windows', this)">Windows</div>
                        <div class="filter-tag" data-platform="Mac" onclick="toggleFilter('platform', 'Mac', this)">Mac</div>
                        <div class="filter-tag" data-platform="Linux" onclick="toggleFilter('platform', 'Linux', this)">Linux</div>
                    </div>
                </div>

                <div class="filter-group">
                    <div class="filter-group-title">Interface</div>
                    <div class="filter-tags" id="presentationTags">
                        <div class="filter-tag" data-presentation="GUI" onclick="toggleFilter('presentation', 'GUI', this)"><i class="fas fa-window-maximize"></i> GUI</div>
                        <div class="filter-tag" data-presentation="CLI" onclick="toggleFilter('presentation', 'CLI', this)"><i class="fas fa-terminal"></i> CLI</div>
                    </div>
                </div>

                <div class="filter-group">
                    <div class="filter-group-title">Capabilities</div>
                    <div class="filter-tags" id="capabilityTags">
                        <div class="filter-tag" data-capability="UAC" onclick="toggleFilter('capability', 'UAC', this)"><i class="fas fa-shield-alt" style="color: #194360;"></i> UAC</div>
                        <div class="filter-tag" data-capability="MOTW" onclick="toggleFilter('capability', 'MOTW', this)"><i class="fas fa-check-circle" style="color: #4CAF50;"></i> MOTW</div>
                        <div class="filter-tag" data-capability="File Explorer" onclick="toggleFilter('capability', 'File Explorer', this)"><i class="fas fa-folder" style="color: #FFA726;"></i> File Explorer</div>
                    </div>
                </div>
            </div>

            <button class="clear-filters" id="clearFilters">''' + config.get('clear_filter_button_label', 'Clear All Filters') + '''</button>
        </div>

        ''' + ('''<div class="stats">
            <span id="totalTools">{{TOTAL_TOOLS}}</span> tools documented • 
            <span id="visibleTools">{{TOTAL_TOOLS}}</span> currently visible
        </div>''' if config.get('show_count', True) else '') + '''

        <div class="tools-list" id="toolsGrid">
            {{TOOLS_HTML}}
        </div>

        <div class="no-results" id="noResults" style="display: none;">
            <h3>No tools found</h3>
            <p>Try adjusting your search terms</p>
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <p>Documenting Windows system tools for educational and legitimate system administration purposes</p>
        </div>
    </div>
</body>
</html>'''

def get_entry_template(config):
    """Get the entry page template"""
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - {config.get('title')}</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>ClickFix Wiki</h1>
            <p>Code execution by social engineering instructions</p>
        </div>
    </div>

    <div class="container">
        <nav class="site-navigation">
            {{NAVIGATION_HTML}}
        </nav>
        <a href="../index.html" class="back-link">{config.get('back_to_tools')}</a>

        <div class="tool-header">
            <h1 class="tool-title">{{TITLE}}</h1>
            <div class="tool-info">
                <span class="added-date">Added: {{ADDED_AT}}</span>
            </div>
            <div class="tool-meta">
                <span class="tool-tag platform-tag">{{PLATFORM}}</span>
                <span class="tool-tag presentation-tag">{{PRESENTATION}}</span>
            </div>
            <div class="tool-tags">
                {{TAGS}}
            </div>
        </div>

        <div class="lures-section">
            <h2 class="section-title">{config.get('lures_section_title')}</h2>
            {{LURES}}
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <p>Documenting Windows system tools for educational and legitimate system administration purposes</p>
        </div>
    </div>
</body>
</html>''' 