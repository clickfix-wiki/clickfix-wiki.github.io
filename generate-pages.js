#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Direct YAML parser for the new format
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

// Read template
function readTemplate() {
    return fs.readFileSync('technique-template.html', 'utf8');
}

// Generate HTML for a tool
function generateToolPage(tool) {
    let template = readTemplate();
    
    // Replace basic placeholders
    template = template.replace(/{{TITLE}}/g, tool.Name);
    template = template.replace(/{{DESCRIPTION}}/g, tool.Description);
    template = template.replace(/{{CATEGORY}}/g, tool.Category);
    
    // Generate tags HTML
    const tagsHtml = tool.Tags && Array.isArray(tool.Tags) ? 
        tool.Tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('') : '';
    template = template.replace(/{{TAGS}}/g, tagsHtml);
    
    // Generate techniques HTML
    let techniquesHtml = '';
    if (tool.Techniques && tool.Techniques.length > 0) {
        techniquesHtml = '<div class="techniques-section">';
        tool.Techniques.forEach((technique, index) => {
            techniquesHtml += `
                <div class="technique-item">
                    <h3 class="technique-name">${technique.Name || 'Unnamed Technique'}</h3>
                    <p class="technique-description">${technique.Description || 'No description available'}</p>
                    <div class="technique-details">
                        <div class="steps-section">
                            <h4>Steps:</h4>
                            <ol class="steps-list">
                                ${technique.Steps && Array.isArray(technique.Steps) ? technique.Steps.map(step => `<li>${step}</li>`).join('') : '<li>No steps specified</li>'}
                            </ol>
                        </div>
                        <div class="prerequisites-section">
                            <h4>Prerequisites:</h4>
                            <p>${technique.Prerequisites || 'None specified'}</p>
                        </div>
                        <div class="references-section">
                            <h4>References:</h4>
                            <ul class="references-list">
                                ${technique.References && Array.isArray(technique.References) ? technique.References.map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('') : '<li>No references available</li>'}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });
        techniquesHtml += '</div>';
    } else {
        techniquesHtml = '<p>No techniques documented for this tool yet.</p>';
    }
    template = template.replace(/{{TECHNIQUES}}/g, techniquesHtml);
    
    // Remove old sections that don't apply to tools
    template = template.replace(/<div class="section">\s*<h2 class="section-title">Indicators of ClickFix \(IoCF\)<\/h2>\s*<ul class="iocf-list">\s*{{IOCFS}}\s*<\/ul>\s*<\/div>/g, '');
    template = template.replace(/<div class="section">\s*<h2 class="section-title">Examples<\/h2>\s*<ul class="examples-list">\s*{{EXAMPLES}}\s*<\/ul>\s*<\/div>/g, '');
    template = template.replace(/<div class="section">\s*<h2 class="section-title">Prevention<\/h2>\s*<ul class="prevention-list">\s*{{PREVENTION}}\s*<\/ul>\s*<\/div>/g, '');
    
    return template;
}

// Generate all tool pages
function generateAllPages() {
    const techniquesDir = 'techniques';
    const pagesDir = 'pages';
    
    // Create pages directory if it doesn't exist
    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir);
    }
    
    // Read all YAML files
    const files = fs.readdirSync(techniquesDir).filter(file => file.endsWith('.yaml'));
    
    console.log(`Generating pages for ${files.length} tools...`);
    
    files.forEach(file => {
        const yamlPath = path.join(techniquesDir, file);
        const yamlContent = fs.readFileSync(yamlPath, 'utf8');
        const tool = parseYAML(yamlContent);
        
        // Generate HTML
        const html = generateToolPage(tool);
        
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