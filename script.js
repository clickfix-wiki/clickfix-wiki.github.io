// Parse YAML content
function parseYAML(yamlText) {
    const lines = yamlText.split('\n');
    const result = {};
    let currentTechnique = null;
    let currentTechniqueKey = null;
    let inTechniques = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) continue;

        // Get indentation level
        const indentLevel = line.length - line.trimStart().length;

        // Handle key-value pairs
        if (trimmedLine.includes(':') && !trimmedLine.startsWith('-')) {
            const colonIndex = trimmedLine.indexOf(':');
            const key = trimmedLine.substring(0, colonIndex).trim();
            const value = trimmedLine.substring(colonIndex + 1).trim();
            
            if (value === '') {
                // Empty value - initialize array
                result[key] = [];
                if (key === 'Techniques') {
                    inTechniques = true;
                }
            } else {
                // Has value
                if (value.startsWith('[') && value.endsWith(']')) {
                    // Array format like Tags: ["Windows", "CLI"]
                    const arrayContent = value.substring(1, value.length - 1);
                    result[key] = arrayContent.split(',').map(item => 
                        item.trim().replace(/"/g, '')
                    ).filter(item => item.length > 0);
                } else {
                    result[key] = value.replace(/"/g, '');
                }
            }
        } else if (trimmedLine.startsWith('-')) {
            // Array item
            const item = trimmedLine.substring(1).trim();
            
            if (inTechniques && indentLevel === 2) {
                // Start of a new technique
                currentTechnique = {};
                result.Techniques.push(currentTechnique);
                currentTechniqueKey = null;
                
                // Parse the technique name if it's on the same line
                if (item.includes('Name:')) {
                    const colonIndex = item.indexOf(':');
                    const value = item.substring(colonIndex + 1).trim();
                    currentTechnique.Name = value.replace(/"/g, '');
                }
                
                // Look ahead for technique properties
                let j = i + 1;
                while (j < lines.length) {
                    const nextLine = lines[j];
                    const nextTrimmed = nextLine.trim();
                    const nextIndent = nextLine.length - nextLine.trimStart().length;
                    
                    if (nextIndent === 0) {
                        // Back to root level
                        break;
                    } else if (nextIndent === 2 && nextTrimmed.startsWith('-')) {
                        // Next technique starts
                        break;
                    } else if (nextIndent === 4 && nextTrimmed.includes(':')) {
                        // Technique property
                        const colonIndex = nextTrimmed.indexOf(':');
                        const key = nextTrimmed.substring(0, colonIndex).trim();
                        const value = nextTrimmed.substring(colonIndex + 1).trim();
                        currentTechnique[key] = value.replace(/"/g, '');
                        currentTechniqueKey = key;
                        
                        if (key === 'Steps' || key === 'References') {
                            // Initialize array
                            currentTechnique[key] = [];
                        }
                    } else if (nextIndent === 6 && nextTrimmed.startsWith('-')) {
                        // Array item for Steps or References
                        const arrayItem = nextTrimmed.substring(1).trim();
                        if (currentTechniqueKey === 'Steps') {
                            currentTechnique.Steps.push(arrayItem.replace(/"/g, ''));
                        } else if (currentTechniqueKey === 'References') {
                            currentTechnique.References.push(arrayItem.replace(/"/g, ''));
                        }
                    }
                    j++;
                }
            }
        }
    }

    return result;
}

// Tag categories for tools
const tagCategories = {
    os: ['Windows', 'Linux', 'macOS'],
    interface: ['CLI', 'GUI'],
    function: ['Command Line', 'Scripting', 'System Tools', 'Registry', 'System Configuration', 'Networking', 'Security', 'File Management', 'Process Management', 'Network Tools', 'Security Tools', 'Development Tools']
};

// Selected filters
let selectedFilters = {
    os: [],
    interface: [],
    function: []
};

// Load tools from YAML files dynamically
async function loadTools() {
    const tools = [];

    try {
        // Try to load the index file first
        let toolFiles = [];
        
        try {
            const indexResponse = await fetch('techniques/index.txt');
            if (indexResponse.ok) {
                const indexText = await indexResponse.text();
                toolFiles = indexText.trim().split('\n').map(filename => 
                    `techniques/${filename.trim()}`
                ).filter(filename => filename.endsWith('.yaml'));
                console.log(`Loaded ${toolFiles.length} files from index.txt`);
            }
        } catch (indexError) {
            console.warn('Could not load index.txt:', indexError);
        }
        
        // If we couldn't load the index, use a fallback approach
        if (toolFiles.length === 0) {
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
                        toolFiles.push(file);
                    }
                } catch (e) {
                    // File doesn't exist or can't be accessed
                }
            }
        }
        
        console.log(`Found ${toolFiles.length} YAML files to load`);
        
        // Load all found YAML files
        for (const file of toolFiles) {
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
                    const tool = parseYAML(yamlText);
                    // Add the ID from the filename
                    tool.id = file.replace('techniques/', '').replace('.yaml', '');
                    tools.push(tool);
                    console.log(`Successfully loaded ${file}`);
                } else {
                    console.warn(`Failed to load ${file}: ${response.status} ${response.statusText}`);
                }
            } catch (fileError) {
                console.warn(`Error loading ${file}:`, fileError);
            }
        }
        
        return tools;
    } catch (error) {
        console.error('Error loading tools:', error);
        return [];
    }
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

    // Interface tags
    const interfaceTagsContainer = document.getElementById('interfaceTags');
    tagCategories.interface.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.textContent = tag;
        tagElement.onclick = () => toggleFilter('interface', tag, tagElement);
        interfaceTagsContainer.appendChild(tagElement);
    });

    // Function tags
    const functionTagsContainer = document.getElementById('functionTags');
    tagCategories.function.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.textContent = tag;
        tagElement.onclick = () => toggleFilter('function', tag, tagElement);
        functionTagsContainer.appendChild(tagElement);
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
    filterTools(searchTerm);
}

// Clear all filters
function clearAllFilters() {
    selectedFilters = {
        os: [],
        interface: [],
        function: []
    };
    
    // Remove selected class from all filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    applyFilters();
}

// Render tools
function renderTools(toolsToRender) {
    const grid = document.getElementById('toolsGrid');
    const noResults = document.getElementById('noResults');
    const loading = document.getElementById('loading');
    
    loading.style.display = 'none';
    
    if (toolsToRender.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        grid.innerHTML = toolsToRender.map(tool => `
            <a href="pages/${tool.id}.html" class="tool-item" data-id="${tool.id}">
                <div class="tool-title">${tool.Name}</div>
                <div class="tool-meta">
                    <span class="category">${tool.Category}</span>
                    ${tool.Tags ? tool.Tags.map(tag => {
                        const isOSTag = ['Windows', 'Linux', 'macOS'].includes(tag);
                        return `<span class="tool-tag"${isOSTag ? ` data-tag="${tag}"` : ''}>${tag}</span>`;
                    }).join('') : ''}
                </div>
            </a>
        `).join('');
    }

    // Update stats
    document.getElementById('totalTools').textContent = window.allTools ? window.allTools.length : 0;
    document.getElementById('visibleTools').textContent = toolsToRender.length;
}

// Search and filter functionality
function filterTools(searchTerm) {
    if (!window.allTools) return;
    
    let filtered = window.allTools;

    // Apply search filter
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(tool => (
            tool.Name.toLowerCase().includes(searchLower) ||
            tool.Description.toLowerCase().includes(searchLower) ||
            (tool.Techniques && tool.Techniques.some(technique => 
                technique.Name.toLowerCase().includes(searchLower) ||
                technique.Description.toLowerCase().includes(searchLower)
            ))
        ));
    }

    // Apply tag filters
    const allSelectedTags = [
        ...selectedFilters.os,
        ...selectedFilters.interface,
        ...selectedFilters.function
    ];

    if (allSelectedTags.length > 0) {
        filtered = filtered.filter(tool => {
            if (!tool.Tags) return false;
            return allSelectedTags.every(selectedTag => 
                tool.Tags.includes(selectedTag)
            );
        });
    }

    renderTools(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const tools = await loadTools();
    window.allTools = tools;
    
    // Populate filter tags
    populateFilterTags();
    
    // Set up clear filters button
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
    
    renderTools(tools);

    // Search functionality
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', (e) => {
        filterTools(e.target.value);
    });
}); 