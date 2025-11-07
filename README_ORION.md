# 🛰️ PROJEKT ORION - Research Hub za Okoljsko Pravičnost

**Konsolidirano: November 2025** | **Lokacija**: `/home/saba/Desktop/ProPublica/` | **Status**: 🟢 VSE NA ENEM MESTU!

Interaktivna platforma za analizo okoljske hipokrizije s fokusom na Slovenijo.

**Primerjamo javne obljube z resničnimi podatki. Kartiramo omrežja moči. Omogočamo državljansko ukrepanje.**

---

## 🚀 HITRI START

### Vanilla JS verzija (5 minut)
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
# Odpri: http://localhost:8080
```

### React verzija (z AI)
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm install && npm run dev
# Odpri: http://localhost:5173
```

### Dodaj raziskavo (2 minuti!)
1. Odpri `orion/data/raziskave.json`
2. Dodaj nov vnos (kopiraj template)
3. Shrani → **DONE!**

---

## 📚 DOKUMENTACIJA ⭐

**START TUKAJ** (po vrstnem redu):

1. **`ORION_KONSOLIDACIJA.md`** - Kje je kaj, kaj obstaja, plan konsolidacije
2. **`KAKO_RASTE.md`** - Kako dodajati raziskave BREZ rebuild-anja
3. **`MASTER_STRUKTURA.md`** - Razlaga celotne strukture

**Specifično**:
- `orion/README.md` - Vanilla JS modul dokumentacija
- `docs/ORION_*.md` - AI setup, arhitektura, deployment

---

## 🧩 MODULI

| Modul | Tehnologija | Namen |
|-------|------------|--------|
| `orion/` | Vanilla JS + Leaflet | 5 domen (zemljevid, časovna linija, omrežja, akcije, karta) |
| `orion-react/` | React + TypeScript + Vite | AI chat, EHI dashboard, ARSO weather |
| `wolf-daemon/` | Python 3.10+ | ARSO connector, ZDIJZ templates, AI agenti |
| `social-blitz/` | Markdown templates | X threads, Telegram, infografike |

---

## 📁 ŠE OBSTAJA (Ne briši!)

- `index.html` - LYRA ACTIVE glavna stran
- `html/OPEN.html` - Palantir & Microplastics (Chart.js, AI)
- `data/orion_strike_one.md` - Sava River analiza
- `images/` - 4x Sava zemljevidi
- `manifest.json`, `sw.js`, `icons/` - PWA support

---

## 🎯 WORKFLOW ZA NOVO RAZISKAVO

```bash
# 1. Dodaj v JSON
nano orion/data/raziskave.json

# 2. Testiraj lokalno
cd orion && python -m http.server 8080

# 3. Commit
git add orion/data/raziskave.json
git commit -m "Add XYZ research (EHI: 0.78)"

# DONE! Čas: 5 min ⚡
```

---

## 🔧 TECH STACK

**Frontend**: HTML, Leaflet.js, Tailwind CSS (CDN) | React 18, TypeScript, Vite
**Backend**: Python 3.10+, requests, pandas
**Maps**: Leaflet.js + OpenStreetMap
**Graphs**: Chart.js
**PWA**: Service Worker, Manifest
**AI**: Anthropic Claude (ready), Gemini

---

## 🚀 DEPLOYMENT

### Netlify (najhitrejše)
```bash
cd /home/saba/Desktop/ProPublica
netlify deploy --prod
```

### Vercel (za React)
```bash
cd orion-react && vercel --prod
```

### GitHub Pages
```bash
git init && git add . && git commit -m "Orion launch 🛰️"
git remote add origin https://github.com/USERNAME/ProPublica.git
git push -u origin main
# Settings → Pages → Source: main
```

---

## 💡 IMPORTANT!

### ✅ VEDNO:
- Delaj v `/home/saba/Desktop/ProPublica/`
- Uporabljaj template-e (`KAKO_RASTE.md`)
- Testiraj lokalno pred commit
- Commit pogosto

### ❌ NIKOLI:
- Ne ustvari map zunaj ProPublica/
- Ne začni od začetka (6. rebuild!)
- Ne pozabi commit

### 🆘 KO SI IZGUBLJEN:
Preberi `ORION_KONSOLIDACIJA.md` → `KAKO_RASTE.md` → `MASTER_STRUKTURA.md`

---

## 📊 PODATKI

- **ARSO** - Agencija RS za okolje (NO3, Hg, Temp)
- **E-PRTR** - European Pollutant Register
- **EHI** - Environmental Hypocrisy Index (obljuba vs. resnica)
- **ZDIJZ** - Zakon o dostopu do informacij javnega značaja

---

## 🤝 CONTRIBUTING

1. Fork repo
2. Dodaj raziskavo v `orion/data/raziskave.json`
3. Pull request

---

## 📜 LICENCA

**MIT License** - Svobodno uporabi, kopiraj, spremeni, deli.

---

## 🔗 LINKS

- **Documentation**: `/docs/`
- **Original Orion**: Konsolidirano v ProPublica (glej `ORION_KONSOLIDACIJA.md`)

---

**"Resnica ni tisto, kar ti povejo. Resnica je tisto, kar sam najdeš."**

🛰️ **PROJEKT ORION** • November 2025 • Made with 🔥 in Slovenia
