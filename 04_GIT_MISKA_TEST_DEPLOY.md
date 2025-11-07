# 🖥️ GIT MIŠKA - TEST & DEPLOY (FAZA 4)

**CLAUDE CODE. LISTEN.**

You are **GIT MIŠKA** - testing and deploying **PROJEKT ORION** to production.

All code is implemented. Now YOU test everything and deploy!

---

## 🎯 YOUR MISSION: VERIFY & DEPLOY

**What's been done:**
- ✅ Codex automation committed (v2.0)
- ✅ Gemini visual system implemented
- ✅ All files in git repo

**Your job:** Test locally, fix any issues, deploy to production!

---

## 📋 YOUR TASKS:

### TASK 1: Install Dependencies

```bash
cd /home/user/project-orion

# Verify we're on main branch
git branch

# Pull latest changes (if working remotely)
git pull origin main

# Install React dependencies
cd orion-svetilnik
npm install

echo "✅ Dependencies installed"
```

### TASK 2: Test React App Locally

```bash
cd /home/user/project-orion/orion-svetilnik

# Start dev server
npm run dev

# Server should start on http://localhost:5173
# Keep it running in background for testing
```

**Manual verification checklist:**
- [ ] App loads without errors
- [ ] Design tokens applied (dark navy background)
- [ ] Research cards display with correct styling
- [ ] EHI badges show correct colors
- [ ] Inter font family loaded
- [ ] Hover states work on cards
- [ ] Responsive layout works (test mobile view)

**If errors occur:**
- Check browser console for errors
- Check terminal for build errors
- Verify `design-tokens.css` is imported correctly
- Verify `raziskave.json` exists in `src/data/`

### TASK 3: Test Python Automation Script

```bash
cd /home/user/project-orion

# Test automation script
python3 wolf-daemon/lyra-automation-UPGRADE.py --help

# Verify JSON is valid
python3 -c "import json; data = json.load(open('data/raziskave.json')); print(f'✅ JSON valid: {len(data)} raziskav loaded')"

# Test script execution (dry run - don't add new research)
python3 wolf-daemon/lyra-automation-UPGRADE.py --scan
```

**Expected output:**
```
✅ Python script syntax valid
✅ JSON data valid (9 raziskav)
✅ Script can scan Dumps/ directory
```

**If errors occur:**
- Check Python version: `python3 --version` (need 3.8+)
- Check required imports: `pip install -r wolf-daemon/requirements.txt` (if exists)
- Verify file paths are correct

### TASK 4: Run Build Test

```bash
cd /home/user/project-orion/orion-svetilnik

# Build for production
npm run build

# Check build output
ls -lh dist/

# Verify build succeeded
echo "✅ Build complete: dist/ folder created"
```

**Expected:**
- `dist/` folder created
- No build errors
- Assets generated (JS, CSS, HTML)

### TASK 5: Test Visual System Integration

```bash
cd /home/user/project-orion/orion-svetilnik

# Check if design tokens are imported
grep -r "design-tokens.css" src/

# Check if ResearchCard component exists
ls -la src/components/ResearchCard.tsx

# Check if data files exist
ls -la src/data/raziskave.json
ls -la src/types/raziskava.ts

echo "✅ All files present and linked"
```

### TASK 6: Git Final Commit (if any fixes made)

**Only if you made fixes during testing!**

```bash
cd /home/user/project-orion

# Check if any changes were made
git status

# If changes exist, commit them
git add .
git commit -m "[TEST-FIXES]: Resolved issues found during testing

Fixes:
- [List any fixes you made]
- [e.g., Fixed import path in App.tsx]
- [e.g., Added missing Inter font fallback]

Testing completed:
✅ React app runs locally
✅ Build succeeds
✅ Python automation script works
✅ All dependencies installed

Ready for deployment.

🛰️ Projekt Orion - Testing Complete"

# Push to remote
git push origin main
```

### TASK 7: Deploy to Vercel (Optional)

**If user wants to deploy to production:**

```bash
cd /home/user/project-orion/orion-svetilnik

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel (will open browser)
vercel login

# Deploy to production
vercel --prod

# Note the deployment URL
echo "✅ Deployed to: [copy URL from output]"
```

**Alternative: Deploy to Netlify**

```bash
cd /home/user/project-orion/orion-svetilnik

# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=dist

# Note the deployment URL
echo "✅ Deployed to: [copy URL from output]"
```

**Alternative: GitHub Pages**

```bash
cd /home/user/project-orion

# Make sure gh-pages branch exists
git checkout -b gh-pages || git checkout gh-pages

# Copy build to gh-pages
cp -r orion-svetilnik/dist/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Enable GitHub Pages in repo settings
echo "✅ Enable GitHub Pages in repo settings → Source: gh-pages branch"
```

### TASK 8: Final Verification

```bash
cd /home/user/project-orion

# Check git status
git status

# Check recent commits
git log --oneline -5

# Verify all branches
git branch -a

# Check remote status
git remote -v

echo "✅ Repository clean and up to date"
```

---

## 📊 DELIVERABLE:

**When you finish, send:**

```
[CLAUDE-CODE] Testing & Deployment Complete! ✅

═══════════════════════════════════════════════════════════
TESTING RESULTS:

React App (orion-svetilnik/):
✅ Dependencies installed (X packages)
✅ Dev server runs on localhost:5173
✅ Design tokens applied correctly
✅ Research cards render with Gemini styling
✅ EHI color coding works
✅ Responsive layout verified
✅ Production build succeeds (dist/ created)

Python Automation (wolf-daemon/):
✅ Script syntax valid
✅ JSON data valid (9 raziskav)
✅ Can scan Dumps/ directory
✅ React sync functionality works

Files Verified:
✅ src/design-tokens.css (150 lines)
✅ src/components/ResearchCard.tsx (80 lines)
✅ src/data/raziskave.json (9 raziskav)
✅ src/types/raziskava.ts (TypeScript types)
✅ src/index.css (imports design tokens)

GIT STATUS:
- Branch: main
- Status: Clean (no uncommitted changes)
- Remote: Synced with origin/main
- Commits: [list recent commits]

DEPLOYMENT:
[Choose one:]
✅ Deployed to Vercel: https://orion-svetilnik.vercel.app
✅ Deployed to Netlify: https://orion-svetilnik.netlify.app
✅ Deployed to GitHub Pages: https://username.github.io/project-orion
⏸️  Not deployed (local testing only)

ISSUES FOUND: [None / List any issues]
FIXES APPLIED: [None / List fixes]

═══════════════════════════════════════════════════════════

NEXT STEPS:
Ready for production use! 🚀

To add new research:
1. Add markdown to Dumps/research/
2. Run: python3 wolf-daemon/lyra-automation-UPGRADE.py --add
3. Rebuild React: npm run build
4. Redeploy: vercel --prod (or netlify deploy --prod)

🛰️ Projekt Orion - LIVE IN PRODUCTION
```

---

## 🜂 IMPORTANT:

- ✅ Test BEFORE deploying
- ✅ Fix issues immediately
- ✅ Commit fixes with [TEST-FIXES] tag
- ✅ Verify deployment URL works
- ✅ Report any blockers

**Your role:** QUALITY ASSURANCE. Make sure everything works!

---

🖥️ **READY? Execute all tasks and report back!** 🖥️
