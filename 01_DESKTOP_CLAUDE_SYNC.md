# 🖥️ DESKTOP CLAUDE - SYNC & PREPARE (FAZA 1)

**BRAT. LISTEN.**

You are **DESKTOP CLAUDE** - the **COORDINATOR** for Projekt Orion implementation.

---

## 🎯 YOUR MISSION: SYNC FILES BETWEEN LOCATIONS

**Problem:**
- Codex upgraded automation in: `/home/saba/Desktop/ProPublica/`
- Git miška prepared infrastructure in: `/home/user/project-orion/`
- **These are THE SAME project - need to sync!**

**Solution:**
You sync all Codex work into the Git repo so Git miška can commit everything!

---

## ✅ WHAT CODEX CREATED (in /home/saba/Desktop/ProPublica/):

```
Dumps/lyra-automation-UPGRADE.py          (Production automation v2.0)
orion/data/raziskave.json                 (9 raziskav)
orion-react/src/data/raziskave.json       (Synced JSON)
orion-react/src/types/raziskava.ts        (TypeScript types)
orion/raziskave/*/index.html              (6x HTML pages)
Dumps/research/*.md                       (3x research seeds)
```

---

## 📋 YOUR TASKS:

### TASK 1: Copy Codex Automation Script

```bash
# Copy production automation
cp /home/saba/Desktop/ProPublica/Dumps/lyra-automation-UPGRADE.py \
   /home/user/project-orion/wolf-daemon/lyra-automation-UPGRADE.py
```

### TASK 2: Copy Research Data

```bash
# Create data directory if doesn't exist
mkdir -p /home/user/project-orion/data

# Copy raziskave JSON
cp /home/saba/Desktop/ProPublica/orion/data/raziskave.json \
   /home/user/project-orion/data/raziskave.json
```

### TASK 3: Copy React Sync Files

```bash
# Create directories
mkdir -p /home/user/project-orion/orion-svetilnik/src/data
mkdir -p /home/user/project-orion/orion-svetilnik/src/types

# Copy JSON data
cp /home/saba/Desktop/ProPublica/orion-react/src/data/raziskave.json \
   /home/user/project-orion/orion-svetilnik/src/data/raziskave.json

# Copy TypeScript types
cp /home/saba/Desktop/ProPublica/orion-react/src/types/raziskava.ts \
   /home/user/project-orion/orion-svetilnik/src/types/raziskava.ts
```

### TASK 4: Copy Research Seeds

```bash
# Create Dumps/research if doesn't exist
mkdir -p /home/user/project-orion/Dumps/research

# Copy research markdown files
cp /home/saba/Desktop/ProPublica/Dumps/research/*.md \
   /home/user/project-orion/Dumps/research/ 2>/dev/null || echo "No research files to copy"
```

### TASK 5: Copy HTML Pages (if they exist)

```bash
# Create raziskave directory
mkdir -p /home/user/project-orion/raziskave

# Copy HTML pages
cp -r /home/saba/Desktop/ProPublica/orion/raziskave/* \
   /home/user/project-orion/raziskave/ 2>/dev/null || echo "No HTML pages to copy"
```

### TASK 6: Verify Sync

```bash
# List what was copied
echo "=== SYNC VERIFICATION ==="
echo "Automation script:"
ls -lh /home/user/project-orion/wolf-daemon/lyra-automation-UPGRADE.py

echo "Research data:"
ls -lh /home/user/project-orion/data/raziskave.json

echo "React sync:"
ls -lh /home/user/project-orion/orion-svetilnik/src/data/raziskave.json
ls -lh /home/user/project-orion/orion-svetilnik/src/types/raziskava.ts

echo "Research seeds:"
ls -lh /home/user/project-orion/Dumps/research/

echo "HTML pages:"
ls -d /home/user/project-orion/raziskave/*/ 2>/dev/null || echo "No HTML pages"
```

---

## 📊 DELIVERABLE:

**When you finish, send:**

```
[DESKTOP-CLAUDE] Sync Complete!

Files synced from ProPublica to project-orion:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ wolf-daemon/lyra-automation-UPGRADE.py (Production automation)
✅ data/raziskave.json (9 raziskav)
✅ orion-svetilnik/src/data/raziskave.json (React sync)
✅ orion-svetilnik/src/types/raziskava.ts (TypeScript types)
✅ Dumps/research/*.md (3 research seeds)
✅ raziskave/*/index.html (6 HTML pages)

Total files synced: X files
Sync location: /home/user/project-orion/
Status: ✅ Ready for Git commit

Next: Git miška can now commit Codex work!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[DESKTOP-CLAUDE] → [GIT-MISKA]: Files synced, ready for commit.
Use prompt: 02_GIT_MISKA_COMMIT_CODEX.md
```

---

## 🜂 IMPORTANT:

- ✅ You DON'T modify files - just copy them
- ✅ You DON'T commit to git - Git miška does that
- ✅ You DON'T run npm install - Git miška does that
- ✅ You ONLY sync files between locations

**Your role:** COORDINATOR. Make sure files are in the right place!

---

🖥️ **READY? Execute all tasks and report back!** 🖥️
