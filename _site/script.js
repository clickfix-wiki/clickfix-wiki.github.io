// ClickFix Wiki - Static JavaScript for search and filtering

// Tag categories for tools
const tagCategories = {
    platform: ['Windows', 'Mac', 'Linux'],
    presentation: ['GUI', 'CLI'],
    capability: ['UAC', 'MOTW', 'File Explorer', 'Registry', 'PowerShell', 'Command Line', 'Network Access', 'System Information', 'Process Management', 'File System Access']
};

// Selected filters
let selectedFilters = {
    platform: [],
    presentation: [],
    capability: []
};

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
        platform: [],
        presentation: [],
        capability: []
    };
    
    // Remove selected class from all filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    applyFilters();
}

// Search and filter functionality
function filterTools(searchTerm) {
    const toolItems = document.querySelectorAll('.tool-item');
    let visibleCount = 0;
    
    toolItems.forEach(item => {
        const title = item.querySelector('.tool-title').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.tool-tag')).map(tag => {
            // Get the data attribute value instead of text content
            return tag.getAttribute('data-platform') || 
                   tag.getAttribute('data-presentation') || 
                   tag.getAttribute('data-capability') || 
                   tag.textContent.trim();
        });
        
        // Check search term
        let matchesSearch = true;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            matchesSearch = title.includes(searchLower);
        }
        
        // Check tag filters
        let matchesFilters = true;
        const allSelectedTags = [
            ...selectedFilters.platform,
            ...selectedFilters.presentation,
            ...selectedFilters.capability
        ];
        
        if (allSelectedTags.length > 0) {
            matchesFilters = allSelectedTags.every(selectedTag => 
                tags.includes(selectedTag)
            );
        }
        
        // Show/hide based on filters
        if (matchesSearch && matchesFilters) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update visible count
    document.getElementById('visibleTools').textContent = visibleCount;
    
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set up clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Search functionality
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            filterTools(e.target.value);
        });
    }
    
    // Initialize with all tools visible
    const totalTools = document.querySelectorAll('.tool-item').length;
    document.getElementById('totalTools').textContent = totalTools;
    document.getElementById('visibleTools').textContent = totalTools;
}); 