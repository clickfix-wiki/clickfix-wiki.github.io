#!/usr/bin/env python3
"""
Deployment script for ClickFix Wiki
Builds the site and ensures proper deployment to GitHub Pages
"""

import subprocess
import sys
from pathlib import Path

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
    """Main deployment function"""
    print("🚀 Starting ClickFix Wiki deployment...")
    
    # Step 1: Build the site
    if not run_command("python build.py", "Building site"):
        return 1
    
    # Step 2: Check if _site directory exists
    site_dir = Path("_site")
    if not site_dir.exists():
        print("❌ _site directory not found after build")
        return 1
    
    # Step 3: Add _site to git
    if not run_command("git add _site/", "Adding _site directory to git"):
        return 1
    
    # Step 4: Check if there are changes to commit
    result = subprocess.run("git status --porcelain", shell=True, capture_output=True, text=True)
    if not result.stdout.strip():
        print("ℹ️ No changes to commit - site is up to date")
        return 0
    
    # Step 5: Commit changes
    if not run_command('git commit -m "Update site - auto-generated"', "Committing site changes"):
        return 1
    
    # Step 6: Push to master
    if not run_command("git push origin master", "Pushing to master branch"):
        return 1
    
    print("🎉 Deployment completed successfully!")
    print("📝 The site will be available at: https://clickfix-wiki.github.io/")
    print("⏱️ It may take a few minutes for changes to appear.")
    
    return 0

if __name__ == "__main__":
    exit(main()) 