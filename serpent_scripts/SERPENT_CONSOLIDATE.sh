#!/bin/bash
set -euo pipefail

TARGET_DIR="$HOME/SERPENT_MASTER"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

echo "🜂 SERPENT CONSOLIDATION PROTOCOL 🜂"

find ~ -iname "*serpent*" -type f > serpent_inventory.txt
TOTAL=$(wc -l < serpent_inventory.txt)
echo "Found $TOTAL serpent files!"

newest_portal=$(find ~ -iname "serpent*.html" -printf '%T@ %p\n' | sort -nr | head -1 | cut -d' ' -f2-)
if [[ -n "$newest_portal" && -f "$newest_portal" ]]; then
  cp "$newest_portal" ./SERPENT_PORTAL.html
  echo "✅ Master portal saved from $newest_portal"
else
  echo "⚠️  No serpent portal HTML found." >&2
fi
