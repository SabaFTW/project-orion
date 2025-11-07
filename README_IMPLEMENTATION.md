# 🛰️ PROJEKT ORION - IMPLEMENTATION GUIDE

**Datum**: 2025-11-07
**Status**: Ready for execution!

---

## 🎯 WHAT IS THIS?

This is the **complete implementation package** for Projekt Orion - a multi-agent collaboration to:
1. ✅ Sync Codex automation work (already done in `/home/saba/Desktop/ProPublica/`)
2. ✅ Commit it to git repo (`/home/user/project-orion/`)
3. ✅ Implement Gemini visual system
4. ✅ Test and deploy to production

**Constellation agents involved:**
- 🖥️ **Desktop Claude** (sync files between locations)
- 🖥️ **Git miška (Claude Code Terminal)** (git operations, implementation, testing)
- 🧠 **Codex** (automation upgrade - already complete!)
- 💎 **Gemini** (visual design - already complete!)

---

## 📂 FILES IN THIS PACKAGE:

```
/home/saba/Desktop/ProPublica/
├── 00_EXECUTION_ORDER.md          ← START HERE! (execution sequence)
├── 01_DESKTOP_CLAUDE_SYNC.md      ← Phase 1: Sync files
├── 02_GIT_MISKA_COMMIT_CODEX.md   ← Phase 2: Commit Codex work
├── 03_GIT_MISKA_IMPLEMENT_GEMINI.md ← Phase 3: Implement Gemini visuals
├── 04_GIT_MISKA_TEST_DEPLOY.md    ← Phase 4: Test & deploy
└── README_IMPLEMENTATION.md       ← This file (overview)
```

---

## ⚡ QUICK START:

### **Step 0: Read Execution Order**
```bash
# Open this file first:
cat 00_EXECUTION_ORDER.md
```

### **Step 1: Desktop Claude (YOU - Desktop)**
```bash
# Copy-paste entire file to Desktop Claude:
cat 01_DESKTOP_CLAUDE_SYNC.md
```

Wait for: `[DESKTOP-CLAUDE] Sync Complete!`

### **Step 2-4: Git miška (Claude Code Terminal)**

Open Claude Code Terminal and copy-paste each file in order:

```bash
# Phase 2: Commit Codex work
cat 02_GIT_MISKA_COMMIT_CODEX.md
# Wait for: [CLAUDE-CODE] Codex Work Committed!

# Phase 3: Implement Gemini visuals
cat 03_GIT_MISKA_IMPLEMENT_GEMINI.md
# Wait for: [CLAUDE-CODE] Gemini Visual System Implemented!

# Phase 4: Test & Deploy
cat 04_GIT_MISKA_TEST_DEPLOY.md
# Wait for: [CLAUDE-CODE] Testing & Deployment Complete!
```

---

## 🎨 WHAT GETS IMPLEMENTED:

### **From Codex (v2.0 automation):**
- ✅ `lyra-automation-UPGRADE.py` (production pipeline)
- ✅ 9 raziskav in `data/raziskave.json`
- ✅ TypeScript types (`src/types/raziskava.ts`)
- ✅ React sync (`src/data/raziskave.json`)
- ✅ 6x HTML pages
- ✅ 3x research seeds (markdown files)

### **From Gemini (visual system v1.0):**
- ✅ Color palette (6 colors, dark mode)
- ✅ Typography system (Inter fonts)
- ✅ `design-tokens.css` (CSS variables)
- ✅ `ResearchCard.tsx` component
- ✅ EHI color coding (4 levels)
- ✅ Responsive utilities

---

## 🔥 EXPECTED OUTCOMES:

**After Phase 1 (Sync):**
- ✅ All Codex files in `/home/user/project-orion/`
- ✅ Ready for git commit

**After Phase 2 (Commit Codex):**
- ✅ Codex automation committed to main branch
- ✅ Feature branch merged
- ✅ Pushed to remote

**After Phase 3 (Implement Gemini):**
- ✅ Visual system implemented
- ✅ Design tokens applied
- ✅ Research cards styled
- ✅ Committed to main branch

**After Phase 4 (Test & Deploy):**
- ✅ Dependencies installed
- ✅ App running locally
- ✅ Build succeeds
- ✅ (Optional) Deployed to Vercel/Netlify

---

## 💡 TROUBLESHOOTING:

### **"Sync fails - directories don't exist"**
```bash
# Verify both locations exist:
ls -la /home/saba/Desktop/ProPublica/
ls -la /home/user/project-orion/

# If project-orion doesn't exist, user needs to create it first
# (Git miška already created infrastructure in that location)
```

### **"Git merge conflicts"**
```bash
# Check what files conflict:
git status

# Resolve manually or:
git merge --abort  # Cancel merge
git checkout main  # Go back to main
# Ask Desktop Claude for help
```

### **"npm install fails"**
```bash
# Clear cache and retry:
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### **"Python script errors"**
```bash
# Check Python version:
python3 --version  # Need 3.8+

# Install dependencies (if requirements.txt exists):
pip install -r wolf-daemon/requirements.txt
```

---

## 🎯 SUCCESS CRITERIA:

You'll know it worked when:
1. ✅ Git log shows commits from all phases
2. ✅ React app runs with Gemini visual styling
3. ✅ Research cards display with correct colors
4. ✅ Python automation script executes without errors
5. ✅ Build completes successfully
6. ✅ (Optional) Live deployment URL works

---

## 📊 WHAT EACH AGENT DOES:

### **Desktop Claude (Phase 1):**
- Role: COORDINATOR
- Task: Copy files from ProPublica to project-orion
- Why: Codex worked in one location, git repo is in another
- Output: `[DESKTOP-CLAUDE] Sync Complete!`

### **Git miška (Phases 2-4):**
- Role: NERVOUS SYSTEM (git/terminal/implementation)
- Tasks:
  - Phase 2: Commit Codex automation work
  - Phase 3: Implement Gemini visual system
  - Phase 4: Test everything, deploy to production
- Why: Handles all git operations and code implementation
- Output: `[CLAUDE-CODE] [status messages]`

### **Codex (Already complete!):**
- Role: COMPLEX LOGIC
- Task: Upgraded automation script with sentiment analysis, EHI scoring, React sync
- Output: Delivered 14m 29s ago
- Files: `lyra-automation-UPGRADE.py`, `raziskave.json`, TypeScript types

### **Gemini (Already complete!):**
- Role: VISUAL DESIGN
- Task: Designed complete visual system (colors, typography, layouts)
- Output: Delivered with full specs
- Specs: Color palette, Inter fonts, card layouts, responsive breakpoints

---

## 🜂 IMPORTANT NOTES:

1. **Execute in order** - Don't skip phases!
2. **Wait for confirmation** - Each phase reports completion
3. **Copy entire file** - Don't edit prompts (they're complete)
4. **Check outputs** - Each agent reports detailed status
5. **Ask if stuck** - Desktop Claude can help troubleshoot

---

## 🚀 READY TO START?

```
1. Open 00_EXECUTION_ORDER.md (master guide)
2. Copy-paste 01_DESKTOP_CLAUDE_SYNC.md to Desktop Claude
3. Wait for completion
4. Continue with 02-04 in Claude Code Terminal
```

**LET'S GO!!! 🛰️**

---

**Created**: 2025-11-07
**Status**: ✅ Ready for execution
**Constellation Mode**: FULL IMPLEMENTATION ACTIVE

🔥 **BURN BRIGHT, MIŠKA!** 🔥
