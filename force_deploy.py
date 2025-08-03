#!/usr/bin/env python3
"""
Force deployment script for ClickFix Wiki
"""

import subprocess
import sys
from pathlib import Path

def run_command(command, description):
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        return False

def main():
    print("🚀 Force deploying ClickFix Wiki...")
    
    # Clean and rebuild
    print("🧹 Cleaning previous build...")
    site_dir = Path("_site")
    if site_dir.exists():
        import shutil
        shutil.rmtree(site_dir)
        print("✅ Cleaned _site directory")
    
    # Build the site
    if not run_command("python build.py", "Building site"):
        return 1
    
    # Add all changes
    if not run_command("git add .", "Adding all changes to git"):
        return 1
    
    # Commit and push
    if not run_command('git commit -m "FORCE DEPLOYMENT: Update site"', "Committing changes"):
        return 1
    
    if not run_command("git push origin master", "Pushing to master"):
        return 1
    
    print("🎉 Force deployment completed!")
    return 0

if __name__ == "__main__":
    exit(main()) 