# GitHub Pages Source Configuration Fix 🔧

## 🚨 **Issue Identified**

The live site at [https://clickfix-wiki.github.io/](https://clickfix-wiki.github.io/) is showing the old static content instead of your Python-generated site. This indicates that **GitHub Pages is not serving from the correct source**.

## 🔍 **Root Cause Analysis**

**Current Situation:**
- ✅ Python build works correctly locally
- ✅ `_site` directory is generated properly
- ✅ GitHub Actions workflow is configured correctly
- ❌ GitHub Pages is serving old content instead of `_site` directory

**Possible Issues:**
1. **GitHub Pages Source**: Not configured to serve from `_site` directory
2. **GitHub Actions**: Not creating the `gh-pages` branch properly
3. **Repository Settings**: GitHub Pages pointing to wrong source

## 🔧 **Solution Steps**

### **Step 1: Check GitHub Pages Settings**

1. **Go to your repository**: [https://github.com/clickfix-wiki/clickfix-wiki.github.io](https://github.com/clickfix-wiki/clickfix-wiki.github.io)
2. **Click Settings** (top navigation)
3. **Click Pages** (left sidebar)
4. **Check the source configuration**:
   - **Source**: Should be "Deploy from a branch"
   - **Branch**: Should be "gh-pages" (created by GitHub Actions)
   - **Folder**: Should be "/ (root)"

### **Step 2: Alternative Configuration**

If the `gh-pages` branch approach isn't working, we can configure GitHub Pages to serve directly from the `_site` directory in the main branch:

**Option A: Serve from `_site` directory in main branch**
1. **Settings** → **Pages**
2. **Source**: "Deploy from a branch"
3. **Branch**: "master"
4. **Folder**: "/_site"

**Option B: Move files to root (Alternative approach)**
If Option A doesn't work, we can modify the build script to output to the root directory instead of `_site`.

### **Step 3: Force Rebuild and Deploy**

Let's trigger a fresh build and deployment:

```bash
# Make a small change to trigger GitHub Actions
echo "# Trigger rebuild" >> README.md
git add README.md
git commit -m "Trigger GitHub Actions rebuild"
git push origin master
```

### **Step 4: Verify GitHub Actions**

1. **Go to Actions tab** in your repository
2. **Check the latest workflow run**
3. **Verify the deployment step** completed successfully
4. **Check if `gh-pages` branch** was created

## 🚀 **Immediate Fix Options**

### **Option 1: Update GitHub Pages Settings**

**If GitHub Pages is not configured correctly:**
1. Go to **Settings** → **Pages**
2. Set **Source** to "Deploy from a branch"
3. Set **Branch** to "gh-pages"
4. Set **Folder** to "/ (root)"
5. Click **Save**

### **Option 2: Alternative Workflow (If gh-pages approach fails)**

If the `gh-pages` branch approach continues to fail, we can modify the workflow to deploy directly to the main branch:

```yaml
- name: Deploy to GitHub Pages
  if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
  run: |
    git config --local user.email "action@github.com"
    git config --local user.name "GitHub Action"
    git add _site/
    git commit -m "Update site" || exit 0
    git push
```

### **Option 3: Serve from Root Directory**

Modify the build script to output files to the root directory instead of `_site`:

```python
# Change output directory
self.output_dir = Path(".")  # Instead of Path("_site")
```

## 📊 **Verification Checklist**

### **✅ GitHub Pages Settings:**
- [ ] Source: "Deploy from a branch"
- [ ] Branch: "gh-pages" (or "master" with `_site` folder)
- [ ] Folder: "/ (root)" (or "/_site" for master branch)

### **✅ GitHub Actions:**
- [ ] Workflow runs successfully
- [ ] Build step completes
- [ ] Deploy step completes
- [ ] `gh-pages` branch is created (if using that approach)

### **✅ Repository Structure:**
- [ ] `_site` directory exists in repository
- [ ] `_site/index.html` contains the correct content
- [ ] All static assets are present

## 🎯 **Next Steps**

1. **Check GitHub Pages settings** in your repository
2. **Verify GitHub Actions** are running successfully
3. **Try the alternative configuration** if needed
4. **Force a rebuild** by making a small change and pushing

The key issue is ensuring GitHub Pages is configured to serve from the correct source directory! 