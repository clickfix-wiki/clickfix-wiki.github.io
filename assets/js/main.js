// Main JavaScript file for ClickFix Wiki

document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initSearch();
    
    // Initialize filters
    initFilters();
    
    // Initialize copy functionality for code blocks
    initCopyButtons();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const entries = document.querySelectorAll('.yml-entry');
        
        entries.forEach(entry => {
            const text = entry.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                entry.style.display = 'block';
            } else {
                entry.style.display = 'none';
            }
        });
    });
}

// Filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            const value = this.dataset.value;
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Apply filters
            applyFilters();
        });
    });
}

function applyFilters() {
    const activeFilters = document.querySelectorAll('.filter-button.active');
    const entries = document.querySelectorAll('.yml-entry');
    
    entries.forEach(entry => {
        let shouldShow = true;
        
        activeFilters.forEach(filter => {
            const filterType = filter.dataset.filter;
            const filterValue = filter.dataset.value;
            
            // Check if entry matches filter
            const matches = checkFilterMatch(entry, filterType, filterValue);
            if (!matches) {
                shouldShow = false;
            }
        });
        
        entry.style.display = shouldShow ? 'block' : 'none';
    });
}

function checkFilterMatch(entry, filterType, filterValue) {
    switch (filterType) {
        case 'platform':
            const platforms = entry.querySelectorAll('.platform-tag');
            return Array.from(platforms).some(tag => tag.textContent === filterValue);
        case 'interface':
            const interfaces = entry.querySelectorAll('.interface-tag');
            return Array.from(interfaces).some(tag => tag.textContent === filterValue);
        case 'category':
            const categories = entry.querySelectorAll('.categories');
            return Array.from(categories).some(cat => cat.textContent.includes(filterValue));
        default:
            return true;
    }
}

// Copy functionality for code blocks
function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.5rem;
            background: #0366d6;
            color: white;
            border: none;
            border-radius: 3px;
            font-size: 0.8rem;
            cursor: pointer;
        `;
        
        const container = block.closest('pre');
        if (container) {
            container.style.position = 'relative';
            container.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                copyToClipboard(block.textContent);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
        }
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme toggle (if needed)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme toggle
initThemeToggle(); 