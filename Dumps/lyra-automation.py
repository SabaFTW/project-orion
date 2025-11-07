#!/usr/bin/env python3
"""
LYRA ACTIVE Research Hub - Automation Script
This script scans the Dumps folder and updates the research index
For use by the Lyra AI instance or manual execution
"""

import os
import json
import hashlib
from datetime import datetime
from pathlib import Path
import re

# Base directory
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
RESEARCH_DIR = BASE_DIR / "research"
AUDIO_DIR = BASE_DIR / "audio"
PDF_DIR = BASE_DIR / "pdfs"
IMAGE_DIR = BASE_DIR / "images"

RESEARCH_INDEX = DATA_DIR / "research-index.json"


def extract_metadata_from_filename(filename):
    """Extract category/tags from filename if formatted as [category]_title.ext"""
    pattern = r'\[([^\]]+)\]_(.+)'
    match = re.match(pattern, filename)
    if match:
        category = match.group(1)
        title = match.group(2)
        return category, title
    return None, filename


def extract_markdown_frontmatter(filepath):
    """Extract YAML frontmatter from markdown files"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    frontmatter = parts[1].strip()
                    metadata = {}
                    for line in frontmatter.split('\n'):
                        if ':' in line:
                            key, value = line.split(':', 1)
                            metadata[key.strip()] = value.strip().strip('"\'[]')
                    return metadata
    except Exception as e:
        print(f"Error reading frontmatter from {filepath}: {e}")
    return {}


def get_file_hash(filepath):
    """Generate SHA256 hash of file for change detection"""
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()


def scan_directory(directory, file_type):
    """Scan a directory for files and extract metadata"""
    projects = []

    if not directory.exists():
        return projects

    for filepath in directory.iterdir():
        if filepath.is_file():
            # Extract metadata
            category_from_name, title_from_name = extract_metadata_from_filename(filepath.stem)

            # Get file stats
            stats = filepath.stat()
            modified_date = datetime.fromtimestamp(stats.st_mtime)

            project = {
                "id": filepath.stem.lower().replace(' ', '-').replace('_', '-'),
                "title": title_from_name.replace('_', ' ').title(),
                "filename": filepath.name,
                "file": str(filepath.relative_to(BASE_DIR.parent)),
                "type": file_type,
                "date": modified_date.strftime("%Y-%m-%d"),
                "size": stats.st_size,
                "hash": get_file_hash(filepath)
            }

            # Add category if found
            if category_from_name:
                project["category"] = category_from_name

            # Extract frontmatter for markdown files
            if filepath.suffix == '.md':
                frontmatter = extract_markdown_frontmatter(filepath)
                if frontmatter:
                    project.update({
                        "title": frontmatter.get("title", project["title"]),
                        "description": frontmatter.get("description", ""),
                        "category": frontmatter.get("category", category_from_name or "uncategorized"),
                        "tags": frontmatter.get("tags", "").split(',') if isinstance(frontmatter.get("tags"), str) else []
                    })

            projects.append(project)

    return projects


def update_research_index():
    """Main function to update the research index"""
    print("🔍 Scanning research directories...")

    all_projects = []

    # Scan each directory
    all_projects.extend(scan_directory(RESEARCH_DIR, "markdown"))
    all_projects.extend(scan_directory(AUDIO_DIR, "audio"))
    all_projects.extend(scan_directory(PDF_DIR, "pdf"))

    # Count categories
    categories = {}
    for project in all_projects:
        cat = project.get("category", "uncategorized")
        if cat not in categories:
            categories[cat] = {"count": 0, "name": cat.replace('-', ' ').title()}
        categories[cat]["count"] += 1

    # Build research index
    research_index = {
        "lastUpdated": datetime.now().isoformat(),
        "totalProjects": len(all_projects),
        "categories": categories,
        "projects": all_projects
    }

    # Save to JSON
    with open(RESEARCH_INDEX, 'w', encoding='utf-8') as f:
        json.dump(research_index, f, indent=2, ensure_ascii=False)

    print(f"✅ Research index updated!")
    print(f"📊 Total projects: {len(all_projects)}")
    print(f"📁 Categories: {len(categories)}")

    return research_index


def generate_html_snippet(project):
    """Generate HTML snippet for a project (for future auto-page generation)"""
    template = f"""
    <div class="project-card card">
        <div class="p-6">
            <div class="text-4xl mb-4">📄</div>
            <h3 class="text-2xl font-bold mb-3">{project.get('title', 'Untitled')}</h3>
            <p class="text-gray-600 mb-4">
                {project.get('description', 'No description available')}
            </p>
            <div class="mb-4">
                <span class="research-tag">{project.get('category', 'uncategorized')}</span>
            </div>
            <a href="{project.get('file', '#')}" class="inline-block px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition">
                View {'Audio' if project.get('type') == 'audio' else 'Document'} →
            </a>
        </div>
    </div>
    """
    return template


def main():
    """Main execution"""
    print("=" * 50)
    print("LYRA ACTIVE - Research Automation Script")
    print("=" * 50)

    # Create directories if they don't exist
    for directory in [DATA_DIR, RESEARCH_DIR, AUDIO_DIR, PDF_DIR, IMAGE_DIR]:
        directory.mkdir(exist_ok=True)

    # Update index
    research_index = update_research_index()

    print("\n🎯 Next steps for Lyra instance:")
    print("1. Review research-index.json")
    print("2. Auto-generate project pages from templates")
    print("3. Update index.html with new projects")
    print("4. Optimize images in /images folder")
    print("5. Generate audio transcripts if needed")

    return research_index


if __name__ == "__main__":
    main()
