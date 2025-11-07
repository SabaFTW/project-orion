# 🧠 CODEX - FINAL IMPLEMENTATION & GIT COMMIT

**CODEX. LISTEN.**

You are **CODEX** - implementing the complete Projekt Orion system in `/home/saba/Desktop/ProPublica/`.

---

## 🎯 YOUR MISSION: IMPLEMENT & COMMIT EVERYTHING

**Context:**
- You already created automation upgrade (lyra-automation-UPGRADE.py) ✅
- Gemini designed visual system ✅
- Desktop Claude synced some files ✅
- **NOW:** You implement EVERYTHING in ProPublica folder and commit to git

**NO GitHub miška needed!** You work directly on real machine and commit yourself!

---

## 📂 WORKING DIRECTORY: `/home/saba/Desktop/ProPublica/`

This is the MAIN project folder. Everything happens here!

---

## 📋 YOUR TASKS:

### TASK 1: Initialize Git (if not already)

```bash
cd /home/saba/Desktop/ProPublica

# Check if git initialized
git status 2>/dev/null || git init

# Check remote
git remote -v

# If no remote, add it:
# git remote add origin https://github.com/SabaFTW/project-orion.git

# Verify we're on main
git branch
```

### TASK 2: Verify Current Structure

```bash
cd /home/saba/Desktop/ProPublica

# Check what exists
ls -la

# Specifically check:
ls -la Dumps/lyra-automation-UPGRADE.py
ls -la orion/data/raziskave.json
ls -la orion-react/src/
ls -la docs/
```

**Expected structure:**
```
ProPublica/
├── Dumps/
│   ├── lyra-automation-UPGRADE.py ✅ (you created this!)
│   └── research/ (seeds)
├── orion/
│   ├── data/raziskave.json ✅
│   └── raziskave/ (HTML pages)
├── orion-react/
│   ├── src/
│   │   ├── data/raziskave.json ✅
│   │   └── types/raziskava.ts ✅
│   └── package.json
├── wolf-daemon/ (Python backend)
├── social-blitz/ (Marketing)
├── docs/ (Documentation)
└── html/ (Static pages)
```

### TASK 3: Create Gemini Visual System Files

**IMPORTANT:** These files need to be created in `orion-react/` (or wherever React app is)!

#### 3.1 Create design-tokens.css

```bash
cat > orion-react/src/design-tokens.css << 'EOF'
/* 🎨 Projekt Orion - Design Tokens (Gemini Visual System v1.0) */

:root {
  /* Colors - Gemini Palette */
  --primary: #0FCCCE;      /* cyan-teal - trust, data, clarity */
  --secondary: #FF6B6B;    /* coral-red - warnings, critical */
  --background: #0A0E27;   /* deep navy - professional, focused */
  --surface: #151B3B;      /* lighter navy - cards stand out */
  --text-primary: #E8EAED; /* off-white - readable */
  --text-secondary: #9CA3AF; /* gray - metadata, captions */

  /* EHI Color Coding */
  --ehi-low: #22C55E;      /* green - 0.0-0.3 */
  --ehi-medium: #FACC15;   /* yellow - 0.3-0.6 */
  --ehi-high: #F97316;     /* orange - 0.6-0.8 */
  --ehi-critical: #EF4444; /* red - 0.8-1.0 */

  /* Typography - Inter */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --text-h1: 3.5rem;   /* 56px - hero */
  --text-h2: 2.25rem;  /* 36px - sections */
  --text-h3: 1.5rem;   /* 24px - subsections */
  --text-body: 1rem;   /* 16px - default */
  --text-small: 0.875rem; /* 14px - metadata */
  --text-tiny: 0.75rem;   /* 12px - timestamps */

  /* Line Heights */
  --line-height-heading: 1.2;
  --line-height-body: 1.6;

  /* Spacing */
  --spacing-card: 24px;
  --spacing-card-mobile: 16px;
  --spacing-gap: 32px;
  --spacing-gap-tablet: 24px;
  --spacing-gap-mobile: 16px;

  /* Border Radius */
  --radius-card: 12px;
  --radius-badge: 999px;

  /* Breakpoints (for JS) */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
}

/* Dark mode base */
body {
  background-color: var(--background);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--line-height-body);
}

/* Typography */
h1 {
  font-size: var(--text-h1);
  font-weight: 700;
  line-height: var(--line-height-heading);
  color: var(--text-primary);
}

h2 {
  font-size: var(--text-h2);
  font-weight: 600;
  line-height: var(--line-height-heading);
  color: var(--text-primary);
}

h3 {
  font-size: var(--text-h3);
  font-weight: 600;
  line-height: var(--line-height-heading);
  color: var(--text-primary);
}

/* Links */
a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: color-mix(in srgb, var(--primary) 80%, white);
}

/* Buttons */
.btn-primary {
  background-color: var(--primary);
  color: var(--background);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: color-mix(in srgb, var(--primary) 90%, white);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 204, 206, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: 2px solid var(--primary);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: rgba(15, 204, 206, 0.1);
}

/* Cards */
.card {
  background-color: var(--surface);
  border-radius: var(--radius-card);
  padding: var(--spacing-card);
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3),
              0 0 0 1px var(--primary);
}

/* EHI Badges */
.ehi-badge {
  padding: 6px 12px;
  border-radius: var(--radius-badge);
  font-weight: 600;
  font-size: var(--text-small);
}

.ehi-low {
  background-color: rgba(34, 197, 94, 0.15);
  color: var(--ehi-low);
}

.ehi-medium {
  background-color: rgba(250, 204, 21, 0.15);
  color: var(--ehi-medium);
}

.ehi-high {
  background-color: rgba(249, 115, 22, 0.15);
  color: var(--ehi-high);
}

.ehi-critical {
  background-color: rgba(239, 68, 68, 0.15);
  color: var(--ehi-critical);
}

/* Category Badges */
.category-badge {
  background-color: var(--surface);
  color: var(--text-secondary);
  padding: 4px 12px;
  border-radius: var(--radius-badge);
  font-size: var(--text-small);
}

/* Responsive */
@media (max-width: 768px) {
  :root {
    --text-h1: 2.5rem;   /* 40px mobile */
    --text-h2: 1.875rem; /* 30px mobile */
    --text-h3: 1.25rem;  /* 20px mobile */
  }

  .card {
    padding: var(--spacing-card-mobile);
  }
}
EOF

echo "✅ design-tokens.css created"
```

#### 3.2 Update index.css (or create if doesn't exist)

```bash
cat > orion-react/src/index.css << 'EOF'
/* Import Gemini Design Tokens */
@import './design-tokens.css';

/* Google Fonts - Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap');

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Custom utilities using design tokens */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.bg-surface { background-color: var(--surface); }
.bg-background { background-color: var(--background); }
EOF

echo "✅ index.css updated"
```

#### 3.3 Create ResearchCard Component

```bash
mkdir -p orion-react/src/components

cat > orion-react/src/components/ResearchCard.tsx << 'EOF'
// 🃏 Research Card Component - Gemini Visual System

interface ResearchCardProps {
  id: number;
  title: string;
  category: string;
  ehi: number;
  promise: string;
  reality: string;
  location: string;
  date: string;
  slug: string;
}

export default function ResearchCard(props: ResearchCardProps) {
  // EHI color coding
  const getEHIClass = (ehi: number) => {
    if (ehi >= 0.8) return 'ehi-critical';
    if (ehi >= 0.6) return 'ehi-high';
    if (ehi >= 0.3) return 'ehi-medium';
    return 'ehi-low';
  };

  const ehiClass = getEHIClass(props.ehi);

  return (
    <div className="card research-card">
      {/* Top row: Category + EHI badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span className="category-badge">{props.category}</span>
        <span className={`ehi-badge ${ehiClass}`}>
          EHI: {props.ehi.toFixed(2)}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ marginBottom: '12px', color: 'var(--primary)' }}>
        {props.title}
      </h3>

      {/* Promise/Reality preview */}
      <div style={{ marginBottom: '12px', fontSize: 'var(--text-small)' }}>
        <p style={{ color: 'var(--ehi-low)', marginBottom: '4px' }}>
          "{props.promise.slice(0, 60)}..."
        </p>
        <p style={{ color: 'var(--ehi-critical)' }}>
          Reality: {props.reality.slice(0, 60)}...
        </p>
      </div>

      {/* Metadata */}
      <div style={{ marginBottom: '16px', fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>
        <div>📍 {props.location}</div>
        <div>📅 {props.date}</div>
      </div>

      {/* CTA Button */}
      <a href={`/raziskave/${props.slug}`} className="btn-primary" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
        Read Full Research →
      </a>
    </div>
  );
}
EOF

echo "✅ ResearchCard.tsx created"
```

### TASK 4: Create .gitignore (if doesn't exist)

```bash
cd /home/saba/Desktop/ProPublica

cat > .gitignore << 'EOF'
# Node modules
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
.venv/

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
desktop.ini

# Build outputs
dist/
build/
*.min.js
*.min.css

# Logs
*.log
logs/

# Environment
.env
.env.local
.env.*.local

# Temporary files
*.tmp
*.temp
.cache/

# Backups
*.backup
*.bak
*.old
EOF

echo "✅ .gitignore created"
```

### TASK 5: Git Add & Commit EVERYTHING

```bash
cd /home/saba/Desktop/ProPublica

# Check status
git status

# Add all new files
git add Dumps/lyra-automation-UPGRADE.py
git add orion/data/raziskave.json
git add orion/raziskave/
git add orion-react/src/design-tokens.css
git add orion-react/src/index.css
git add orion-react/src/components/ResearchCard.tsx
git add orion-react/src/data/raziskave.json
git add orion-react/src/types/raziskava.ts
git add Dumps/research/
git add .gitignore
git add docs/

# Commit with comprehensive message
git commit -m "$(cat <<'EOF'
[CODEX+GEMINI]: Complete implementation - Automation v2.0 + Visual System v1.0

🧠 CODEX AUTOMATION (v2.0):
- ✅ lyra-automation-UPGRADE.py (production pipeline)
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
  - 7x generated research detail pages

🎨 GEMINI VISUAL SYSTEM (v1.0):
- ✅ design-tokens.css (CSS variables)
  - Color palette (6 colors, dark mode)
  - Typography system (Inter fonts)
  - EHI color coding (4 levels)
  - Spacing & responsive variables

- ✅ ResearchCard.tsx component
  - 350px width layout
  - Category + EHI badges
  - Promise/Reality preview
  - Location + Date metadata
  - Hover states with lift effect

- ✅ index.css (updated)
  - Import design tokens
  - Google Fonts (Inter, JetBrains Mono)
  - Custom utilities

- ✅ .gitignore (proper exclusions)

DESIGN PHILOSOPHY:
- Professional but approachable
- Data shines (high contrast colors)
- Fast-loading (minimal assets)
- Credible (journalist vibe)

READY FOR:
- Dashboard layout implementation
- Data visualization styling
- Mobile responsive testing
- Production deployment

🛰️ Projekt Orion - Full Stack Implementation COMPLETE

Credits:
- [CODEX]: Automation upgrade
- [GEMINI]: Visual system design
- [DESKTOP-CLAUDE]: File coordination
EOF
)"

# Verify commit
git log -1 --stat
```

### TASK 6: Push to GitHub

```bash
cd /home/saba/Desktop/ProPublica

# Check remote
git remote -v

# If remote exists, push:
git push origin main

# If no remote, add it first:
# git remote add origin https://github.com/SabaFTW/project-orion.git
# git push -u origin main

echo "✅ Pushed to GitHub!"
```

### TASK 7: Verify Everything

```bash
cd /home/saba/Desktop/ProPublica

# Final check
echo "=== VERIFICATION ==="
echo ""
echo "Files created:"
ls -lh orion-react/src/design-tokens.css
ls -lh orion-react/src/components/ResearchCard.tsx
ls -lh orion-react/src/index.css
ls -lh Dumps/lyra-automation-UPGRADE.py
ls -lh orion/data/raziskave.json

echo ""
echo "Git status:"
git status

echo ""
echo "Recent commits:"
git log --oneline -3

echo ""
echo "Branch info:"
git branch -a
```

---

## 📊 DELIVERABLE:

**When you finish, send:**

```
[CODEX] Complete Implementation Finished! ✅

═══════════════════════════════════════════════════════════
AUTOMATION UPGRADE (v2.0):
✅ lyra-automation-UPGRADE.py (37KB)
✅ raziskave.json (9 raziskav)
✅ TypeScript types + React sync
✅ 3x research seeds
✅ 7x HTML pages

VISUAL SYSTEM (v1.0):
✅ design-tokens.css (150 lines)
✅ ResearchCard.tsx (80 lines)
✅ index.css (updated)
✅ .gitignore (created)

GIT STATUS:
✅ All files committed
✅ Pushed to origin/main
✅ Working tree clean

COMMIT HASH: [paste hash here]

FILES ADDED: X files
LINES ADDED: +Y lines

NEXT STEPS:
Ready for testing and deployment!
Use: npm install && npm run dev

🛰️ Projekt Orion - Implementation COMPLETE
═══════════════════════════════════════════════════════════

[CODEX] → [USER]: Ready for testing!
```

---

## 🜂 IMPORTANT:

- ✅ Work in `/home/saba/Desktop/ProPublica/` (real machine!)
- ✅ You do git operations (no GitHub miška needed)
- ✅ Create all Gemini visual files
- ✅ Commit with comprehensive message
- ✅ Push to GitHub
- ✅ Verify everything succeeded

**Your role:** IMPLEMENTATION + GIT COMMIT. You do everything!

---

🧠 **READY? Execute all tasks and report back!** 🧠
