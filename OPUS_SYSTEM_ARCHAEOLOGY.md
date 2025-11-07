# 🜂 OPUS 4.1 - SYSTEM ARCHAEOLOGIST PROTOCOL 🜂

**Purpose:** Deep system scan to map ALL projects (not just Orion!), find duplicates, and create consolidation plan.

**Use case:** When you have scattered projects across your machine and want to organize EVERYTHING into one coherent structure.

**How to use:** Copy this entire prompt and send to Opus 4.1 (or Codex if Opus quota low).

**WARNING:** This uses significant token quota! Only use when ready for full cleanup.

---

## 🎯 THE PROMPT:

```
🜂 OPUS 4.1 - SYSTEM ARCHAEOLOGIST PROTOCOL 🜂

You are conducting a DEEP SYSTEM SCAN to map all projects, code, research, and fragments across this machine.

# YOUR MISSION:
Analyze the entire file system and create a CONSOLIDATION PLAN.

# SCAN PARAMETERS:

## What to find:
- All project folders (web apps, research, code experiments)
- Duplicate projects (same name, similar structure in different locations)
- Fragment projects (started but incomplete)
- Research files (markdown, txt, PDFs with notes)
- Code repos (git initialized or not)
- Configuration files (.env, config.json, etc.)
- Assets scattered across system (images, data, docs)

## Where to scan:
- ~/Desktop/*
- ~/Documents/*
- ~/Downloads/* (often has forgotten projects!)
- ~/Projects/* (if exists)
- /home/saba/* (all subdirectories)
- /home/user/* (check for orphaned projects)
- Any other dev locations you detect

## What to ignore:
- System files (/System, /Library, /Applications, /usr, /bin, /etc)
- node_modules (just note which projects have them)
- .git folders (but note which projects ARE git repos)
- Cache/temp files
- Browser data
- OS internals

# SCAN DEPTH:

Go DEEP. For each project found:

**1. IDENTIFY:**
- What IS it? (read package.json, README, main files to understand)
- What LANGUAGE? (Python, JavaScript, Rust, Go, HTML, etc.)
- What PURPOSE? (research tool, web app, experiment, automation, etc.)

**2. ANALYZE:**
- What STATE is it in? (complete/working, fragment, abandoned, broken)
- Last modified date
- File size
- Dependencies present?
- Git status (repo? remote? uncommitted changes?)

**3. RELATE:**
- Is this a DUPLICATE of another project?
- Is this a FRAGMENT of a larger project?
- Is this RELATED to other projects (same domain)?
- Should it be MERGED with something else?

# OUTPUT FORMAT:

## PART 1: DISCOVERY REPORT (Human-readable)

```
🔍 SYSTEM ARCHAEOLOGY REPORT
Generated: [timestamp]
Scan depth: [how many directories analyzed]
Machine: [hostname]

📊 OVERVIEW:

- Total projects found: X
- Web apps: X
- Python projects: X
- Research collections: X
- Duplicate sets: X
- Fragment projects: X
- Git repositories: X (Y with remotes)
- Orphaned experiments: X
- Total size: X GB

🗂️ PROJECT INVENTORY:

[For EACH project found, provide this structure:]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: [name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: [full path]
Type: [web app / python tool / research / experiment / config / unknown]
Language: [JavaScript/Python/Rust/Go/HTML/Multiple/None]
Status: [✅ complete / 🔨 active / 📦 fragment / 💤 abandoned / ❌ broken]
Last modified: [date] ([X days ago])
Size: [MB/GB]
Git status: [✅ initialized + remote / 🔸 initialized only / ❌ not tracked]
Dependencies: [package.json? requirements.txt? Cargo.toml? None?]

What it does: [1-2 sentence description based on files/README]

Related projects:
- [Duplicate of]: [path] - [why similar]
- [Fragment of]: [path] - [relationship]
- [Related to]: [path] - [connection]

Recommendation: [keep / archive / merge / delete-safe]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[REPEAT for ALL projects]

🔄 DUPLICATE ANALYSIS:

[Group all duplicates together:]

DUPLICATE SET 1: [project name/concept]
├── Primary (most recent): [path] - Last modified: [date]
├── Duplicate 1: [path] - [why likely duplicate] - [older by X days]
└── Duplicate 2: [path] - [why likely duplicate] - [older by Y days]

Recommendation: Keep primary, archive duplicates to ~/ConsolidatedProjects/Archive/

DUPLICATE SET 2: [next set...]
...

📁 CONSOLIDATION RECOMMENDATION:

Proposed structure:

```
~/ConsolidatedProjects/
├── Active/                 (currently working on - last modified <30 days)
│   ├── projekt-orion/      (research platform - main project)
│   ├── tools/              (active automation tools)
│   └── experiments/        (current learning projects)
│
├── Research/               (all research content, notes, sources)
│   ├── client-briefs/
│   ├── research-notes/
│   └── sources/
│
├── Complete/              (finished, working projects)
│   ├── web-apps/
│   ├── tools/
│   └── scripts/
│
├── Experiments/           (fragments, learning, incomplete)
│   ├── python-experiments/
│   ├── web-experiments/
│   └── ai-experiments/
│
├── Archive/               (duplicates, old versions, outdated)
│   ├── projekt-orion-v1/
│   ├── old-tools/
│   └── deprecated/
│
└── Assets/                (shared resources)
    ├── images/
    ├── data/
    └── configs/
```

Reasoning for this structure:
[Explain the logic - why these categories, how projects fit, etc.]

Alternative structures considered:
[Any other options you evaluated]

```

## PART 2: CODEX EXECUTION INSTRUCTIONS (Machine-readable JSON)

```json
{
  "scan_summary": {
    "timestamp": "2025-11-07T05:45:00Z",
    "total_projects": 23,
    "duplicates": 3,
    "fragments": 7,
    "complete_projects": 8,
    "abandoned_projects": 5,
    "total_size_gb": 4.2,
    "git_repos": 12,
    "git_with_remotes": 6
  },
  "consolidation_plan": {
    "target_root": "~/ConsolidatedProjects",
    "structure": [
      "Active",
      "Research",
      "Complete",
      "Experiments",
      "Archive",
      "Assets"
    ]
  },
  "operations": [
    {
      "op": "move",
      "source": "/home/saba/Desktop/ProPublica",
      "destination": "~/ConsolidatedProjects/Active/projekt-orion",
      "reason": "Main active project, most recent work",
      "priority": 1,
      "safe": true,
      "backup_first": true
    },
    {
      "op": "move",
      "source": "/home/saba/Documents/research-notes",
      "destination": "~/ConsolidatedProjects/Research/research-notes",
      "reason": "Active research collection, frequently updated",
      "priority": 2,
      "safe": true,
      "backup_first": true
    },
    {
      "op": "copy",
      "source": "/home/saba/Desktop/old-project-version",
      "destination": "~/ConsolidatedProjects/Archive/old-project-version",
      "reason": "Older duplicate, preserve for reference",
      "priority": 5,
      "safe": true,
      "backup_first": false
    },
    {
      "op": "merge",
      "sources": [
        "/home/saba/Documents/client-briefs",
        "/home/saba/Downloads/client-briefs-2024"
      ],
      "destination": "~/ConsolidatedProjects/Research/client-briefs",
      "reason": "Related research files scattered across locations",
      "priority": 3,
      "safe": true,
      "backup_first": true,
      "merge_strategy": "combine_and_deduplicate"
    }
  ],
  "git_operations": [
    {
      "project": "~/ConsolidatedProjects/Active/projekt-orion",
      "action": "verify_status",
      "reason": "Check for uncommitted changes before move"
    },
    {
      "project": "~/ConsolidatedProjects/Experiments/ai-tools",
      "action": "init",
      "reason": "Useful experiments, should be tracked"
    },
    {
      "project": "~/ConsolidatedProjects/Complete/working-tool",
      "action": "add_remote",
      "remote_name": "origin",
      "remote_url": "https://github.com/SabaFTW/[repo-name].git",
      "reason": "Complete project needs GitHub backup"
    }
  ],
  "cleanup": [
    {
      "path": "/home/saba/Downloads/old-empty-folder",
      "action": "remove",
      "safe": true,
      "reason": "Empty folder, no content to preserve"
    },
    {
      "path": "/home/saba/Desktop/duplicate-project-backup",
      "action": "archive_then_remove",
      "safe": true,
      "reason": "Duplicate archived to ConsolidatedProjects/Archive, safe to clean"
    }
  ]
}
```

# CRITICAL SAFETY RULES:

1. **NEVER delete anything without explicit human approval**
2. **NEVER move/modify system files**
3. **ALWAYS preserve at least one copy of everything**
4. **ALWAYS backup before move (for important projects)**
5. **Flag anything you're unsure about**
6. **Prioritize safety over efficiency**
7. **If in doubt, COPY instead of MOVE**
8. **Check git status before moving repos**

# REPORTING FORMAT:

As you scan, report progress in real-time:

```
[SCANNING] ~/Desktop... (23 items)
[FOUND] Project: "projekt-orion" at ~/Desktop/ProPublica
  → Type: web app, Status: active, Size: 125MB, Git: ✅ with remote
[ANALYZING] Reading package.json, checking last modified...
  → Last modified: 2 days ago
  → Dependencies: Node.js (React + Vite)
  → Assessment: Primary active project
[DUPLICATE] Found similar project at ~/Documents/old-orion
  → Assessment: Older version (45 days old), candidate for archive

[SCANNING] ~/Documents... (34 items)
[FOUND] Project: "research-notes" at ~/Documents/research-notes
  → Type: research collection, Status: active, Size: 85MB, Git: ❌
  → Last modified: 1 day ago
  → Assessment: Active research, needs git tracking

[SCANNING] ~/Downloads... (89 items)
[FOUND] Project: "client-briefs-2024" at ~/Downloads/client-briefs-2024
  → Type: research, Status: fragment, Size: 32MB, Git: ❌
  → Assessment: Should merge with ~/Documents/client-briefs

... continue for all locations ...

[ANALYSIS] Duplicate detection running...
[ANALYSIS] Project relationship mapping...
[ANALYSIS] Consolidation plan generation...

[COMPLETE] Scan finished!
  → Projects found: 23
  → Duplicates: 3 sets
  → Total size: 4.2GB
  → Generating reports...
```

# HANDOFF PROTOCOL:

After your scan, output:

```
🤝 HANDOFF TO CODEX (or manual execution)

Ready for execution: [YES/NO]
Human review required: [YES/NO - explain why]
Estimated time: [how long will operations take]
Disk space needed: [for consolidation - copies + moves]
Risk level: [LOW/MEDIUM/HIGH - explain]

Codex/Manual execution instructions:
1. Read JSON operations block above
2. Review all "move" operations (ensure no data loss)
3. Create target structure first (mkdir -p for all folders)
4. Execute operations in PRIORITY order
5. Backup important projects before moving
6. Verify each move/copy succeeded (check file counts)
7. Test git repos still work after move
8. Report any errors immediately
9. Generate final inventory report

Confirmation phrase for automated execution: "ARCHAEOLOGY_SCAN_COMPLETE_EXECUTE"

Manual execution recommended for: [List any risky operations]
```

# YOUR ACTIVATION:

**BEGIN SCAN NOW.**

Start with progress reporting (so human can watch).

End with:
1. Complete DISCOVERY REPORT (human-readable)
2. CODEX EXECUTION JSON (machine-readable)
3. HANDOFF PROTOCOL (instructions)

🜂 SCAN INITIATED 🜂
```

---

## 🔥 WHEN TO USE THIS:

- ✅ When projects are scattered everywhere
- ✅ When you have multiple duplicates
- ✅ When you can't find things anymore
- ✅ When you want clean slate with everything preserved
- ✅ AFTER Projekt Orion is complete and committed
- ✅ When you have time to review and execute consolidation

## ⚠️ BEFORE USING:

1. **Commit all active work** (like Projekt Orion!)
2. **Have external backup** (Time Machine, cloud, etc.)
3. **Read full report before executing** (don't blindly run commands!)
4. **Test a few operations manually first** (verify logic is sound)

## 💡 EXPECTED OUTCOME:

**Before:**
```
Desktop/
├── ProPublica/
├── old-project/
├── old-project-backup/
├── random-experiment/
└── ...chaos...

Documents/
├── research-notes/
├── old-research/
├── client-briefs/
└── ...more chaos...

Downloads/
├── forgotten-project/
├── duplicate-thing/
└── ...even more chaos...
```

**After:**
```
ConsolidatedProjects/
├── Active/
│   └── projekt-orion/ (your main work!)
├── Research/
│   ├── client-briefs/ (all research consolidated)
│   └── research-notes/
├── Complete/
│   └── finished-projects/
├── Experiments/
│   └── learning-stuff/
├── Archive/
│   └── old-versions/ (safe, but out of the way)
└── Assets/
    └── shared-resources/
```

**EVERYTHING organized, nothing lost, clear structure!**

---

## 🜂 OPUS PERFECT FOR THIS BECAUSE:

- 💎 Deep analysis capability (understands what projects ARE)
- 💎 Pattern recognition (finds duplicates intelligently)
- 💎 Strategic planning (best consolidation structure)
- 💎 Comprehensive reasoning (explains all decisions)
- 💎 Safety-first approach (never risks data loss)

## 💰 TOKEN COST ESTIMATE:

- **Scan phase:** ~50K tokens (Opus reads many files)
- **Analysis phase:** ~30K tokens (duplicate detection, relationship mapping)
- **Report generation:** ~20K tokens (comprehensive output)
- **Total:** ~100K tokens = **500K weekly tokens** (Opus 5:1 ratio)

**This is a BIG scan!** Use when you have quota and really need full cleanup.

---

## 🚀 READY TO USE?

**Step 1:** Make sure Projekt Orion is complete and committed ✅

**Step 2:** Copy ENTIRE prompt above (from "🜂 OPUS 4.1..." to "...SCAN INITIATED 🜂")

**Step 3:** Send to Opus 4.1 (or Codex if quota low)

**Step 4:** Watch progress reports

**Step 5:** Review DISCOVERY REPORT thoroughly

**Step 6:** Execute operations manually or via Codex

**Step 7:** Verify everything succeeded

**Step 8:** Enjoy clean, organized system! 🎉

---

*Save this file for when you're ready for FULL system cleanup!*

🜂 **ARCHAEOLOGY MODE: READY WHEN YOU ARE!** 🜂
