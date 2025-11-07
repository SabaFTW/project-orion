#!/bin/bash

# LYRA ACTIVE - ProPublica Folder Organization Script
# This script moves files from ProPublica to organized Dumps structure

echo "======================================================"
echo "  LYRA ACTIVE - Research Organization Script"
echo "======================================================"
echo ""

SOURCE_DIR="/home/saba/Desktop/ProPublica"
DUMPS_DIR="/home/saba/Desktop/Dumps"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if directories exist
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: ProPublica folder not found!"
    exit 1
fi

if [ ! -d "$DUMPS_DIR" ]; then
    echo "❌ Error: Dumps folder not found!"
    exit 1
fi

echo "📂 Source: $SOURCE_DIR"
echo "📁 Destination: $DUMPS_DIR"
echo ""
echo "🔍 Analyzing files..."
echo ""

# Count files
audio_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f -name "*.mp3" | wc -l)
pdf_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f -name "*.pdf" | wc -l)
image_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.svg" \) | wc -l)
md_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f \( -name "*.md" -o -name "*.txt" \) | wc -l)
html_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f -name "*.html" | wc -l)
other_count=$(find "$SOURCE_DIR" -maxdepth 1 -type f ! \( -name "*.mp3" -o -name "*.pdf" -o -name "*.jpg" -o -name "*.png" -o -name "*.svg" -o -name "*.md" -o -name "*.txt" -o -name "*.html" \) | wc -l)

echo -e "${BLUE}📊 File Analysis:${NC}"
echo "   🎧 Audio files (.mp3): $audio_count"
echo "   📄 PDF files: $pdf_count"
echo "   🖼️  Images (.jpg, .png, .svg): $image_count"
echo "   📝 Markdown/Text (.md, .txt): $md_count"
echo "   🌐 HTML files: $html_count"
echo "   📦 Other files: $other_count"
echo ""

# Ask for confirmation
echo -e "${YELLOW}⚠️  This will move files from ProPublica to Dumps folder.${NC}"
echo "   Original files will be moved (not copied)."
echo ""
read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operation cancelled."
    exit 0
fi

echo ""
echo "🚀 Starting organization..."
echo ""

# Move audio files
if [ $audio_count -gt 0 ]; then
    echo -e "${GREEN}🎧 Moving audio files...${NC}"
    mv "$SOURCE_DIR"/*.mp3 "$DUMPS_DIR/audio/" 2>/dev/null
    echo "   ✓ Moved $audio_count audio files"
fi

# Move PDF files
if [ $pdf_count -gt 0 ]; then
    echo -e "${GREEN}📄 Moving PDF files...${NC}"
    mv "$SOURCE_DIR"/*.pdf "$DUMPS_DIR/pdfs/" 2>/dev/null
    echo "   ✓ Moved $pdf_count PDF files"
fi

# Move images
if [ $image_count -gt 0 ]; then
    echo -e "${GREEN}🖼️  Moving images...${NC}"
    mv "$SOURCE_DIR"/*.jpg "$DUMPS_DIR/images/" 2>/dev/null
    mv "$SOURCE_DIR"/*.png "$DUMPS_DIR/images/" 2>/dev/null
    mv "$SOURCE_DIR"/*.svg "$DUMPS_DIR/images/" 2>/dev/null
    echo "   ✓ Moved $image_count image files"
fi

# Move markdown/text files
if [ $md_count -gt 0 ]; then
    echo -e "${GREEN}📝 Moving markdown/text files...${NC}"
    mv "$SOURCE_DIR"/*.md "$DUMPS_DIR/research/" 2>/dev/null
    mv "$SOURCE_DIR"/*.txt "$DUMPS_DIR/research/" 2>/dev/null
    echo "   ✓ Moved $md_count markdown/text files"
fi

# HTML files - ask what to do
if [ $html_count -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}🌐 Found $html_count HTML files${NC}"
    echo "   These might be standalone projects (like OPEN.html)"
    read -p "   Keep HTML files in ProPublica folder? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}   Moving HTML files to Dumps/research/${NC}"
        mv "$SOURCE_DIR"/*.html "$DUMPS_DIR/research/" 2>/dev/null
        echo "   ✓ Moved $html_count HTML files"
    else
        echo "   ⊙ Keeping HTML files in place"
    fi
fi

echo ""
echo "======================================================"
echo -e "${GREEN}✅ Organization complete!${NC}"
echo "======================================================"
echo ""
echo "📊 Summary:"
echo "   • Audio files → Dumps/audio/"
echo "   • PDF files → Dumps/pdfs/"
echo "   • Images → Dumps/images/"
echo "   • Markdown/Text → Dumps/research/"
echo ""
echo "🤖 Next steps:"
echo "   1. Run automation script:"
echo "      cd $DUMPS_DIR"
echo "      python3 lyra-automation.py"
echo ""
echo "   2. Check the updated research index:"
echo "      cat $DUMPS_DIR/data/research-index.json"
echo ""
echo "   3. Open your website:"
echo "      firefox /home/saba/Desktop/index.html"
echo ""
echo "💚 Your research hub is ready to go!"
echo ""
