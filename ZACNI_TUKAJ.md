# 🚀 LYRA ACTIVE - Desktop PWA

## ✅ VSE JE PRIPRAVLJENO!

Vaša spletna stran je **100% funkcionalna Progressive Web App (PWA)** za desktop!

### 🎯 Hitri začetek

```bash
cd /home/saba/Desktop/ProPublica
./start-server.sh
```

Potem odprite: **http://localhost:8080**

### 📦 Kaj je narejeno?

1. ✅ **Desktop PWA** z offline podporo
2. ✅ **Ikone** (vse velikosti, 72px - 512px)
3. ✅ **Service Worker** z pametnim cache-anjem
4. ✅ **Manifest.json** za instalacijo
5. ✅ **Dark mode** toggle
6. ✅ **Responsive design**

### 🔥 Glavne funkcije

- **Offline delovanje** - stran deluje brez interneta
- **Installable** - lahko instalirate kot desktop app
- **Cache strategije** - pametno shranjevanje za hitro nalaganje
- **Shortcuts** - bližnjice v desktop meniju
- **Lahko raste** - dodajate nove projekte in raziskave

### 📱 Instalacija kot Desktop App

1. Odprite `http://localhost:8080` v **Chrome** ali **Edge**
2. V naslovni vrstici kliknite na ikono **Install** (⊕)
3. Kliknite **"Install"**
4. Aplikacija se bo odprla v ločenem oknu!

### ➕ Dodajanje novega vsebine

#### Nov projekt
Uredite `index.html` → sekcija `#projects` → kopirajte obstoječi project card

#### Nova raziskava
Uredite `index.html` → sekcija `#research` → dodajte v ustrezno kategorijo

#### Nova HTML stran
Ustvarite novo `.html` datoteko v mapi → service worker bo avtomatsko cacheiral

### 🎨 Spreminjanje ikon

```bash
# 1. Uredite SVG ikono
nano icons/icon.svg

# 2. Regenerirajte PNG ikone
./generate-icons.sh
```

### 📚 Dokumentacija

Podrobna navodila: `PWA_NAVODILA.md`

### 🗂️ Struktura (VSE v ProPublica mapi!)

```
/home/saba/Desktop/ProPublica/
├── index.html              # Glavna stran
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── icons/                  # Ikone
├── data/                   # JSON podatki
├── images/                 # Slike
├── audio/                  # MP3 datoteke
├── pdfs/                   # PDF dokumenti
├── html/                   # HTML moduli
├── start-server.sh         # Zagon serverja
└── generate-icons.sh       # Generator ikon
```

**NIČ NI NA DESKTOPU** - vse je v ProPublica mapi! ✅

### 🌐 Deployment v produkcijo

**GitHub Pages:**
```bash
cd /home/saba/Desktop/ProPublica
git init
git add .
git commit -m "LYRA PWA ready"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

**Netlify/Vercel:**
Drag & drop celotno mapo → objavi!

---

## 🎉 VSE DELUJE - UŽIVAJTE!

Vaša stran lahko zdaj:
- Deluje **offline**
- Se **instalira** na desktop
- **Raste** skozi čas (dodajate nove projekte)
- Ima **PWA** funkcionalnosti

**Začnite s `./start-server.sh` in odprite http://localhost:8080** 🚀
