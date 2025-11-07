# 🤖 LYRA Automation Guide

This guide explains how to use the automation system to keep your research hub updated.

## 📋 Quick Start

1. **Drop your research files** into the appropriate folders:
   - `research/` - Markdown (.md) files
   - `audio/` - Audio briefings (.mp3)
   - `pdfs/` - PDF documents
   - `images/` - Charts, diagrams, photos

2. **Run the automation script**:
   ```bash
   cd /home/saba/Desktop/Dumps
   python3 lyra-automation.py
   ```

3. **Check the output**:
   - Updated `data/research-index.json`
   - New projects will be indexed automatically

## 🎯 For Lyra AI Instance

The Lyra instance can use this workflow:

### 1. File Processing
```python
# Example: Process new research file
import json
from pathlib import Path

# Load current index
with open('data/research-index.json', 'r') as f:
    index = json.load(f)

# Add new project
new_project = {
    "id": "new-research-2025",
    "title": "New Research Title",
    "description": "Auto-generated description",
    "category": "institutional-capture",
    "tags": ["finance", "tech"],
    "type": "markdown",
    "file": "research/new-research-2025.md",
    "date": "2025-01-07"
}

index['projects'].append(new_project)
index['totalProjects'] = len(index['projects'])

# Save updated index
with open('data/research-index.json', 'w') as f:
    json.dump(index, f, indent=2)
```

### 2. Auto-Generate HTML Pages
```python
# Template for project page
template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{project['title']}</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <h1>{project['title']}</h1>
    <div class="content">
        {project_content}
    </div>
</body>
</html>
"""

# Save as new page
with open(f"projects/{project['id']}.html", 'w') as f:
    f.write(template)
```

### 3. Image Optimization
```python
from PIL import Image
import os

def optimize_image(image_path, max_width=1200):
    """Optimize images for web"""
    img = Image.open(image_path)

    # Resize if too large
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.LANCZOS)

    # Save optimized
    output_path = image_path.replace('.', '_optimized.')
    img.save(output_path, optimize=True, quality=85)

    return output_path
```

### 4. Audio Transcription (Optional)
```python
# If you want to add transcripts to audio files
# Use Whisper or similar
import whisper

def transcribe_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)

    # Save transcript
    transcript_path = audio_path.replace('.mp3', '.txt')
    with open(transcript_path, 'w') as f:
        f.write(result['text'])

    return result['text']
```

## 🔄 Automated Workflow

### Daily Automation (Cron Job)
```bash
# Add to crontab for daily updates
0 2 * * * cd /home/saba/Desktop/Dumps && python3 lyra-automation.py
```

### Watch for File Changes
```python
# Using watchdog library
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class ResearchWatcher(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            print(f"New file detected: {event.src_path}")
            # Trigger automation
            os.system('python3 lyra-automation.py')

observer = Observer()
observer.schedule(ResearchWatcher(), path='./research', recursive=True)
observer.start()
```

## 📊 Integration with Index.html

The index.html automatically loads `research-index.json` and can dynamically display projects:

```javascript
// Already included in index.html
async function loadResearchData() {
    const response = await fetch('/Dumps/data/research-index.json');
    const data = await response.json();

    // Dynamically create project cards
    data.projects.forEach(project => {
        const card = createProjectCard(project);
        document.getElementById('projects-container').appendChild(card);
    });
}
```

## 🎨 Custom Templates

Create custom templates in `data/templates/`:

```markdown
---
template: research-brief
category: institutional-capture
---

# {title}

**Date:** {date}
**Category:** {category}

## Executive Summary
{summary}

## Key Findings
{findings}

## Sources
{sources}
```

## 🚀 Advanced Features

### 1. Batch Processing
```bash
# Process multiple files at once
for file in research/*.md; do
    python3 process_research.py "$file"
done
```

### 2. Git Integration
```bash
# Auto-commit new research
git add Dumps/data/research-index.json
git commit -m "Auto-update: $(date +%Y-%m-%d)"
git push
```

### 3. Notifications
```python
# Send notification when new research is added
import requests

def send_notification(title, message):
    # Using ntfy.sh or similar
    requests.post('https://ntfy.sh/lyra-research',
        data=message.encode(encoding='utf-8'))
```

## 🛠️ Troubleshooting

### File not showing up?
- Check file naming convention
- Verify file is in correct folder
- Run automation script manually
- Check `research-index.json` for errors

### JSON errors?
- Validate JSON: `python3 -m json.tool data/research-index.json`
- Check for special characters in filenames

### Images not loading?
- Ensure images are in `/Dumps/images/`
- Use relative paths in HTML
- Check file permissions

## 💡 Tips for Lyra Instance

1. **Auto-categorize** based on content analysis
2. **Extract key quotes** for descriptions
3. **Generate tags** from content
4. **Create summaries** for long documents
5. **Link related research** automatically

---

**Made with 💚 by LYRA ACTIVE**
