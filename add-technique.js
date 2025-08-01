#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function createTechnique() {
    console.log('=== ClickFix Technique Creator ===\n');
    
    const id = await question('Enter technique ID (e.g., fake-support-call): ');
    const title = await question('Enter technique title: ');
    const description = await question('Enter technique description: ');
    const severity = await question('Enter severity (low/medium/high): ');
    const category = await question('Enter category (phone-scam/email-scam/web-scam): ');
    
    console.log('\nEnter tags (press Enter twice when done):');
    console.log('Available tags: Windows, Mac, Linux, GUI, CLI, Run Command, Open File Explorer, Clear Mark of The Web, UAC, Remote Access, Download, Popup, Payment, Personal Information, Document Request, Fake Alert, Email, Web Browser, File Attachment, Phone Call');
    const tags = [];
    while (true) {
        const tag = await question(`Tag ${tags.length + 1}: `);
        if (tag === '') break;
        tags.push(tag);
    }
    
    console.log('\nEnter IoCFs (press Enter twice when done):');
    const iocfs = [];
    while (true) {
        const iocf = await question(`IoCF ${iocfs.length + 1}: `);
        if (iocf === '') break;
        iocfs.push(iocf);
    }
    
    console.log('\nEnter examples (press Enter twice when done):');
    const examples = [];
    while (true) {
        const example = await question(`Example ${examples.length + 1}: `);
        if (example === '') break;
        examples.push(example);
    }
    
    console.log('\nEnter prevention tips (press Enter twice when done):');
    const prevention = [];
    while (true) {
        const tip = await question(`Prevention tip ${prevention.length + 1}: `);
        if (tip === '') break;
        prevention.push(tip);
    }
    
    // Create YAML content
    const yamlContent = `id: ${id}
title: ${title}
description: ${description}
    severity: ${severity}
category: ${category}
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
iocfs:
${iocfs.map(iocf => `  - ${iocf}`).join('\n')}
examples:
${examples.map(example => `  - ${example}`).join('\n')}
prevention:
${prevention.map(tip => `  - ${tip}`).join('\n')}
`;
    
    // Write to file
    const filename = `techniques/${id}.yaml`;
    fs.writeFileSync(filename, yamlContent);
    
    console.log(`\n✅ Technique created: ${filename}`);
    
    // Update the index file
    try {
        const indexPath = 'techniques/index.txt';
        let indexContent = '';
        if (fs.existsSync(indexPath)) {
            indexContent = fs.readFileSync(indexPath, 'utf8');
        }
        
        // Add the new file to the index if it's not already there
        const newFilename = `${id}.yaml`;
        if (!indexContent.includes(newFilename)) {
            indexContent += (indexContent ? '\n' : '') + newFilename;
            fs.writeFileSync(indexPath, indexContent);
            console.log('✅ Updated techniques/index.txt');
        }
    } catch (error) {
        console.log('⚠️  Warning: Could not update index file automatically.');
    }
    
    console.log('\nGenerating updated pages...');
    
    // Generate updated pages
    const { execSync } = require('child_process');
    try {
        execSync('node generate-pages.js', { stdio: 'inherit' });
        console.log('✅ Pages generated successfully!');
    } catch (error) {
        console.log('⚠️  Warning: Could not generate pages automatically. Run "node generate-pages.js" manually.');
    }
    
    rl.close();
}

createTechnique().catch(console.error); 