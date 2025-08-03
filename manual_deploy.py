#!/usr/bin/env python3
"""
Manual deployment script for ClickFix Wiki
Deploys directly to gh-pages branch
"""

import subprocess
import sys
from pathlib import Path
import shutil

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        if result.stdout.strip():
            print(f"Output: {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        if e.stderr:
            print(f"Error output: {e.stderr}")
        if e.stdout:
            print(f"Output: {e.stdout}")
        return False

def main():
    """Manual deployment to gh-pages branch"""
    print("🚀 Starting manual deployment to GitHub Pages...")
    
    # Step 1: Build the site
    if not run_command("python build.py", "Building site"):
        return 1
    
    # Step 2: Check if _site directory exists
    site_dir = Path("_site")
    if not site_dir.exists():
        print("❌ _site directory not found after build")
        return 1
    
    # Step 3: Create or switch to gh-pages branch
    if not run_command("git checkout -b gh-pages", "Creating gh-pages branch"):
        # If branch exists, switch to it
        if not run_command("git checkout gh-pages", "Switching to gh-pages branch"):
            return 1
    
    # Step 4: Clear the branch (keep only .git)
    print("🔄 Clearing gh-pages branch...")
    for item in Path(".").iterdir():
        if item.name not in [".git", "_site"]:
            if item.is_file():
                item.unlink()
            elif item.is_dir():
                shutil.rmtree(item)
    
    # Step 5: Copy _site contents to root
    print("🔄 Copying site files...")
    for item in site_dir.iterdir():
        if item.is_file():
            shutil.copy2(item, ".")
        elif item.is_dir():
            shutil.copytree(item, item.name)
    
    # Step 6: Add all files
    if not run_command("git add .", "Adding all files"):
        return 1
    
    # Step 7: Commit changes
    if not run_command('git commit -m "Manual deployment - $(date)"', "Committing deployment"):
        return 1
    
    # Step 8: Push to gh-pages
    if not run_command("git push origin gh-pages --force", "Pushing to gh-pages branch"):
        return 1
    
    # Step 9: Switch back to master
    if not run_command("git checkout master", "Switching back to master"):
        return 1
    
    print("🎉 Manual deployment completed successfully!")
    print("📝 The site will be available at: https://clickfix-wiki.github.io/")
    print("⏱️ It may take a few minutes for changes to appear.")
    
    return 0

if __name__ == "__main__":
    exit(main()) 