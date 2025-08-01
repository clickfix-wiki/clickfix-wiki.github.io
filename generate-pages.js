#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Enhanced YAML parser for the new structure
function parseYAML(yamlText) {
    const lines = yamlText.split('\n');
    const result = {};
    let currentKey = null;
    let currentArray = null;
    let currentObject = null;
    let inTechnique = false;
    let techniqueIndex = -1;

    for (let line of lines) {
        const originalLine = line;
        line = line.trim();
        if (!line || line.startsWith('#')) continue;

        // Check indentation level
        const indentLevel = originalLine.length - originalLine.trimStart().length;

        // Check if this is a key-value pair
        if (line.includes(':') && !line.startsWith('-')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            if (value === '') {
                // This is a key with no value (likely an array or object)
                currentKey = key;
                currentArray = null;
                currentObject = null;
                
                if (key === 'Techniques') {
                    result[key] = [];
                    inTechnique = true;
                } else {
                    result[key] = [];
                }
            } else {
                // This is a simple key-value pair
                if (inTechnique && currentObject) {
                    currentObject[key] = value;
                } else {
                    result[key] = value;
                }
                currentKey = null;
                currentArray = null;
            }
        } else if (line.startsWith('-')) {
            // This is an array item
            const item = line.substring(1).trim();
            
            if (inTechnique && indentLevel > 0) {
                // This is a technique item
                if (indentLevel === 2) {
                    // New technique
                    currentObject = { Name: item };
                    result.Techniques.push(currentObject);
                    techniqueIndex++;
                } else if (indentLevel === 4) {
                    // Technique property
                    if (currentObject) {
                        currentObject[item] = [];
                        currentKey = item;
                    }
                } else if (indentLevel === 6) {
                    // Array item within technique
                    if (currentKey && currentObject) {
                        currentObject[currentKey].push(item);
                    }
                }
            } else {
                // Regular array item
                if (currentArray) {
                    currentArray.push(item);
                } else if (currentKey) {
                    result[currentKey].push(item);
                }
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
    
    // Replace basic placeholders
    template = template.replace(/{{TITLE}}/g, technique.Name || 'Unknown Technique');
    template = template.replace(/{{DESCRIPTION}}/g, technique.Description || '');
    template = template.replace(/{{CATEGORY}}/g, technique.Category || '');
    template = template.replace(/{{AUTHOR}}/g, technique.Author || 'ClickFix Wiki');
    template = template.replace(/{{CREATED}}/g, technique.Created || '');
    
    // Generate tags HTML with proper data attributes
    const tagsHtml = technique.Tags ? 
        technique.Tags.map(tag => {
            const tagType = getTagType(tag);
            return `<span class="technique-tag" data-${tagType}="${tag}">${tag}</span>`;
        }).join('') : '';
    template = template.replace(/{{TAGS}}/g, tagsHtml);
    
    // Generate techniques HTML
    const techniquesHtml = technique.Techniques ? 
        technique.Techniques.map((tech, index) => {
            const isEven = index % 2 === 0;
            const groupClass = isEven ? 'even' : 'odd';
            
            let stepsHtml = '';
            if (tech.Steps) {
                stepsHtml = `
                    <div class="technique-steps">
                        <h4>Steps:</h4>
                        <ol class="steps-list">
                            ${tech.Steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                `;
            }
            
            let prerequisitesHtml = '';
            if (tech.Prerequisites) {
                prerequisitesHtml = `
                    <div class="technique-prerequisites">
                        <h4>Prerequisites:</h4>
                        <p>${tech.Prerequisites}</p>
                    </div>
                `;
            }
            
            let referencesHtml = '';
            if (tech.References) {
                referencesHtml = `
                    <div class="technique-references">
                        <h4>References:</h4>
                        <ul class="references-list">
                            ${tech.References.map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            return `
                <div class="technique-group ${groupClass}">
                    <div class="technique-header">
                        <h3>${tech.Name}</h3>
                        <p class="technique-description">${tech.Description || ''}</p>
                    </div>
                    ${stepsHtml}
                    ${prerequisitesHtml}
                    ${referencesHtml}
                </div>
            `;
        }).join('') : '';
    
    template = template.replace(/{{TECHNIQUES}}/g, techniquesHtml);
    
    // Remove old placeholders that are no longer used
    template = template.replace(/{{SEVERITY}}/g, '');
    template = template.replace(/{{SEVERITY_UPPER}}/g, '');
    template = template.replace(/{{IOCFS}}/g, '');
    template = template.replace(/{{EXAMPLES}}/g, '');
    template = template.replace(/{{PREVENTION}}/g, '');
    
    return template;
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
        try {
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
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
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