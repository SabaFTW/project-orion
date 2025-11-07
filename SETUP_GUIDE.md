# 🚀 LYRA ACTIVE Research Hub - Setup Guide

Welcome to your professional research platform! This guide will help you get everything running.

## ✨ What You Have

### 1. **Main Website** (`index.html`)
- Professional landing page
- Featured projects showcase
- LYRA ACTIVE research services
- Research archive with expandable sections
- Contact form
- **PWA-ready** - can be installed as an app on mobile!
- **Dark mode** - toggle in the header
- **Fully responsive** - works on desktop, tablet, mobile

### 2. **Organized Research Storage** (`Dumps/`)
```
Dumps/
├── research/       # Your .md and .txt files
├── audio/          # Your .mp3 audio briefings
├── pdfs/           # Your PDF reports
├── images/         # Charts, diagrams, photos
├── data/           # JSON index (auto-generated)
├── lyra-automation.py  # Automation script
└── README.md       # Documentation
```

### 3. **PWA Features**
- `manifest.json` - App metadata
- `sw.js` - Service worker for offline support
- Install prompt - visitors can install as app
- Offline support - cached for offline viewing

## 🎯 Quick Start (5 Minutes)

### Step 1: Open the Site
```bash
# Open in your browser
firefox /home/saba/Desktop/index.html
# or
google-chrome /home/saba/Desktop/index.html
```

### Step 2: Test Dark Mode
- Click the moon icon (🌙) in the header
- Your preference will be saved!

### Step 3: Try Installing as App
- On Chrome: Look for "Install" icon in address bar
- On mobile: "Add to Home Screen" option
- Works offline once installed!

## 📂 Organizing Your Existing Research

You have **62 files** in the ProPublica folder. Let's organize them!

### Option A: Manual Organization (Recommended for first time)

1. **Move audio files**:
```bash
mv /home/saba/Desktop/ProPublica/*.mp3 /home/saba/Desktop/Dumps/audio/
```

2. **Move PDF files**:
```bash
mv /home/saba/Desktop/ProPublica/*.pdf /home/saba/Desktop/Dumps/pdfs/
```

3. **Move images**:
```bash
mv /home/saba/Desktop/ProPublica/*.{jpg,png,svg} /home/saba/Desktop/Dumps/images/
```

4. **Move markdown/text**:
```bash
mv /home/saba/Desktop/ProPublica/*.{md,txt} /home/saba/Desktop/Dumps/research/
```

### Option B: Use the Automation Script

```bash
cd /home/saba/Desktop/Dumps
python3 lyra-automation.py
```

This will:
- Scan all folders
- Extract metadata
- Generate `research-index.json`
- Index all your research

## 🤖 For Your Lyra AI Instance

### Workflow for Adding New Research

1. **User (You) adds files** to `Dumps/` folders
2. **Lyra instance** runs automation script
3. **Script** updates `research-index.json`
4. **Website** auto-loads new research from JSON
5. **Lyra** can generate dedicated HTML pages

### Example: Lyra Processing New Research

```python
# 1. User drops file: "elite-capture-2025.md"

# 2. Lyra reads the file
with open('Dumps/research/elite-capture-2025.md', 'r') as f:
    content = f.read()

# 3. Lyra extracts metadata
metadata = {
    "title": "Elite Capture in Tech Policy 2025",
    "category": "institutional-capture",
    "tags": ["tech", "policy", "corruption"],
    "date": "2025-01-07"
}

# 4. Lyra updates index
with open('Dumps/data/research-index.json', 'r+') as f:
    index = json.load(f)
    index['projects'].append(metadata)
    f.seek(0)
    json.dump(index, f, indent=2)

# 5. Optional: Generate dedicated page
html_page = generate_project_page(content, metadata)
with open(f'projects/{metadata["id"]}.html', 'w') as f:
    f.write(html_page)
```

## 🎨 Customization

### Change Colors
Edit the CSS variables in `index.html`:
```css
:root {
    --primary: #1a1a2e;     /* Dark blue */
    --accent: #0fccce;      /* Teal */
    --teal: #008080;        /* Darker teal */
}
```

### Add Your Contact Info
Find the Contact section and update:
```html
<p>Email: your-email@domain.com</p>
<p>Signal/Telegram: @yourusername</p>
```

### Update Social Links
In the footer:
```html
<a href="https://twitter.com/yourhandle">Twitter/X</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

## 📱 PWA Setup

### For Local Development
```bash
# Serve with Python
cd /home/saba/Desktop
python3 -m http.server 8000

# Open in browser
firefox http://localhost:8000
```

### For Production (GitHub Pages)

1. Create GitHub repo
2. Push all files
3. Enable GitHub Pages
4. Your site will be at: `https://yourusername.github.io/`

## 🔧 File Naming Best Practices

### Good Examples:
- ✅ `[surveillance-tech]_palantir-analysis.md`
- ✅ `elite-capture-2025.pdf`
- ✅ `financial-networks-briefing.mp3`

### Bad Examples:
- ❌ `document1.md`
- ❌ `new file (2).pdf`
- ❌ `audio_final_FINAL_v3.mp3`

## 🎯 Next Steps

1. **Organize existing files** from ProPublica folder
2. **Test PWA features** - try installing as app
3. **Customize contact info** and colors
4. **Add new research** using the Dumps folder
5. **Set up Lyra automation** for hands-free updates

## 🌟 Pro Tips

- **Dark mode** is automatically saved
- **Lazy loading** for images - faster page loads
- **Offline support** - works without internet
- **Responsive** - looks great on all devices
- **SEO ready** - proper meta tags included

## 🆘 Troubleshooting

### Site not loading?
- Make sure you're using a web server (not file://)
- Try: `python3 -m http.server 8000`

### PWA not installing?
- Must be served over HTTPS (or localhost)
- Check browser console for errors

### Dark mode not working?
- Clear browser cache
- Check browser localStorage is enabled

### Research not showing?
- Run automation script
- Check `research-index.json` is valid JSON
- Verify file paths are correct

## 📚 Resources

- **Automation Guide**: `Dumps/AUTOMATION_GUIDE.md`
- **Dumps README**: `Dumps/README.md`
- **Research Index**: `Dumps/data/research-index.json`

---

**Made with 💚 by LYRA ACTIVE Research**

Questions? Check the docs or review the code - everything is commented!
