#!/usr/bin/env python3
"""
ClickFix Wiki Development Helper
Provides easy commands for building and serving the site locally
"""

import os
import sys
import subprocess
import webbrowser
from pathlib import Path
import http.server
import socketserver
import threading
import time

def build_site():
    """Build the static site"""
    print("🔨 Building ClickFix Wiki...")
    result = subprocess.run([sys.executable, "build.py"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Build successful!")
        return True
    else:
        print("❌ Build failed:")
        print(result.stderr)
        return False

def serve_site(port=8000):
    """Serve the site locally"""
    site_dir = Path("_site")
    if not site_dir.exists():
        print("❌ Site not built. Run 'python dev.py build' first.")
        return False
    
    os.chdir(site_dir)
    
    class Handler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            super().end_headers()
    
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"🌐 Serving site at http://localhost:{port}")
        print("📁 Site directory:", site_dir.absolute())
        print("🔄 Auto-reload: Press Ctrl+C to stop")
        
        # Open browser
        webbrowser.open(f"http://localhost:{port}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped.")
            return True

def watch_and_build():
    """Watch for changes and rebuild automatically"""
    print("👀 Watching for changes...")
    print("📝 Edit YAML files in techniques/ directory")
    print("🔄 Site will rebuild automatically")
    print("⏹️  Press Ctrl+C to stop")
    
    last_modified = {}
    
    # Get initial modification times
    for yaml_file in Path("techniques").glob("*.yaml"):
        last_modified[yaml_file] = yaml_file.stat().st_mtime
    
    try:
        while True:
            time.sleep(1)
            rebuild_needed = False
            
            # Check for changes
            for yaml_file in Path("techniques").glob("*.yaml"):
                current_mtime = yaml_file.stat().st_mtime
                if yaml_file not in last_modified or current_mtime > last_modified[yaml_file]:
                    print(f"📝 Detected change in {yaml_file.name}")
                    rebuild_needed = True
                    last_modified[yaml_file] = current_mtime
            
            if rebuild_needed:
                print("🔨 Rebuilding...")
                if build_site():
                    print("✅ Rebuild complete!")
                else:
                    print("❌ Rebuild failed!")
    
    except KeyboardInterrupt:
        print("\n👋 Watcher stopped.")

def main():
    """Main development helper"""
    if len(sys.argv) < 2:
        print("ClickFix Wiki Development Helper")
        print("\nUsage:")
        print("  python dev.py build     - Build the site")
        print("  python dev.py serve     - Serve the site locally")
        print("  python dev.py watch     - Watch for changes and auto-rebuild")
        print("  python dev.py dev       - Build, serve, and watch")
        return
    
    command = sys.argv[1]
    
    if command == "build":
        build_site()
    
    elif command == "serve":
        serve_site()
    
    elif command == "watch":
        watch_and_build()
    
    elif command == "dev":
        # Build first
        if build_site():
            # Start watcher in background
            watcher_thread = threading.Thread(target=watch_and_build, daemon=True)
            watcher_thread.start()
            
            # Serve the site
            serve_site()
    
    else:
        print(f"❌ Unknown command: {command}")
        print("Available commands: build, serve, watch, dev")

if __name__ == "__main__":
    main() 