#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function clean() {
    const pagesDir = 'pages';
    
    if (fs.existsSync(pagesDir)) {
        console.log('Removing generated pages directory...');
        fs.rmSync(pagesDir, { recursive: true, force: true });
        console.log('✅ Cleaned up generated files');
    } else {
        console.log('No generated files to clean');
    }
}

clean(); 