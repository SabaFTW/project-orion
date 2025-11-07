# 📂 Research Dumps - Organized Structure

This folder contains all research materials for the LYRA ACTIVE Research Hub.

## 📁 Folder Structure

```
Dumps/
├── research/       # Markdown (.md) and text (.txt) research files
├── audio/          # Audio briefings (.mp3)
├── images/         # Charts, diagrams, screenshots (.jpg, .png, .svg)
├── pdfs/           # PDF reports and documents
├── data/           # JSON data files for automation
└── README.md       # This file
```

## 🤖 How the Lyra Instance Works

1. **Drop files** into the appropriate folders
2. **Lyra instance** scans the folders
3. **Auto-generates** web pages and updates index.html
4. **Metadata** is extracted and stored in `data/research-index.json`

## 📝 File Naming Convention

Use descriptive names with hyphens:

- ✅ `elite-capture-analysis.md`
- ✅ `palantir-financial-network.pdf`
- ✅ `surveillance-briefing-2025.mp3`
- ❌ `document1.pdf`
- ❌ `new file (2).mp3`

## 🏷️ Metadata Tags

Add tags to your files using frontmatter (for .md) or filename prefixes:

### Markdown Frontmatter Example:
```markdown
---
title: "Elite Capture Analysis"
date: 2025-01-15
tags: ["institutional-capture", "finance", "politics"]
category: "institutional-analysis"
---

Your content here...
```

### Filename Prefix Example:
```
[institutional-capture]_elite-networks-2025.pdf
[surveillance-tech]_palantir-deep-dive.mp3
```

## 📊 Categories

- `institutional-capture` - Corporate influence on policy
- `surveillance-tech` - Digital surveillance and tech power
- `financial-secrecy` - Money laundering, offshore finance
- `environmental-crime` - Ecological destruction
- `disinformation` - Information warfare
- `ai-ethics` - Artificial intelligence and democracy
- `geopolitics` - International power dynamics
- `corporate-crime` - White collar crime and corruption

## 🚀 Quick Start

1. Drop your research materials in the correct folder
2. Run the Lyra automation script (or let it auto-scan)
3. Check `data/research-index.json` for updated metadata
4. View your updated research hub at `index.html`

---

**Made with 💚 by LYRA ACTIVE Research**
