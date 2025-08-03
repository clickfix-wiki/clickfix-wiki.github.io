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

// Copy lure link to clipboard
function copyLureLink(event, anchorId) {
    event.preventDefault();
    
    // Get the current URL and add the anchor
    const currentUrl = window.location.href.split('#')[0];
    const linkUrl = `${currentUrl}#${anchorId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(linkUrl).then(() => {
        // Find the lure item
        const lureItem = event.target.closest('.lure-item');
        if (lureItem) {
            // Show notification
            showCopyNotification(lureItem, 'Copied link!');
            
            // Add copied animation
            lureItem.classList.add('copied');
            setTimeout(() => {
                lureItem.classList.remove('copied');
            }, 600);
        }
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
}

// Copy lure content to clipboard
function copyLureContent(lureItem) {
    // Extract lure data from data attributes
    const lureData = {
        nickname: lureItem.getAttribute('data-nickname') || 'Unnamed Lure',
        preamble: lureItem.getAttribute('data-preamble') || '',
        steps: lureItem.getAttribute('data-steps') || '',
        epilogue: lureItem.getAttribute('data-epilogue') || ''
    };
    
    // Build the text content to copy
    let textToCopy = `${lureData.nickname}\n\n`;
    
    if (lureData.preamble) {
        // Convert escaped newlines to real newlines
        const preambleText = lureData.preamble.replace(/\\n/g, '\n');
        textToCopy += `${preambleText}\n\n`;
    }
    
    if (lureData.steps) {
        // Convert escaped newlines to real newlines
        const stepsText = lureData.steps.replace(/\\n/g, '\n');
        textToCopy += `${stepsText}\n\n`;
    }
    
    if (lureData.epilogue) {
        // Convert escaped newlines to real newlines
        const epilogueText = lureData.epilogue.replace(/\\n/g, '\n');
        textToCopy += `${epilogueText}\n`;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show copied animation
        lureItem.classList.add('copied');
        
        // Show notification
        showCopyNotification(lureItem, 'Copied text!');
        
        // Remove copied class after animation
        setTimeout(() => {
            lureItem.classList.remove('copied');
        }, 600);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(textToCopy, lureItem);
    });
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, lureItem) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        lureItem.classList.add('copied');
        showCopyNotification(lureItem, 'Copied text!');
        setTimeout(() => {
            lureItem.classList.remove('copied');
        }, 600);
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification(lureItem, message = 'Copied!') {
    // Remove existing notification if any
    const existingNotification = lureItem.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    lureItem.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 2000);
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
    
    // Set up lure card click handlers
    const lureItems = document.querySelectorAll('.lure-item');
    lureItems.forEach(lureItem => {
        lureItem.addEventListener('click', (event) => {
            // If clicking on the lure link/heading, copy the link
            if (event.target.closest('.lure-link')) {
                const anchorId = lureItem.getAttribute('data-anchor');
                if (anchorId) {
                    copyLureLink(event, anchorId);
                }
                return;
            }
            // Otherwise copy the lure content
            copyLureContent(lureItem);
        });
    });
}); 