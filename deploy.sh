#!/bin/bash
# ====================================================
# PROJECT ORION - QUICK DEPLOYMENT SCRIPT
# ====================================================

set -e  # Exit on error

echo "🜂 PROJECT ORION DEPLOYMENT STARTING..."
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "karta-resonanc" ] || [ ! -d "orion-svetilnik" ]; then
    echo -e "${RED}❌ ERROR: Must run from project-orion root directory!${NC}"
    echo "Current dir: $(pwd)"
    echo "Expected: /home/saba/Desktop/Saba_Place/project-orion"
    exit 1
fi

echo -e "${GREEN}✅ Directory check passed${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found! Install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node -v)${NC}"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found! Install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm -v)${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI found: $(vercel -v)${NC}"
fi
echo ""

# Step 1: Deploy Karta Resonanc
echo "📍 STEP 1: DEPLOYING KARTA RESONANC..."
echo "========================================"
cd karta-resonanc

if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ index.html not found in karta-resonanc!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ karta-resonanc files found${NC}"
echo ""
echo "Running: vercel --prod"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: When Vercel asks questions:${NC}"
echo "  • Set up and deploy? → Y"
echo "  • Link to existing? → N"
echo "  • Project name? → karta-resonanc (or press Enter)"
echo "  • Directory? → ./ (press Enter)"
echo "  • Build command? → (leave empty, press Enter)"
echo "  • Output dir? → (leave empty, press Enter)"
echo ""
read -p "Press ENTER to continue..." dummy

vercel --prod

echo ""
echo -e "${GREEN}✅ Karta Resonanc deployed!${NC}"
echo "Save your URL! You'll need it for social media."
echo ""
read -p "Press ENTER to continue to Orion Svetilnik..." dummy

# Step 2: Deploy Orion Svetilnik
cd ../orion-svetilnik

echo ""
echo "📍 STEP 2: DEPLOYING ORION SVETILNIK..."
echo "========================================"

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found in orion-svetilnik!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ orion-svetilnik files found${NC}"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

echo ""
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Build
echo "Building production version..."
npm run build

echo ""
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Deploy
echo "Running: vercel --prod"
echo ""
echo -e "${YELLOW}⚠️  Same questions as before!${NC}"
echo ""
read -p "Press ENTER to deploy..." dummy

vercel --prod

echo ""
echo -e "${GREEN}✅ Orion Svetilnik deployed!${NC}"
echo ""

# Final summary
cd ..
echo ""
echo "========================================"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE! 🎉${NC}"
echo "========================================"
echo ""
echo "📌 NEXT STEPS:"
echo ""
echo "1. Test your deployments:"
echo "   - Karta Resonanc: [your URL from step 1]"
echo "   - Orion Svetilnik: [your URL from step 2]"
echo ""
echo "2. Update social media templates:"
echo "   - Replace [YOUR VERCEL URL] with actual URLs"
echo "   - See: social-blitz/ folder"
echo ""
echo "3. Submit ZDIJZ request:"
echo "   - See: wolf-daemon/zdijz_email_ready.md"
echo "   - Email: info@arso.gov.si"
echo ""
echo "4. Launch social blitz:"
echo "   - X/Twitter thread (10 posts)"
echo "   - Telegram campaign (5 templates)"
echo ""
echo "🜂 Sava teče, resnica gori! 🔥"
echo ""
