// ClickFix Wiki - Main JavaScript

// Simple YAML parser
function parseYAML(yamlText) {
    const lines = yamlText.split('\n');
    const result = {};
    let currentKey = null;
    let currentArray = null;
    let indentLevel = 0;

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('#')) continue;

        // Check if this is a key-value pair
        if (line.includes(':') && !line.startsWith('-')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            if (value === '') {
                // This is a key with no value (likely an array or object)
                currentKey = key;
                currentArray = null;
                result[key] = [];
            } else {
                // This is a simple key-value pair
                result[key] = value;
                currentKey = null;
                currentArray = null;
            }
        } else if (line.startsWith('-')) {
            // This is an array item
            const item = line.substring(1).trim();
            if (currentArray) {
                currentArray.push(item);
            } else if (currentKey) {
                result[currentKey].push(item);
            }
        }
    }

    return result;
}

// Tag categories
const tagCategories = {
    os: ['Windows', 'Mac', 'Linux'],
    capabilities: ['Run Command', 'Open File Explorer', 'Clear Mark of The Web', 'UAC'],
    other: ['GUI', 'CLI']
};

// Selected filters
let selectedFilters = {
    os: [],
    capabilities: [],
    other: []
};

// Load techniques from YAML files dynamically
async function loadTechniques() {
    const techniques = [];

    try {
        // Try to load the index file first
        let techniqueFiles = [];
        
        try {
            const indexResponse = await fetch('techniques/index.txt');
            if (indexResponse.ok) {
                const indexText = await indexResponse.text();
                techniqueFiles = indexText.trim().split('\n').map(filename => 
                    `techniques/${filename.trim()}`
                ).filter(filename => filename.endsWith('.yaml'));
                console.log(`Loaded ${techniqueFiles.length} files from index.txt`);
            }
        } catch (indexError) {
            console.warn('Could not load index.txt:', indexError);
        }
        
        // If we couldn't load the index, use a fallback approach
        if (techniqueFiles.length === 0) {
            console.log('No index file found, using fallback approach');
            // Try common YAML files that might exist
            const commonFiles = [
                'techniques/cmd.yaml',
                'techniques/powershell.yaml',
                'techniques/regedit.yaml'
            ];
            
            // Test which files exist by trying to fetch them
            for (const file of commonFiles) {
                try {
                    const testResponse = await fetch(file, { method: 'HEAD' });
                    if (testResponse.ok) {
                        techniqueFiles.push(file);
                    }
                } catch (e) {
                    // File doesn't exist or can't be accessed
                }
            }
        }
        
        console.log(`Found ${techniqueFiles.length} YAML files to load`);
        
        // Load all found YAML files
        for (const file of techniqueFiles) {
            try {
                const response = await fetch(file, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Accept': 'text/plain'
                    }
                });
                
                if (response.ok) {
                    const yamlText = await response.text();
                    const technique = parseYAML(yamlText);
                    // Add the ID from the filename
                    technique.id = file.replace('techniques/', '').replace('.yaml', '');
                    techniques.push(technique);
                    console.log(`Successfully loaded ${file}`);
                } else {
                    console.warn(`Failed to load ${file}: ${response.status} ${response.statusText}`);
                }
            } catch (fileError) {
                console.warn(`Error loading ${file}:`, fileError);
            }
        }
        
        if (techniques.length === 0) {
            console.warn('No YAML files loaded, using fallback data');
            return getFallbackTechniques();
        }
        
        return techniques;
    } catch (error) {
        console.error('Error loading techniques:', error);
        // Fallback to hardcoded data if YAML loading fails
        return getFallbackTechniques();
    }
}

// Fallback techniques if YAML loading fails
function getFallbackTechniques() {
    return [
        {
            id: 'cmd',
            title: 'Command Prompt (cmd.exe)',
            description: 'Windows command-line interpreter for executing commands and batch files.',
            category: 'command-line',
            tags: ['Windows', 'CLI', 'Command Line', 'System Tools']
        },
        {
            id: 'powershell',
            title: 'PowerShell (powershell.exe)',
            description: 'Advanced command-line shell and scripting language for Windows.',
            category: 'command-line',
            tags: ['Windows', 'CLI', 'Scripting', 'System Administration']
        },
        {
            id: 'regedit',
            title: 'Registry Editor (regedit.exe)',
            description: 'Windows registry editor for viewing and modifying system registry.',
            category: 'system-tools',
            tags: ['Windows', 'GUI', 'Registry', 'System Configuration']
        }
    ];
}

// Helper function to get tag type for CSS targeting
function getTagType(tag) {
    const osTags = ['Windows', 'Mac', 'Linux'];
    const typeTags = ['GUI', 'CLI'];
    const categoryTags = ['Email', 'Web Browser'];
    
    if (osTags.includes(tag)) {
        return 'os';
    } else if (typeTags.includes(tag)) {
        return 'type';
    } else if (categoryTags.includes(tag)) {
        return 'category';
    }
    return 'other';
}

// Populate filter tags
function populateFilterTags() {
    // OS tags
    const osTagsContainer = document.getElementById('osTags');
    tagCategories.os.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.textContent = tag;
        tagElement.onclick = () => toggleFilter('os', tag, tagElement);
        osTagsContainer.appendChild(tagElement);
    });

    // Capability tags
    const capabilityTagsContainer = document.getElementById('capabilityTags');
    tagCategories.capabilities.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.textContent = tag;
        tagElement.onclick = () => toggleFilter('capabilities', tag, tagElement);
        capabilityTagsContainer.appendChild(tagElement);
    });

    // Other tags
    const otherTagsContainer = document.getElementById('otherTags');
    tagCategories.other.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.textContent = tag;
        tagElement.onclick = () => toggleFilter('other', tag, tagElement);
        otherTagsContainer.appendChild(tagElement);
    });
}

// Toggle filter selection
function toggleFilter(category, tag, element) {
    const index = selectedFilters[category].indexOf(tag);
    if (index > -1) {
        selectedFilters[category].splice(index, 1);
        element.classList.remove('selected');
    } else {
        selectedFilters[category].push(tag);
        element.classList.add('selected');
    }
    applyFilters();
}

// Apply all filters
function applyFilters() {
    const searchTerm = document.getElementById('searchBox').value;
    filterTechniques(searchTerm);
}

// Clear all filters
function clearAllFilters() {
    selectedFilters = {
        os: [],
        capabilities: [],
        other: []
    };
    
    // Remove selected class from all filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    applyFilters();
}

// Render techniques
function renderTechniques(techniquesToRender) {
    const grid = document.getElementById('techniquesGrid');
    const noResults = document.getElementById('noResults');
    const loading = document.getElementById('loading');
    
    loading.style.display = 'none';
    
    if (techniquesToRender.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        grid.innerHTML = techniquesToRender.map(technique => {
            const tags = technique.tags ? technique.tags.map(tag => {
                const tagType = getTagType(tag);
                return `<span class="technique-tag" data-${tagType}="${tag}">${tag}</span>`;
            }).join('') : '';
            
            return `
                <a href="pages/${technique.id}.html" class="technique-item" data-id="${technique.id}">
                    <div class="technique-title">${technique.title}</div>
                    <div class="technique-meta">
                        ${tags}
                    </div>
                </a>
            `;
        }).join('');
    }
}

// Search and filter functionality
function filterTechniques(searchTerm) {
    if (!window.allTechniques) return;
    
    let filtered = window.allTechniques;

    // Apply search filter
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(technique => (
            technique.title.toLowerCase().includes(searchLower) ||
            technique.description.toLowerCase().includes(searchLower) ||
            (technique.iocfs && technique.iocfs.some(iocf => iocf.toLowerCase().includes(searchLower)))
        ));
    }

    // Apply tag filters
    const allSelectedTags = [
        ...selectedFilters.os,
        ...selectedFilters.capabilities,
        ...selectedFilters.other
    ];

    if (allSelectedTags.length > 0) {
        filtered = filtered.filter(technique => {
            if (!technique.tags) return false;
            return allSelectedTags.every(selectedTag => 
                technique.tags.includes(selectedTag)
            );
        });
    }

    renderTechniques(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const techniques = await loadTechniques();
    window.allTechniques = techniques;
    
    // Populate filter tags
    populateFilterTags();
    
    // Set up clear filters button
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
    
    renderTechniques(techniques);

    // Search functionality
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', (e) => {
        filterTechniques(e.target.value);
    });
}); 