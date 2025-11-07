import json
import os
import requests
import telebot

BOT_TOKEN = os.environ.get("SERPENT_TELEGRAM_TOKEN", "YOUR_BOT_TOKEN")
PORTAL_URL = os.environ.get("SERPENT_PORTAL_URL", "http://localhost:8080")
API_DATA_ENDPOINT = f"{PORTAL_URL}/data"
BACKUP_ENDPOINT = f"{PORTAL_URL}/backup"

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start', 'help'])
def help_message(message):
    bot.reply_to(message, "🐍 Serpent Bot Aktiviran\nUporabi /sync ali /backup")

@bot.message_handler(commands=['sync'])
def sync_data(message):
    try:
        response = requests.get(API_DATA_ENDPOINT, timeout=5)
        response.raise_for_status()
        data = response.json()
        bot.reply_to(message, f"🐍 Serpent Status:\n{json.dumps(data, indent=2)}")
    except Exception as exc:
        bot.reply_to(message, f"⚠️ Napaka: {exc}")

@bot.message_handler(commands=['backup'])
def backup_now(message):
    try:
        requests.post(BACKUP_ENDPOINT, timeout=5)
        bot.reply_to(message, "✅ Backup triggered!")
    except Exception as exc:
        bot.reply_to(message, f"⚠️ Napaka: {exc}")

if __name__ == '__main__':
    print("🐍 Telegram bot running...")
    bot.polling()
