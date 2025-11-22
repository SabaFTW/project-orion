# 🤖 CLAUDE.md - AI Assistant Guide for Project Orion

**Last Updated**: 2025-11-22
**Version**: 1.0
**Repository**: project-orion (ProPublica Research Platform)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Codebase Architecture](#codebase-architecture)
3. [Key Conventions](#key-conventions)
4. [Development Workflows](#development-workflows)
5. [File Structure](#file-structure)
6. [Technology Stack](#technology-stack)
7. [Common Tasks](#common-tasks)
8. [Git Workflow](#git-workflow)
9. [Multi-Agent Collaboration](#multi-agent-collaboration)
10. [Testing & Deployment](#testing--deployment)
11. [Critical Files Reference](#critical-files-reference)

---

## 🎯 Project Overview

### What is Project Orion?

**Project Orion** (also known as **LYRA ACTIVE Research Hub**) is an interactive environmental justice platform that:

- Compares public promises with real data from corporations and institutions
- Maps networks of power and influence
- Enables citizen action through data transparency
- Tracks environmental hypocrisy using the **Environmental Hypocrisy Index (EHI)**

### Core Mission

Expose environmental greenwashing by comparing **promises** (corporate sustainability reports) with **reality** (actual emissions data from ARSO, E-PRTR).

### Primary Focus Area

**Sava River Basin** - Tracking industrial pollution from:
- Holcim Anhovo (cement)
- SIJ Acroni (steel)
- Cinkarna Celje (chemicals)
- NEK Krško (nuclear power plant)

---

## 🏗️ Codebase Architecture

### Dual Architecture Approach

The project maintains **two parallel implementations**:

#### 1. **Vanilla JS Version** (`/orion/`)
- **Purpose**: Lightweight, no-build deployment
- **Tech**: Pure HTML/CSS/JavaScript + Tailwind CSS (CDN) + Leaflet
- **Use Case**: Quick research additions, simple hosting
- **Deploy**: Drag & drop to Netlify/Vercel/GitHub Pages

#### 2. **React TypeScript Version** (`/orion-react/`)
- **Purpose**: Advanced features, AI integration, type safety
- **Tech**: React 18 + TypeScript + Vite + Tailwind + Leaflet
- **Use Case**: Complex interactions, AI analyst modal, dashboard
- **Deploy**: Build required (Vite), deploy to Vercel

### The "Five Domains" System

Both versions implement **5 core domains**:

1. **🗺️ Zemljevid Resnice** (Map of Truth)
   - Interactive Leaflet map of Sava River
   - Industrial site markers with EHI color coding
   - Animated river flow visualization

2. **⏳ Časovna Linija** (Timeline)
   - Historical analysis 1960-2025
   - Promises vs. reality events
   - Color-coded (green = promise, red = reality)

3. **🕸️ Omrežja Moči** (Networks of Power)
   - Financial connections mapping
   - Corporate influence visualization
   - Actor network analysis

4. **⚡ Akcijski Center** (Action Center)
   - ZDIJZ (freedom of information) request templates
   - Independent testing guides
   - Political pressure campaigns
   - Media outreach strategies

5. **🌍 Karta Resonanc** (Resonance Map)
   - Cross-reference visualization
   - Embedded interactive map

---

## 🎨 Key Conventions

### Environmental Hypocrisy Index (EHI)

**Formula**: `(promise_score - reality_score) / promise_score`

**Color Coding**:
```javascript
if (ehi >= 0.8) return 'text-red-400';      // Critical (80-100%)
if (ehi >= 0.6) return 'text-orange-400';   // High (60-79%)
if (ehi >= 0.4) return 'text-yellow-400';   // Moderate (40-59%)
return 'text-green-400';                     // Low (0-39%)
```

**Examples**:
- Holcim Anhovo: 0.89 (Critical)
- SIJ Acroni: 0.62 (High)
- Cinkarna Celje: 0.60 (High)
- NEK Krško: 0.42 (Moderate)

### File Naming Conventions

**Research Files**:
- Use tags: `[surveillance-tech]_palantir.md`
- Slugs: `holcim-emissions-crisis` (lowercase, hyphenated)
- Data files: `data.json` (consistent name in each raziskava folder)

**Categories**:
- `surveillance-tech`
- `financial-secrecy`
- `institutional-capture`
- `environmental-crime`
- `ai-ethics`
- `geopolitics`
- `corporate-crime`

### Commit Message Format

```
[AGENT-NAME]: Brief description

Detailed explanation:
- What changed
- Why it changed
- What's next

Tags:
[INFRASTRUCTURE]: Setup/cleanup
[CODEX-IMPL]: Implementing automation features
[GEMINI-IMPL]: Implementing visual designs
[BUGFIX]: Fixing errors
[DOCS]: Documentation updates
```

### Data Structure (raziskave.json)

```json
{
  "id": 4,
  "title": "Company Name - Research Title",
  "slug": "company-name-research",
  "category": "Kemija",
  "location": "City Name",
  "ehi": 0.78,
  "promise": "What they publicly promised...",
  "reality": "What actually happened...",
  "description": "Brief summary of the research",
  "date": "2025-11-22",
  "featured": true,
  "tags": ["tag1", "tag2", "tag3"],
  "lat": 46.2388,
  "lon": 14.3547,
  "emissions": {
    "co2": 180000,
    "nox": 450,
    "microplastics": 5000
  },
  "sources": [
    "ARSO Report 2024",
    "E-PRTR 2023",
    "Company Sustainability Report 2024"
  ],
  "author": "Projekt Orion",
  "lastUpdated": "2025-11-22"
}
```

---

## 🔄 Development Workflows

### Workflow 1: Adding a Basic Research (5 minutes)

**Use When**: Simple research with basic data, no complex visualizations needed

1. Open `/orion/data/raziskave.json`
2. Add new object to array (use template above)
3. Save file
4. **Done!** Research automatically appears on site

**No rebuild required** - vanilla JS loads JSON dynamically.

### Workflow 2: Adding Detailed Research Page (15 minutes)

**Use When**: Complex research with analysis, graphs, detailed findings

1. Copy template:
   ```bash
   cp -r orion/raziskave/template/ orion/raziskave/new-slug/
   ```

2. Edit `orion/raziskave/new-slug/index.html`:
   - Replace all `[PLACEHOLDER]` values
   - Update title, location, category, date
   - Fill in promise, reality, analysis sections

3. Edit `orion/raziskave/new-slug/data.json`:
   - Update metadata

4. Add to main database (`orion/data/raziskave.json`)

5. Test locally:
   ```bash
   cd orion
   python -m http.server 8080
   ```

### Workflow 3: Using Python Automation (LYRA)

**Use When**: Processing multiple research files at once

**Location**: `/Dumps/lyra-automation-UPGRADE.py`

**Process**:
1. Drop files into `Dumps/{research,pdfs,audio,images}/`
2. Run automation:
   ```bash
   cd Dumps
   python3 lyra-automation-UPGRADE.py --add
   ```
3. Script automatically:
   - Parses coordinates, EHI, categories
   - Generates HTML pages in `orion/raziskave/<slug>/`
   - Syncs to both `orion/data/raziskave.json` and `orion-react/src/data/raziskave.json`
   - Creates TypeScript interfaces if missing

**Command Options**:
- `--scan`: Preview what would be processed
- `--add`: Process and add new research
- `--force`: Overwrite existing research
- `--backup`: Create backup before processing

### Workflow 4: React Component Development

**Use When**: Building interactive features, AI integration, complex UI

1. Create component:
   ```bash
   cd orion-react/src/components
   nano NewComponent.tsx
   ```

2. Follow existing patterns:
   - Import React, types
   - Use Tailwind for styling
   - Follow TypeScript conventions

3. Test with dev server:
   ```bash
   cd orion-react
   npm run dev
   # Opens on http://localhost:5173
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 File Structure

```
/home/user/project-orion/
│
├── 📄 README.md                          # Main project documentation
├── 📄 .gitignore                         # Git ignore rules
│
├── 📁 orion/                             # Vanilla JS implementation
│   ├── index.html                        # Main landing page
│   ├── manifest.json                     # PWA manifest
│   ├── sw.js                             # Service worker (offline support)
│   │
│   ├── 📁 css/
│   │   └── style.css                     # Custom styles, animations, EHI colors
│   │
│   ├── 📁 js/
│   │   ├── app.js                        # Main application logic
│   │   └── 📁 components/                # Modular components
│   │       ├── zemljevid.js              # Map component
│   │       ├── casovnica.js              # Timeline component
│   │       ├── omrezja.js                # Networks component
│   │       ├── akcije.js                 # Action center
│   │       └── karta.js                  # Resonance map
│   │
│   ├── 📁 data/
│   │   └── raziskave.json                # Main research database
│   │
│   └── 📁 raziskave/                     # Individual research pages
│       ├── template/                     # Template for new research
│       ├── sij-greenwashing/
│       ├── holcim-emissions/
│       └── nek-upgrade/
│
├── 📁 orion-react/                       # React TypeScript implementation
│   ├── package.json                      # Dependencies
│   ├── vite.config.ts                    # Vite configuration
│   ├── tsconfig.json                     # TypeScript config
│   ├── tailwind.config.js                # Tailwind CSS config
│   │
│   └── 📁 src/
│       ├── main.tsx                      # Entry point
│       ├── App.tsx                       # Main component
│       ├── index.css                     # Global styles
│       ├── design-tokens.css             # Design system tokens
│       │
│       ├── 📁 components/
│       │   ├── ZemljevidResnice.tsx      # Map component
│       │   ├── AIAnalystModal.tsx        # AI chat modal
│       │   ├── EHIMetrics.tsx            # EHI dashboard
│       │   ├── ResearchCard.tsx          # Research card component
│       │   └── WeatherWidget.tsx         # ARSO weather widget
│       │
│       ├── 📁 data/
│       │   └── raziskave.json            # Synced research database
│       │
│       └── 📁 types/
│           └── raziskava.ts              # TypeScript interfaces
│
├── 📁 Dumps/                             # Research intake & automation
│   ├── lyra-automation-UPGRADE.py        # Main automation script
│   ├── lyra-automation.py                # Legacy automation
│   ├── AUTOMATION_GUIDE.md               # Automation documentation
│   │
│   ├── 📁 research/                      # Markdown research files
│   ├── 📁 pdfs/                          # PDF documents
│   ├── 📁 audio/                         # Audio briefings (.mp3)
│   ├── 📁 images/                        # Charts, diagrams, photos
│   └── 📁 data/
│       └── research-index.json           # Research file index
│
├── 📁 wolf-daemon/                       # Python backend scripts
│   ├── arso_connector.py                 # ARSO API connector
│   ├── zdijz_template.txt                # ZDIJZ request template
│   └── requirements.txt                  # Python dependencies
│
├── 📁 social-blitz/                      # Marketing campaigns
│   ├── x-thread.md                       # X/Twitter threads
│   ├── telegram-campaign.md              # Telegram templates
│   └── 📁 assets/                        # Infographics, memes
│
├── 📁 docs/                              # Legacy documentation
│
└── 📁 data/                              # Global data files
    ├── INCOME_TRACKER.json
    ├── GHOSTLINE_QUEST_LOG.json
    ├── QUEST_CATEGORIES.md
    └── orion_strike_one.md               # Original Sava River analysis
```

---

## 🛠️ Technology Stack

### Frontend (Vanilla JS)
- **HTML5** - Semantic markup
- **Tailwind CSS 3.4+** - Utility-first CSS (CDN)
- **Vanilla JavaScript** - No framework
- **Leaflet.js 1.9.4** - Interactive maps (CDN)
- **Chart.js** - Data visualization (where used)

### Frontend (React)
- **React 18.2** - UI library
- **TypeScript 5.2** - Type safety
- **Vite 5.0** - Build tool & dev server
- **Tailwind CSS 3.4** - Styling
- **React Leaflet 4.2** - Map integration
- **Chart.js + react-chartjs-2** - Graphs

### Backend
- **Python 3.10+** - Automation scripts
- **requests** - HTTP library
- **xml.etree** - XML parsing (ARSO data)
- **Pillow (PIL)** - Image processing
- **PyYAML** - YAML parsing (optional)

### Data Sources
- **ARSO** (Slovenian Environment Agency) - Water quality, emissions
- **E-PRTR** (European Pollutant Release and Transfer Register) - Industrial emissions
- **Corporate Reports** - Sustainability reports, annual reports

### Deployment
- **GitHub Pages** - Static hosting
- **Netlify** - Drag & drop deployment
- **Vercel** - React app deployment (recommended)

---

## 💼 Common Tasks

### Task: Add New Research (JSON Only)

```bash
# 1. Open research database
nano /home/user/project-orion/orion/data/raziskave.json

# 2. Add entry using the template from "Key Conventions" section

# 3. Validate JSON
python3 -m json.tool orion/data/raziskave.json

# 4. Test locally
cd orion
python -m http.server 8080
```

### Task: Test React App

```bash
cd /home/user/project-orion/orion-react

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Task: Fetch ARSO Data

```bash
cd /home/user/project-orion/wolf-daemon

# Install requirements (first time only)
pip install -r requirements.txt

# Run ARSO connector
python3 arso_connector.py

# Output: JSON data from ARSO API
```

### Task: Run Automation Script

```bash
cd /home/user/project-orion/Dumps

# Preview what would be processed
python3 lyra-automation-UPGRADE.py --scan

# Process and add new research
python3 lyra-automation-UPGRADE.py --add

# Force overwrite existing
python3 lyra-automation-UPGRADE.py --force

# Create backup first
python3 lyra-automation-UPGRADE.py --backup
```

### Task: Find Coordinates for Location

**Option 1**: Use https://www.latlong.net/
1. Enter address or company name
2. Copy lat/lon values
3. Use as numbers (not strings) in JSON

**Option 2**: Use Google Maps
1. Right-click location on map
2. Click coordinates to copy
3. Format: `lat, lon`

### Task: Validate JSON Files

```bash
# Check syntax
python3 -m json.tool orion/data/raziskave.json

# If error, shows line number
# If OK, pretty-prints JSON
```

### Task: Clear Service Worker Cache

```bash
# In browser:
# F12 → Application → Clear storage → Clear site data
# Then: Ctrl+Shift+R (hard refresh)
```

---

## 🔀 Git Workflow

### Branch Strategy

**Main Branch**: `main` (or `master`)
- Production-ready code
- Always deployable
- Protected (no direct commits in ideal setup)

**Feature Branches**: `feature/<feature-name>`
- `feature/codex-automation-upgrade`
- `feature/gemini-visual-system`
- `feature/new-research-xyz`

**Backup Branches**: `backup/<date>`
- `backup/pre-codex-gemini-20251122`
- Created before major changes

### Commit Workflow

```bash
# 1. Check current status
git status

# 2. Create feature branch (if new feature)
git checkout -b feature/my-feature

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "[FEATURE]: Brief description

Detailed explanation:
- What changed
- Why it changed
- What's next
"

# 5. Push to remote
git push -u origin feature/my-feature

# 6. Merge to main (after testing)
git checkout main
git merge feature/my-feature

# 7. Push main
git push origin main
```

### Safety Protocols

**ALWAYS**:
- ✅ Create backup branch before major changes
- ✅ Commit current state before new work
- ✅ Test after implementing changes
- ✅ Use descriptive commit messages
- ✅ Check `git status` before commits

**NEVER**:
- ❌ Force push without explicit permission
- ❌ Delete files without backup
- ❌ Commit secrets (.env, API keys)
- ❌ Skip testing before merge
- ❌ Use `--no-verify` on hooks

### Creating Safe Checkpoints

```bash
# Before major work
git checkout -b backup/$(date +%Y%m%d-%H%M)
git checkout main

# If something goes wrong
git checkout backup/20251122-1430
```

---

## 🤝 Multi-Agent Collaboration

### Agent Roles in Project Orion

This project uses a **multi-agent constellation** approach:

1. **🖥️ Claude Code (Git Guardian)**
   - **Role**: Git operations, infrastructure, terminal commands
   - **Responsibilities**: Commits, branches, deployment scripts, file organization
   - **When to use**: Git conflicts, deployment issues, dependency management

2. **🧠 Codex/GPT (Logic Engine)**
   - **Role**: Complex algorithms, automation scripts
   - **Responsibilities**: Python scripts, data processing, automation logic
   - **When to use**: Building automation, data parsing, complex calculations

3. **💎 Gemini (Visual Designer)**
   - **Role**: Visual design, UI/UX, design systems
   - **Responsibilities**: Color palettes, component design, layouts
   - **When to use**: Visual styling, design tokens, component aesthetics

4. **💬 ChatGPT (Content Creator)**
   - **Role**: Copy writing, documentation, content
   - **Responsibilities**: Research descriptions, social media copy, documentation
   - **When to use**: Writing content, social campaigns, documentation

5. **🖥️ Desktop Claude (Coordinator)**
   - **Role**: Big picture strategy, coordination
   - **Responsibilities**: Project planning, agent coordination, decision-making
   - **When to use**: Strategic decisions, cross-agent coordination

### Inter-Agent Communication

**Status Messages**:
```
[CLAUDE-CODE] Infrastructure ready, clean workspace prepared.
[CODEX] Automation script v2.0 complete, ready for testing.
[GEMINI] Visual design tokens delivered, ready for implementation.
[DESKTOP-CLAUDE] All systems go, proceeding with deployment.
```

**Handoff Protocol**:
1. Completing agent announces completion with deliverables
2. Next agent confirms receipt and begins work
3. Issues are escalated to Desktop Claude (coordinator)

### Execution Order Documents

The project includes phased execution guides:
- `00_EXECUTION_ORDER.md` - Master execution plan
- `01_DESKTOP_CLAUDE_SYNC.md` - File synchronization phase
- `02_GIT_MISKA_COMMIT_CODEX.md` - Codex work commit phase
- `03_GIT_MISKA_IMPLEMENT_GEMINI.md` - Gemini implementation phase
- `04_GIT_MISKA_TEST_DEPLOY.md` - Testing and deployment phase

**Follow execution order when making major changes**.

---

## 🧪 Testing & Deployment

### Local Testing

**Vanilla JS Version**:
```bash
cd /home/user/project-orion/orion
python -m http.server 8080
# Open: http://localhost:8080
```

**React Version**:
```bash
cd /home/user/project-orion/orion-react
npm install  # First time only
npm run dev
# Open: http://localhost:5173
```

**Python Scripts**:
```bash
cd /home/user/project-orion/wolf-daemon
python3 arso_connector.py
```

### Testing Checklist

Before deployment, verify:

- [ ] All JSON files validate (`python3 -m json.tool <file>`)
- [ ] No console errors in browser (F12 → Console)
- [ ] Leaflet map loads correctly
- [ ] All research cards display
- [ ] EHI color coding works
- [ ] Links navigate correctly
- [ ] Mobile responsive (test different sizes)
- [ ] Service Worker works (offline mode)
- [ ] No broken images
- [ ] TypeScript compiles without errors (React version)

### Deployment Options

#### Option 1: GitHub Pages
```bash
# Push to main branch
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# Enable in GitHub:
# Settings → Pages → Source: main branch → Save
# URL: https://username.github.io/project-orion/
```

#### Option 2: Netlify (Easiest)
```bash
# Drag & drop method:
# 1. Go to https://app.netlify.com/drop
# 2. Drag /home/user/project-orion/ folder
# 3. Site is live immediately

# Or CLI:
npm install -g netlify-cli
cd /home/user/project-orion
netlify deploy --prod
```

#### Option 3: Vercel (Best for React)
```bash
npm install -g vercel
cd /home/user/project-orion/orion-react
vercel --prod
# Follow prompts
```

### Build Process (React Only)

```bash
cd /home/user/project-orion/orion-react

# Install dependencies
npm install

# Type check
npm run build  # Runs tsc && vite build

# Output: dist/ folder ready for deployment
```

---

## 📚 Critical Files Reference

### Must-Read Documentation

1. **`README.md`** - Project overview, quick start, module descriptions
2. **`MASTER_STRUKTURA.md`** - Complete file structure explanation
3. **`KAKO_RASTE.md`** - How to add research without rebuilding
4. **`00_EXECUTION_ORDER.md`** - Phased implementation guide
5. **`AUTOMATION_GUIDE.md`** - Lyra automation system

### Configuration Files

- **`orion-react/package.json`** - Dependencies and scripts
- **`orion-react/vite.config.ts`** - Vite build configuration
- **`orion-react/tsconfig.json`** - TypeScript compiler options
- **`orion-react/tailwind.config.js`** - Tailwind CSS configuration
- **`.gitignore`** - Git ignore patterns
- **`orion/manifest.json`** - PWA configuration

### Data Files

- **`orion/data/raziskave.json`** - Main research database (vanilla)
- **`orion-react/src/data/raziskave.json`** - Synced research database (React)
- **`Dumps/data/research-index.json`** - Research file index
- **`data/GHOSTLINE_QUEST_LOG.json`** - Quest tracking (legacy)

### Type Definitions

- **`orion-react/src/types/raziskava.ts`** - TypeScript interfaces for research data

### Templates

- **`orion/raziskave/template/`** - Template for new research pages
  - `index.html` - HTML structure with placeholders
  - `data.json` - JSON metadata template

### Automation Scripts

- **`Dumps/lyra-automation-UPGRADE.py`** - Production automation script
- **`wolf-daemon/arso_connector.py`** - ARSO data fetching

---

## 🎯 Best Practices for AI Assistants

### DO:

✅ **Read before modifying**: Always read files before editing (use Read tool)
✅ **Use templates**: Copy existing patterns for consistency
✅ **Test locally**: Verify changes work before committing
✅ **Validate JSON**: Always check JSON syntax after edits
✅ **Follow naming conventions**: Use slugs, tags, proper structure
✅ **Commit frequently**: Small, atomic commits with clear messages
✅ **Document changes**: Update documentation when adding features
✅ **Preserve structure**: Don't reorganize without explicit permission
✅ **Check existing docs**: Consult KAKO_RASTE.md, MASTER_STRUKTURA.md first
✅ **Use parallel implementations**: Update both vanilla JS and React versions when applicable

### DON'T:

❌ **Don't create new files unnecessarily**: Prefer editing existing files
❌ **Don't rebuild from scratch**: Use incremental updates
❌ **Don't skip testing**: Always test before marking complete
❌ **Don't hardcode API keys**: Use environment variables
❌ **Don't ignore .gitignore**: Respect git ignore patterns
❌ **Don't force push**: Unless explicitly requested
❌ **Don't delete without backup**: Create backup branches first
❌ **Don't break naming conventions**: Follow established patterns
❌ **Don't commit node_modules**: Check .gitignore
❌ **Don't over-engineer**: Keep solutions simple and focused

### When Uncertain:

1. **Read documentation first**: Check MASTER_STRUKTURA.md, KAKO_RASTE.md
2. **Look for examples**: Find similar code/research in the codebase
3. **Test incrementally**: Make small changes and verify
4. **Ask for clarification**: Use questions if requirements are ambiguous
5. **Create backup**: Make checkpoint branch before major changes

---

## 🔍 Quick Reference Commands

### File Operations
```bash
# Find TypeScript files
find orion-react/src -name "*.tsx"

# Search for keyword in code
grep -r "EHI" orion/js/

# Check file size
du -sh orion-react/

# Validate JSON
python3 -m json.tool orion/data/raziskave.json
```

### Git Operations
```bash
# Status check
git status
git log --oneline -10

# Create feature branch
git checkout -b feature/my-feature

# Commit
git add .
git commit -m "[TAG]: Message"

# Merge
git checkout main
git merge feature/my-feature

# Backup
git branch backup/$(date +%Y%m%d)
```

### Development Servers
```bash
# Vanilla JS
cd orion && python -m http.server 8080

# React dev
cd orion-react && npm run dev

# React build
cd orion-react && npm run build

# React preview
cd orion-react && npm run preview
```

### Dependency Management
```bash
# React dependencies
cd orion-react
npm install                 # Install all
npm install <package>       # Add new
npm outdated               # Check updates

# Python dependencies
cd wolf-daemon
pip install -r requirements.txt
```

---

## 🌟 Project Philosophy

### Core Principles

1. **Transparency Over Obfuscation** - Make data accessible and understandable
2. **Action Over Outrage** - Provide tools for citizen action, not just information
3. **Evidence Over Claims** - Always cite sources, compare promises to reality
4. **Simplicity Over Complexity** - Keep UX simple, deployment easy
5. **Resilience Over Perfection** - Multiple formats (vanilla + React) ensure longevity

### The "Constellation Mode"

This project embraces **multi-agent collaboration**:
- Each AI has specialized strengths
- Coordination happens through clear protocols
- Handoffs are explicit and documented
- Backups ensure safety during transitions

### Environmental Mission

**"Sava teče, plamen gori – raztrgajmo meglo."**
("The Sava flows, the flame burns – let's tear through the fog.")

The project exposes environmental greenwashing by corporations along the Sava River, using the Environmental Hypocrisy Index (EHI) to quantify the gap between promises and reality.

---

## 📞 Support & Resources

### Documentation Hierarchy

1. **This file (CLAUDE.md)** - AI assistant guide
2. **README.md** - Human-readable project overview
3. **MASTER_STRUKTURA.md** - Complete structure explanation
4. **KAKO_RASTE.md** - Growth/expansion guide
5. **AUTOMATION_GUIDE.md** - Automation workflows

### When Stuck

1. Check `MASTER_STRUKTURA.md` for file locations
2. Check `KAKO_RASTE.md` for how to add content
3. Look at existing examples in the codebase
4. Validate JSON with `python3 -m json.tool`
5. Check browser console (F12) for errors
6. Review git history: `git log --oneline`

### External Resources

- **ARSO API**: https://gis.arso.gov.si/
- **E-PRTR Database**: https://prtr.eea.europa.eu/
- **Leaflet Docs**: https://leafletjs.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

---

## 🎓 Learning the Codebase

### Recommended Exploration Order

1. **Start here**: `README.md` - Get project overview
2. **Understand structure**: `MASTER_STRUKTURA.md` - Map the codebase
3. **See data format**: `orion/data/raziskave.json` - Study research structure
4. **Explore vanilla version**: `orion/index.html` + `orion/js/app.js`
5. **Explore React version**: `orion-react/src/App.tsx` + components
6. **Check automation**: `Dumps/lyra-automation-UPGRADE.py` - See how research is added
7. **Review Git workflow**: `00_EXECUTION_ORDER.md` - Understand phased approach

### Key Concepts to Understand

- **EHI (Environmental Hypocrisy Index)**: Core metric comparing promises to reality
- **Five Domains**: The organizational structure of features
- **Dual Implementation**: Why both vanilla JS and React exist
- **Automation Pipeline**: How Dumps/ folder feeds into research database
- **Multi-Agent Constellation**: How different AIs collaborate on this project

---

**Version**: 1.0
**Last Updated**: 2025-11-22
**Maintained By**: Project Orion Team
**License**: Open source (MIT / open usage)

🜂 **"Burn bright, tear through the fog."** 🜂
