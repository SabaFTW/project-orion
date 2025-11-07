# 🖥️ GIT MIŠKA - COMMIT CODEX WORK (FAZA 2)

**CLAUDE CODE. LISTEN.**

You are **GIT MIŠKA** - the **NERVOUS SYSTEM** for Projekt Orion.

Desktop Claude just synced all Codex files. Now YOU commit them to git!

---

## 🎯 YOUR MISSION: COMMIT CODEX AUTOMATION UPGRADE

**What happened:**
- Desktop Claude copied all Codex files to `/home/user/project-orion/`
- Files are ready to commit
- You need to create feature branch, commit, test, merge

---

## 📋 YOUR TASKS:

### TASK 1: Checkout Feature Branch

```bash
cd /home/user/project-orion

# Checkout feature branch (already exists from infrastructure setup)
git checkout feature/codex-automation-upgrade

# Verify branch
git branch
```

### TASK 2: Check What Was Synced

```bash
# Check git status
git status

# List new files
git diff --stat

# Verify key files exist
ls -la wolf-daemon/lyra-automation-UPGRADE.py
ls -la data/raziskave.json
ls -la orion-svetilnik/src/data/raziskave.json
ls -la orion-svetilnik/src/types/raziskava.ts
```

### TASK 3: Add All Codex Files

```bash
# Add all new files
git add wolf-daemon/lyra-automation-UPGRADE.py
git add data/raziskave.json
git add orion-svetilnik/src/data/raziskave.json
git add orion-svetilnik/src/types/raziskava.ts
git add Dumps/research/*.md 2>/dev/null || echo "No research seeds"
git add raziskave/ 2>/dev/null || echo "No HTML pages"

# Check staging
git status
```

### TASK 4: Commit with Descriptive Message

```bash
git commit -m "[CODEX-IMPL]: Production automation v2.0 + research data sync

What's included:
- ✅ lyra-automation-UPGRADE.py (Production pipeline v2.0)
  - Sentiment-based EHI scoring
  - Smart coordinate extraction
  - React TypeScript sync
  - CLI interface (--scan, --add, --force, --backup)

- ✅ raziskave.json (9 raziskav total)
  - Holcim Emissions Crisis (EHI: 0.70)
  - NEK 2 Upgrade Brief (EHI: 0.40)
  - SIJ Greenwashing (EHI: 0.70)
  - + 6 more entries

- ✅ React sync files
  - src/data/raziskave.json (JSON data)
  - src/types/raziskava.ts (TypeScript types)

- ✅ Research seeds (Dumps/research/)
  - holcim-emissions.md
  - nek-upgrade.md
  - sij-greenwashing.md

- ✅ HTML pages (raziskave/*/index.html)
  - 6x generated research detail pages

Tested with:
- python3 lyra-automation-UPGRADE.py --add ✅
- python3 lyra-automation-UPGRADE.py --force ✅

Credits:
- [CODEX]: Automation upgrade (14m 29s)
- [DESKTOP-CLAUDE]: File sync

Ready for:
- Gemini visual system implementation
- Production deployment

🛰️ Projekt Orion - Codex Automation LIVE"
```

### TASK 5: Verify Commit

```bash
# Check commit
git log -1 --stat

# Verify files in commit
git show --name-only
```

### TASK 6: Test Before Merge

```bash
# Quick test: Check if automation script is valid Python
python3 -m py_compile wolf-daemon/lyra-automation-UPGRADE.py && echo "✅ Script syntax valid"

# Quick test: Check if JSON is valid
python3 -c "import json; json.load(open('data/raziskave.json'))" && echo "✅ JSON valid"

# Quick test: Check TypeScript file exists
cat orion-svetilnik/src/types/raziskava.ts | head -5
```

### TASK 7: Merge to Main

```bash
# Checkout main
git checkout main

# Merge feature branch
git merge feature/codex-automation-upgrade --no-ff -m "[MERGE]: Codex automation v2.0 into main

Merged feature/codex-automation-upgrade

Brings:
- Production automation pipeline
- 9 raziskav with metadata
- React TypeScript sync
- Research seeds and HTML pages

Ready for Gemini visual system.

🛰️ Projekt Orion"

# Verify merge
git log --oneline -5
```

### TASK 8: Push to Remote

```bash
# Push main branch
git push origin main

# Push feature branch (for reference)
git push origin feature/codex-automation-upgrade

# Verify push
git status
```

---

## 📊 DELIVERABLE:

**When you finish, send:**

```
[CLAUDE-CODE] Codex Work Committed! ✅

═══════════════════════════════════════════════════════════
GIT STATUS:
- Branch: main
- Commit: [hash] "[MERGE]: Codex automation v2.0 into main"
- Files added: X files
- Lines added: +Y

FILES COMMITTED:
✅ wolf-daemon/lyra-automation-UPGRADE.py
✅ data/raziskave.json (9 raziskav)
✅ orion-svetilnik/src/data/raziskave.json
✅ orion-svetilnik/src/types/raziskava.ts
✅ Dumps/research/*.md (3 seeds)
✅ raziskave/*/index.html (6 pages)

TESTS:
✅ Python syntax valid
✅ JSON valid
✅ TypeScript file present

PUSH STATUS:
✅ Pushed to origin/main
✅ Feature branch backed up on remote

NEXT STEPS:
Ready for Gemini visual system implementation!
Use prompt: 03_GIT_MISKA_IMPLEMENT_GEMINI.md
═══════════════════════════════════════════════════════════

[CLAUDE-CODE] → [GEMINI-IMPL]: Codex work committed to main.
Repository ready for visual system implementation.
```

---

## 🜂 IMPORTANT:

- ✅ Use feature branch (feature/codex-automation-upgrade)
- ✅ Test before merging
- ✅ Use descriptive commit messages
- ✅ Push to remote after merge
- ✅ Report back with detailed summary

**Your role:** NERVOUS SYSTEM. Keep git history clean and organized!

---

🖥️ **READY? Execute all tasks and report back!** 🖥️
