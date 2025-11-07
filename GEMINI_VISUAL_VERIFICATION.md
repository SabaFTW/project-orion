# 💎 GEMINI - VISUAL SYSTEM VERIFICATION

**GEMINI. LISTEN.**

You are **GEMINI** - verifying the visual system implementation in `/home/saba/Desktop/ProPublica/`.

---

## 🎯 YOUR MISSION: VERIFY VISUAL IMPLEMENTATION

**Context:**
- Codex just implemented your visual system specs ✅
- design-tokens.css created ✅
- ResearchCard.tsx created ✅
- index.css updated ✅

**NOW:** You verify everything matches your design specs!

---

## 📂 WORKING DIRECTORY: `/home/saba/Desktop/ProPublica/`

---

## 📋 YOUR TASKS:

### TASK 1: Verify Design Tokens File

```bash
cd /home/saba/Desktop/ProPublica

# Check if file exists
ls -la orion-react/src/design-tokens.css

# Read file
cat orion-react/src/design-tokens.css
```

**Verify these specs are present:**

✅ **Color Palette:**
- `--primary: #0FCCCE` (cyan-teal)
- `--secondary: #FF6B6B` (coral-red)
- `--background: #0A0E27` (deep navy)
- `--surface: #151B3B` (lighter navy)
- `--text-primary: #E8EAED` (off-white)
- `--text-secondary: #9CA3AF` (gray)

✅ **EHI Colors:**
- `--ehi-low: #22C55E` (green 0.0-0.3)
- `--ehi-medium: #FACC15` (yellow 0.3-0.6)
- `--ehi-high: #F97316` (orange 0.6-0.8)
- `--ehi-critical: #EF4444` (red 0.8-1.0)

✅ **Typography:**
- `--font-heading: 'Inter', sans-serif`
- `--text-h1: 3.5rem` (56px)
- `--text-h2: 2.25rem` (36px)
- `--text-h3: 1.5rem` (24px)
- `--text-body: 1rem` (16px)

✅ **Spacing:**
- `--spacing-card: 24px`
- `--spacing-gap: 32px`
- `--radius-card: 12px`

### TASK 2: Verify ResearchCard Component

```bash
cd /home/saba/Desktop/ProPublica

# Check if file exists
ls -la orion-react/src/components/ResearchCard.tsx

# Read file
cat orion-react/src/components/ResearchCard.tsx
```

**Verify these features are present:**

✅ **Component Structure:**
- Interface with all required props (id, title, category, ehi, promise, reality, location, date, slug)
- `getEHIClass()` function for color coding
- Category badge (top left)
- EHI badge (top right)
- Title (H3, primary color)
- Promise/Reality preview
- Location + Date metadata
- CTA button

✅ **EHI Color Logic:**
```typescript
if (ehi >= 0.8) return 'ehi-critical';
if (ehi >= 0.6) return 'ehi-high';
if (ehi >= 0.3) return 'ehi-medium';
return 'ehi-low';
```

✅ **Styling:**
- Card uses `.card` class
- Badges use proper classes
- CSS variables referenced correctly

### TASK 3: Verify index.css

```bash
cd /home/saba/Desktop/ProPublica

# Read file
cat orion-react/src/index.css
```

**Verify:**

✅ **Imports present:**
- `@import './design-tokens.css';`
- `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');`

✅ **Utility classes:**
- `.text-primary`
- `.text-secondary`
- `.bg-surface`
- `.bg-background`

### TASK 4: Visual Design Review

**Check if implementation matches your specs:**

| Element | Spec | Implementation | Status |
|---------|------|----------------|--------|
| Primary color | #0FCCCE (cyan-teal) | Check design-tokens.css | ✅/❌ |
| Background | #0A0E27 (deep navy) | Check design-tokens.css | ✅/❌ |
| Typography | Inter font family | Check index.css import | ✅/❌ |
| H1 size | 56px (3.5rem) | Check design-tokens.css | ✅/❌ |
| Card radius | 12px | Check design-tokens.css | ✅/❌ |
| EHI badges | 4 color levels | Check ResearchCard logic | ✅/❌ |
| Card hover | Lift + border glow | Check design-tokens.css | ✅/❌ |

### TASK 5: Suggest Improvements (Optional)

**If you spot any issues or improvements:**

```
[GEMINI] Visual Review Suggestions:

ISSUES FOUND:
- [None / List any problems]

IMPROVEMENTS:
- [Optional enhancements]
- [Additional styling suggestions]

MOBILE CONSIDERATIONS:
- [Responsive tweaks needed?]
```

---

## 📊 DELIVERABLE:

**When you finish verification, send:**

```
[GEMINI] Visual System Verification Complete! ✅

═══════════════════════════════════════════════════════════
DESIGN TOKENS:
✅ Color palette (6 colors) - All correct
✅ EHI colors (4 levels) - All correct
✅ Typography (Inter fonts) - All correct
✅ Spacing variables - All correct
✅ Responsive breakpoints - All correct

RESEARCH CARD COMPONENT:
✅ Props interface - All fields present
✅ EHI color logic - Correct thresholds
✅ Component structure - Matches design
✅ Styling - CSS variables used correctly
✅ Hover states - Implemented

INDEX.CSS:
✅ Design tokens imported
✅ Google Fonts imported (Inter)
✅ Utility classes created

OVERALL ASSESSMENT:
Implementation matches Gemini specs: [YES / PARTIAL / NO]

ISSUES FOUND: [None / List issues]

SUGGESTIONS:
[Optional improvements if any]

STATUS: ✅ APPROVED FOR PRODUCTION

🎨 Gemini Visual System v1.0 - Implementation Verified
═══════════════════════════════════════════════════════════

[GEMINI] → [USER]: Visual system ready for testing!
```

---

## 🜂 YOUR ROLE:

You are the **VISUAL DESIGNER** - you verify implementation matches your design specs!

**You check:**
- ✅ Colors are exact
- ✅ Typography is correct
- ✅ Spacing matches
- ✅ Components structured properly
- ✅ CSS variables used correctly

**You DON'T:**
- ❌ Write code (Codex does that)
- ❌ Commit to git (Codex does that)
- ❌ Test functionality (User does that)

---

💎 **READY? Verify implementation and report back!** 💎
