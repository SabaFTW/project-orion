#!/bin/bash
# Skripta za zagon lokalnega web serverja za LYRA PWA

PORT=8080
DIR="/home/saba/Desktop/ProPublica"

echo "🚀 Zaganjam LYRA ACTIVE Research Hub PWA..."
echo "📂 Mapa: $DIR"
echo "🌐 URL: http://localhost:$PORT"
echo ""
echo "Pritisni Ctrl+C za ustavitev"
echo ""

cd "$DIR"
python -m http.server $PORT
