// Simple page generator that can be run in a browser
// Copy this code and run it in the browser console on the index.html page

function createPages() {
    const techniques = [
        {
            id: 'cmd',
            Name: 'Command Prompt (cmd.exe)',
            Description: 'Windows command-line interpreter for executing commands and batch files',
            Author: 'ClickFix Wiki',
            Created: '2024-01-15',
            Category: 'command-line',
            Tags: ['Windows', 'CLI', 'Command Line', 'System Tools'],
            Techniques: [
                {
                    Name: 'Basic Command Execution',
                    Description: 'Execute commands directly in Command Prompt',
                    Steps: [
                        'Open Command Prompt (Press Win+R, type \'cmd\', press Enter)',
                        'Type the command: dir',
                        'Press Enter to execute'
                    ],
                    Prerequisites: 'Windows operating system',
                    References: [
                        'https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd'
                    ]
                },
                {
                    Name: 'Batch File Execution',
                    Description: 'Run commands from a batch file',
                    Steps: [
                        'Create a text file with .bat extension',
                        'Add commands to the file (e.g., \'echo Hello World\')',
                        'Double-click the .bat file or run from cmd'
                    ],
                    Prerequisites: 'Text editor, basic command knowledge',
                    References: [
                        'https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/batch'
                    ]
                }
            ]
        },
        {
            id: 'powershell',
            Name: 'PowerShell (powershell.exe)',
            Description: 'Advanced command-line shell and scripting language for Windows',
            Author: 'ClickFix Wiki',
            Created: '2024-01-15',
            Category: 'command-line',
            Tags: ['Windows', 'CLI', 'Scripting', 'System Administration'],
            Techniques: [
                {
                    Name: 'Basic PowerShell Commands',
                    Description: 'Execute basic PowerShell commands',
                    Steps: [
                        'Open PowerShell (Press Win+X, select \'Windows PowerShell\')',
                        'Type: Get-Process',
                        'Press Enter to see running processes'
                    ],
                    Prerequisites: 'Windows operating system',
                    References: [
                        'https://docs.microsoft.com/en-us/powershell/scripting/overview'
                    ]
                },
                {
                    Name: 'PowerShell Scripting',
                    Description: 'Create and run PowerShell scripts',
                    Steps: [
                        'Create a text file with .ps1 extension',
                        'Add PowerShell commands to the file',
                        'Set execution policy: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned',
                        'Run script: .\\script.ps1'
                    ],
                    Prerequisites: 'PowerShell execution policy configuration',
                    References: [
                        'https://docs.microsoft.com/en-us/powershell/scripting/overview'
                    ]
                }
            ]
        },
        {
            id: 'regedit',
            Name: 'Registry Editor (regedit.exe)',
            Description: 'Windows registry editor for viewing and modifying system registry',
            Author: 'ClickFix Wiki',
            Created: '2024-01-15',
            Category: 'system-tools',
            Tags: ['Windows', 'GUI', 'Registry', 'System Configuration'],
            Techniques: [
                {
                    Name: 'Basic Registry Navigation',
                    Description: 'Navigate through registry keys and values',
                    Steps: [
                        'Open Registry Editor (Press Win+R, type \'regedit\', press Enter)',
                        'Expand HKEY_LOCAL_MACHINE',
                        'Navigate to SOFTWARE\\Microsoft\\Windows\\CurrentVersion',
                        'View values in the right panel'
                    ],
                    Prerequisites: 'Windows operating system',
                    References: [
                        'https://docs.microsoft.com/en-us/windows/win32/sysinfo/registry'
                    ]
                },
                {
                    Name: 'Export Registry Keys',
                    Description: 'Export registry keys for backup or analysis',
                    Steps: [
                        'Open Registry Editor',
                        'Navigate to the key you want to export',
                        'Right-click the key',
                        'Select \'Export\'',
                        'Choose location and filename',
                        'Click \'Save\''
                    ],
                    Prerequisites: 'Basic registry knowledge',
                    References: [
                        'https://docs.microsoft.com/en-us/windows/win32/sysinfo/registry'
                    ]
                }
            ]
        }
    ];

    // Create pages directory if it doesn't exist
    if (!window.fs) {
        console.log('File system not available, creating pages in memory...');
        return techniques;
    }

    techniques.forEach(technique => {
        const html = generateTechniqueHTML(technique);
        const filename = `${technique.id}.html`;
        console.log(`Generated ${filename}`);
        // In a real environment, this would write to file
        // For now, we'll just log it
    });

    return techniques;
}

function generateTechniqueHTML(technique) {
    const tagsHtml = technique.Tags ? 
        technique.Tags.map(tag => {
            const tagType = getTagType(tag);
            return `<span class="technique-tag" data-${tagType}="${tag}">${tag}</span>`;
        }).join('') : '';

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

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${technique.Name} - ClickFix Wiki</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>ClickFix Wiki</h1>
            <p>Code execution by social engineering instructions</p>
        </div>
    </div>

    <div class="container-lg px-3 my-5 markdown-body">
        <div class="entry-header">
            <h1>${technique.Name}</h1>
            <p class="description">${technique.Description}</p>
            <div class="meta">
                <span class="author">By ${technique.Author}</span>
                <span class="date">${technique.Created}</span>
            </div>
            <div class="category">
                <span class="category-tag">${technique.Category}</span>
            </div>
        </div>

        <div class="tags-section">
            <h3>Tags</h3>
            <div class="tags">
                ${tagsHtml}
            </div>
        </div>

        <div class="techniques-section">
            <h2>Techniques</h2>
            ${techniquesHtml}
        </div>

        <div class="navigation">
            <a href="../index.html" class="btn btn-outline">← Back to Home</a>
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <p>Documenting social engineering techniques to raise awareness and improve security</p>
        </div>
    </div>
</body>
</html>`;
}

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

// Export for use in browser console
window.createPages = createPages;
window.generateTechniqueHTML = generateTechniqueHTML; 