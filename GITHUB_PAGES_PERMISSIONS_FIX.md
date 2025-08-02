# GitHub Pages Permissions Fix 🔧

## 🚨 **Issue Identified**

The GitHub Actions build is working perfectly, but deployment is failing due to **permissions issues**:

```
remote: Permission to clickfix-wiki/clickfix-wiki.github.io.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/clickfix-wiki/clickfix-wiki.github.io.git/': The requested URL returned error: 403
```

## ✅ **Build Status: SUCCESS**

The build process is working correctly:
- ✅ Dependencies installed successfully
- ✅ `python build.py` completed successfully
- ✅ All files generated properly
- ✅ Site built successfully

**Only the deployment step is failing due to permissions.**

## 🔧 **Solution: Fix Repository Permissions**

### **Step 1: Enable GitHub Actions Permissions**

1. **Go to your repository**: `https://github.com/clickfix-wiki/clickfix-wiki.github.io`
2. **Click Settings** (top navigation)
3. **Click Actions** (left sidebar)
4. **Click General** (under Actions)
5. **Scroll down to "Workflow permissions"**
6. **Select**: "Read and write permissions"
7. **Check**: "Allow GitHub Actions to create and approve pull requests"
8. **Click Save**

### **Step 2: Enable GitHub Pages**

1. **Go to Settings** → **Pages** (left sidebar)
2. **Source**: Select "Deploy from a branch"
3. **Branch**: Select "gh-pages" (will be created by the action)
4. **Folder**: Select "/ (root)"
5. **Click Save**

### **Step 3: Verify Repository Settings**

**Repository Settings to Check:**
- ✅ **Actions**: Read and write permissions enabled
- ✅ **Pages**: Deploy from gh-pages branch
- ✅ **General**: Repository is public (for GitHub Pages)

## 🚀 **Workflow Updated**

I've updated the workflow with explicit permissions to fix the deployment issue:

### **✅ Updated Workflow Features:**

**Explicit Permissions:**
```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

**Enhanced Deployment:**
```yaml
- name: Deploy to GitHub Pages
  if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./_site
    force_orphan: true
    user_name: 'github-actions[bot]'
    user_email: 'github-actions[bot]@users.noreply.github.com'
```

## 🔧 **Complete Solution Steps**

### **Step 1: Repository Settings (Required)**

1. **Go to your repository**: `https://github.com/clickfix-wiki/clickfix-wiki.github.io`
2. **Click Settings** (top navigation)
3. **Click Actions** (left sidebar)
4. **Click General** (under Actions)
5. **Scroll down to "Workflow permissions"**
6. **Select**: "Read and write permissions"
7. **Check**: "Allow GitHub Actions to create and approve pull requests"
8. **Click Save**

### **Step 2: Enable GitHub Pages**

1. **Go to Settings** → **Pages** (left sidebar)
2. **Source**: Select "Deploy from a branch"
3. **Branch**: Select "gh-pages" (will be created by the action)
4. **Folder**: Select "/ (root)"
5. **Click Save**

### **Step 3: Push Changes**

The updated workflow with explicit permissions should resolve the deployment issue:

```bash
git add .github/workflows/deploy.yml
git commit -m "Fix GitHub Pages deployment permissions"
git push origin main
```
 