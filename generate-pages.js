#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple YAML parser (same as in the HTML)
function parseYAML(yamlText) {
    const lines = yamlText.split('\n');
    const result = {};
    let currentKey = null;
    let currentArray = null;

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

// Read template
function readTemplate() {
    return fs.readFileSync('technique-template.html', 'utf8');
}

// Generate HTML for a technique
function generateTechniquePage(technique) {
    let template = readTemplate();
    
    // Replace placeholders
    template = template.replace(/{{TITLE}}/g, technique.title);
    template = template.replace(/{{DESCRIPTION}}/g, technique.description);
            template = template.replace(/{{SEVERITY}}/g, technique.severity);
        template = template.replace(/{{SEVERITY_UPPER}}/g, technique.severity.toUpperCase());
    template = template.replace(/{{CATEGORY}}/g, technique.category);
    
    // Generate tags HTML
    const tagsHtml = technique.tags ? 
        technique.tags.map(tag => `<span class="technique-tag">${tag}</span>`).join('') : '';
    template = template.replace(/{{TAGS}}/g, tagsHtml);
    
    // Generate IoCFs HTML
    const iocfsHtml = technique.iocfs ? 
        technique.iocfs.map(iocf => `<li>${iocf}</li>`).join('') : '';
    template = template.replace(/{{IOCFS}}/g, iocfsHtml);
    
    // Generate examples HTML
    const examplesHtml = technique.examples ? 
        technique.examples.map(example => `<li>${example}</li>`).join('') : '';
    template = template.replace(/{{EXAMPLES}}/g, examplesHtml);
    
    // Generate prevention HTML
    const preventionHtml = technique.prevention ? 
        technique.prevention.map(tip => `<li>${tip}</li>`).join('') : '';
    template = template.replace(/{{PREVENTION}}/g, preventionHtml);
    
    return template;
}

// Generate all technique pages
function generateAllPages() {
    const techniquesDir = 'techniques';
    const pagesDir = 'pages';
    
    // Create pages directory if it doesn't exist
    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir);
    }
    
    // Read all YAML files
    const files = fs.readdirSync(techniquesDir).filter(file => file.endsWith('.yaml'));
    
    console.log(`Generating pages for ${files.length} techniques...`);
    
    files.forEach(file => {
        const yamlPath = path.join(techniquesDir, file);
        const yamlContent = fs.readFileSync(yamlPath, 'utf8');
        const technique = parseYAML(yamlContent);
        
        // Generate HTML
        const html = generateTechniquePage(technique);
        
        // Write to file
        const pageName = file.replace('.yaml', '.html');
        const pagePath = path.join(pagesDir, pageName);
        fs.writeFileSync(pagePath, html);
        
        console.log(`Generated: ${pageName}`);
    });
    
    // Update the index file
    try {
        const indexPath = path.join(techniquesDir, 'index.txt');
        const indexContent = files.join('\n');
        fs.writeFileSync(indexPath, indexContent);
        console.log('Updated techniques/index.txt');
    } catch (error) {
        console.warn('Could not update index file:', error.message);
    }
    
    console.log('All pages generated successfully!');
}

// Run the generator
generateAllPages(); 