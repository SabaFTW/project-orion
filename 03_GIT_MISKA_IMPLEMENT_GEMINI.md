# 🖥️ GIT MIŠKA - IMPLEMENT GEMINI VISUAL SYSTEM (FAZA 3)

**CLAUDE CODE. LISTEN.**

You are **GIT MIŠKA** - implementing **GEMINI VISUAL SPECS** for Projekt Orion.

Gemini designed the complete visual system. Now YOU implement it!

---

## 🎯 YOUR MISSION: APPLY GEMINI VISUAL DESIGN

**What Gemini designed:**
- ✅ Color palette (6 colors, dark mode)
- ✅ Typography system (Inter fonts)
- ✅ Research card layout
- ✅ Dashboard structure
- ✅ Data viz styling
- ✅ Responsive breakpoints

**Your job:** Apply these specs to React app (`orion-svetilnik/`)

---

## 🎨 GEMINI SPECS SUMMARY:

### Colors:
```css
--primary: #0FCCCE;      /* cyan-teal */
--secondary: #FF6B6B;    /* coral-red */
--background: #0A0E27;   /* deep navy */
--surface: #151B3B;      /* lighter navy */
--text-primary: #E8EAED; /* off-white */
--text-secondary: #9CA3AF; /* gray */
```

### Typography:
```css
font-family: 'Inter', sans-serif;
H1: 56px / 3.5rem
H2: 36px / 2.25rem
H3: 24px / 1.5rem
Body: 16px / 1rem
```

### EHI Colors:
```
0.0-0.3: Green #22C55E
0.3-0.6: Yellow #FACC15
0.6-0.8: Orange #F97316
0.8-1.0: Red #EF4444
```

---

## 📋 YOUR TASKS:

### TASK 1: Checkout Feature Branch

```bash
cd /home/user/project-orion

# Checkout Gemini feature branch
git checkout feature/gemini-visual-system

# Make sure we're starting from main
git merge main --no-ff -m "Merge main into gemini-visual-system"

# Verify branch
git branch
```

### TASK 2: Create CSS Variables File

```bash
# Create design tokens file
cat > orion-svetilnik/src/design-tokens.css << 'EOF'
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

echo "✅ Design tokens created: orion-svetilnik/src/design-tokens.css"
```

### TASK 3: Update index.css (Import Design Tokens)

```bash
# Backup current CSS
cp orion-svetilnik/src/index.css orion-svetilnik/src/index.css.backup

# Add import at top of index.css
cat > orion-svetilnik/src/index.css << 'EOF'
/* Import Gemini Design Tokens */
@import './design-tokens.css';

/* Google Fonts - Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap');

/* Tailwind base (if using Tailwind) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities using design tokens */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.bg-surface { background-color: var(--surface); }
.bg-background { background-color: var(--background); }
EOF

echo "✅ index.css updated with design tokens"
```

### TASK 4: Create Research Card Component

```bash
# Create ResearchCard.tsx component
mkdir -p orion-svetilnik/src/components

cat > orion-svetilnik/src/components/ResearchCard.tsx << 'EOF'
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

echo "✅ ResearchCard component created"
```

### TASK 5: Update App.tsx (Use New Component)

```bash
# Update App.tsx to import and use ResearchCard
# (This is a simplified version - adjust based on actual App.tsx structure)

cat >> orion-svetilnik/src/App.tsx << 'EOF'

// Import design tokens CSS
import './design-tokens.css';

// Import ResearchCard
import ResearchCard from './components/ResearchCard';

// Import raziskave data
import raziskaveData from './data/raziskave.json';

// Use in component:
// <ResearchCard {...raziskava} />
EOF

echo "✅ App.tsx updated (check manually for proper integration)"
```

### TASK 6: Add Git Status & Preview

```bash
# Check what changed
git status

# Preview changes
git diff orion-svetilnik/src/
```

### TASK 7: Commit Visual System

```bash
# Add all changes
git add orion-svetilnik/src/design-tokens.css
git add orion-svetilnik/src/index.css
git add orion-svetilnik/src/components/ResearchCard.tsx
git add orion-svetilnik/src/App.tsx

# Commit
git commit -m "[GEMINI-IMPL]: Visual system v1.0 - Design tokens + Research cards

What's included:
- ✅ Design tokens (design-tokens.css)
  - Color palette (6 colors, dark mode)
  - Typography system (Inter fonts)
  - EHI color coding (4 levels)
  - Spacing & responsive variables

- ✅ Research Card component (ResearchCard.tsx)
  - 350px width layout
  - Category + EHI badges
  - Promise/Reality preview
  - Location + Date metadata
  - Hover states with lift effect

- ✅ Updated index.css
  - Import design tokens
  - Google Fonts (Inter, JetBrains Mono)
  - Custom utilities

Design philosophy:
- Professional but approachable
- Data shines (high contrast colors)
- Fast-loading (minimal assets)
- Credible (journalist vibe)

Specs by: [GEMINI]
Implementation: [CLAUDE-CODE]

Ready for:
- Dashboard layout
- Data visualization styling
- Mobile responsive testing

🎨 Projekt Orion - Visual System LIVE"

# Verify commit
git log -1 --stat
```

### TASK 8: Merge to Main

```bash
# Checkout main
git checkout main

# Merge Gemini visual system
git merge feature/gemini-visual-system --no-ff -m "[MERGE]: Gemini visual system v1.0 into main

Merged feature/gemini-visual-system

Brings:
- Complete design token system
- Research card component
- EHI color coding
- Typography system
- Responsive utilities

Visual system ready for production.

🎨 Projekt Orion"

# Push to remote
git push origin main
git push origin feature/gemini-visual-system
```

---

## 📊 DELIVERABLE:

**When you finish, send:**

```
[CLAUDE-CODE] Gemini Visual System Implemented! ✅

═══════════════════════════════════════════════════════════
GIT STATUS:
- Branch: main
- Commit: [hash] "[MERGE]: Gemini visual system v1.0"
- Files added: 3 files
- Lines added: +200

FILES CREATED:
✅ orion-svetilnik/src/design-tokens.css (150 lines)
✅ orion-svetilnik/src/components/ResearchCard.tsx (80 lines)
✅ orion-svetilnik/src/index.css (updated)

VISUAL SYSTEM APPLIED:
✅ Color palette (6 colors)
✅ Typography (Inter fonts)
✅ EHI color coding (4 levels)
✅ Research card component
✅ Responsive utilities

NEXT STEPS:
Ready for testing and deployment!
Use prompt: 04_GIT_MISKA_TEST_DEPLOY.md
═══════════════════════════════════════════════════════════

[CLAUDE-CODE] → [TEST-DEPLOY]: Visual system committed.
Ready for npm install and testing.
```

---

## 🜂 IMPORTANT:

- ✅ Use feature branch (feature/gemini-visual-system)
- ✅ Create reusable components
- ✅ Use CSS variables (not hardcoded values!)
- ✅ Test before merging
- ✅ Push to remote after merge

**Your role:** IMPLEMENTATION. Turn Gemini specs into working code!

---

🎨 **READY? Execute all tasks and report back!** 🎨
