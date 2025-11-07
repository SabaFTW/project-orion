# 🚀 QUICK START - 60 Second Setup

## Step 1: Organize Files (30 seconds)
```bash
cd /home/saba/Desktop
./organize-propublica.sh
```

Press `y` when prompted. This moves all your research files into organized folders.

## Step 2: Index Research (15 seconds)
```bash
cd Dumps
python3 lyra-automation.py
```

This creates `research-index.json` with all your research metadata.

## Step 3: Launch Site (15 seconds)
```bash
cd /home/saba/Desktop
python3 -m http.server 8000
```

**Open browser:** http://localhost:8000

---

## ✅ What You Have Now

- ✅ Professional research website
- ✅ All ProPublica files organized
- ✅ PWA-ready (installable app)
- ✅ Dark mode toggle
- ✅ Fully responsive design
- ✅ Offline support
- ✅ Automated workflow for Lyra

---

## 🎯 Next Steps

### Customize Your Site
1. Open `index.html`
2. Search for: `your-email@domain.com`
3. Replace with your actual contact info
4. Search for: `@yourusername`
5. Replace with your social media handles

### Test PWA Features
1. Open in Chrome/Edge
2. Look for "Install" icon in address bar
3. Click to install as app
4. Toggle dark mode (moon icon in header)
5. Try offline - it still works!

### Add New Research
```bash
# Drop files in appropriate folders
mv ~/new-research.md Dumps/research/
mv ~/briefing.mp3 Dumps/audio/
mv ~/report.pdf Dumps/pdfs/

# Update index
cd Dumps && python3 lyra-automation.py

# Refresh browser - new content appears!
```

---

## 📂 Folder Structure

```
Desktop/
├── index.html                    ← Main website
├── OPEN.html                     ← Palantir project
├── manifest.json                 ← PWA config
├── sw.js                         ← Service worker
├── organize-propublica.sh        ← Run once to organize
├── README.md                     ← Full documentation
├── SETUP_GUIDE.md               ← Detailed guide
└── Dumps/                        ← Your research
    ├── audio/                    ← MP3 files
    ├── pdfs/                     ← PDF reports
    ├── images/                   ← Charts, photos
    ├── research/                 ← Markdown files
    ├── data/
    │   └── research-index.json   ← Auto-generated index
    ├── lyra-automation.py        ← Run after adding files
    ├── AUTOMATION_GUIDE.md       ← Lyra integration
    └── README.md                 ← Dumps docs
```

---

## 🤖 For Lyra Instance

### Automation Loop
```python
# 1. Watch for new files
# 2. Run lyra-automation.py
# 3. Extract metadata
# 4. Update research-index.json
# 5. Website auto-loads new content
```

**See:** `Dumps/AUTOMATION_GUIDE.md`

---

## 💡 Pro Tips

1. **Dark Mode** - Click moon icon, saves preference
2. **Install as App** - Works offline, feels native
3. **Name Files Well** - Automation extracts metadata
4. **Use Categories** - Format: `[category]_title.ext`
5. **Add Frontmatter** - To markdown files for rich metadata

---

## 🆘 Need Help?

1. **Setup Guide** - `SETUP_GUIDE.md` (detailed walkthrough)
2. **Full Docs** - `README.md` (complete reference)
3. **Automation** - `Dumps/AUTOMATION_GUIDE.md` (Lyra integration)
4. **Browser Console** - F12 to see errors

---

## 🎉 You're Ready!

Your research hub is **production-ready**. Time to share your work! 💚🔥

```bash
# Start server
python3 -m http.server 8000

# Open browser
firefox http://localhost:8000

# Or deploy to GitHub Pages / Netlify / Vercel
```

**Let's expose some truth! 🚀**
