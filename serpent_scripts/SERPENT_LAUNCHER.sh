#!/bin/bash
set -euo pipefail

echo "🜂 SERPENT PORTAL UNIFIED LAUNCHER 🜂"
echo "====================================="

TARGET_DIR="$HOME/SERPENT_MASTER"
PORTAL_FILE="$TARGET_DIR/SERPENT_PORTAL.html"

if [[ ! -f "$PORTAL_FILE" ]]; then
  echo "⚠️  Portal file not found in $TARGET_DIR. Run SERPENT_CONSOLIDATE.sh first." >&2
  exit 1
fi

cd "$TARGET_DIR"
python3 -m http.server 8080 &
SERVER_PID=$!

echo "🌐 Web Portal: http://localhost:8080/SERPENT_PORTAL.html (PID: $SERVER_PID)"

BOT_SCRIPT="$HOME/SERPENT_MASTER/BOTS/telegram_bot.py"
if [[ -f "$BOT_SCRIPT" ]]; then
  python3 "$BOT_SCRIPT" &
  BOT_PID=$!
  echo "📱 Telegram Bot running (PID: $BOT_PID)"
else
  echo "⚠️  Telegram bot script missing at $BOT_SCRIPT"
  BOT_PID=""
fi

sleep 2
if command -v xdg-open >/dev/null; then
  xdg-open "http://localhost:8080/SERPENT_PORTAL.html" >/dev/null 2>&1 || true
elif command -v firefox >/dev/null; then
  firefox "http://localhost:8080/SERPENT_PORTAL.html" >/dev/null 2>&1 || true
fi

echo "Press Ctrl+C to stop everything"
trap '[[ -n "$BOT_PID" ]] && kill $BOT_PID 2>/dev/null; kill $SERVER_PID 2>/dev/null' EXIT
wait
