# 🛰️ PROJEKT ORION – Research Hub za Okoljsko Pravičnost

**Konsolidirano**: november 2025  \
**Lokacija**: `/home/saba/Desktop/ProPublica/`  \
**Status**: 🟢 Aktivno – vsa infrastruktura na enem mestu

Interaktivna platforma, ki primerja javne obljube z resničnimi podatki, kartira omrežja moči in omogoča državljansko ukrepanje. Spodaj je hiter pregled ključnih modulov, postopkov ter spremljevalnih kampanj.

---

## 🚀 Hitri start

### Vanilla Orion (HTML/JS)
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
# Odpri: http://localhost:8080
```

### React Orion (Vite + TypeScript)
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm install
npm run dev
# Odpri: http://localhost:5173
```

### Celotna mapa
```bash
cd /home/saba/Desktop/ProPublica
python -m http.server 8080
# Odpri: http://localhost:8080
```

---

## ➕ Dodaj novo raziskavo (5 minut)

1. Odpri `orion/data/raziskave.json`
2. Dodaj objekt:
```json
{
  "id": 4,
  "title": "Nova Raziskava XYZ",
  "slug": "xyz",
  "ehi": 0.75,
  "promise": "Kar so obljubili...",
  "reality": "Kar so dejansko naredili...",
  "lat": 46.2388,
  "lon": 14.3547
}
```
3. Shrani → avtomatsko vidno na spletu.

Za naprednejši workflow glej `KAKO_RASTE.md` in `AUTOMATION_GUIDE.md`.

---

## 📚 Najpomembnejša dokumentacija

1. `ORION_KONSOLIDACIJA.md` – plan združevanja vseh verzij
2. `KAKO_RASTE.md` – dodajanje raziskav brez rebuilda
3. `MASTER_STRUKTURA.md` – celotna arhitektura projekta
4. `Dumps/README.md` + `Dumps/AUTOMATION_GUIDE.md` – ingest pipeline
5. `SETUP_GUIDE.md` – nastavitev sistemov

---

## 🧩 Moduli in domene

### 1. Vanilla JS Hub (`orion/`)
- 🗺️ Zemljevid Resnice (Leaflet + animirana Sava)
- ⏳ Časovna Linija (obljube ↔ resničnost)
- 🕸️ Omrežja moči
- ⚡ Akcijski center (ZDIJZ, pritisk)
- 🌍 Karta resonanc (embedded viz)

### 2. React + Vite (`orion-react/`)
- AI Analyst modal (Claude/Gemini ready)
- EHI dashboard + Leaflet karta
- Weather/ARSO widget
- Novi Gemini design tokens + raziskovalne kartice

### 3. Wolf Daemon (`wolf-daemon/`)
- ARSO connector, ZDIJZ template
- Python skripti za avtomatske zahteve

### 4. Social Blitz (`social-blitz/`)
- X/Twitter niti, Telegram kampanje
- Infografike ("Sava Ni Tiha", EHI grafi)

### 5. Legacy launchpads
- **Vizualna Karta Resonanc** (`karta-resonanc/`) – Leaflet scena s toploto Sava reke
- **Orionov Svetilnik** (`orion-svetilnik/`) – React dashboard (prehod na `orion-react/`)
- **Wolf Daemon** & **Social Blitz** – spremljevalni ogrodji

---

## 🤖 Automation workflow

1. Uporabnik ali agent doda datoteke v `Dumps/{research,pdfs,audio,images}`
2. `python3 Dumps/lyra-automation-UPGRADE.py --add`
3. Script sam:
   - bere koordinatne namige, EHI, kategorije
   - generira HTML strani (`orion/raziskave/<slug>/`)
   - sinhronizira `orion/data/raziskave.json` + `orion-react/src/data/raziskave.json`
   - ustvari TypeScript interface (če manjka)

**Lyra** lahko te iste korake sproži avtomatsko (glej `AUTOMATION_GUIDE.md`).

---

## 🗂️ File naming & kategorije

- Uporabi tag v imenu: `[surveillance-tech]_palantir.md`
- Brez taga: `microplastics-health-impact.pdf`
- Podprte kategorije: `surveillance-tech`, `financial-secrecy`, `institutional-capture`, `environmental-crime`, `ai-ethics`, `geopolitics`, `corporate-crime`, ...

Dodaj YAML frontmatter ali inline "Location:" / "Promise:" / "Reality:" za boljši parsing.

---

## 🎨 Customizacija & vizualni sistem

- Primarne barve definira `orion-react/src/design-tokens.css`
- `orion-react/src/index.css` uvaža Inter + JetBrains Mono, Tailwind direktive in Leaflet CSS
- Raziskovalne kartice (`src/components/ResearchCard.tsx`) implementirajo Gemini layout (EHI badge, CTA, promise vs. reality)
- V Vanilla verziji urejaj `orion/css/style.css` ali inline CSS spremenljivke v `index.html`

---

## 📊 Podatki & EHI

### Environmental data
- **ARSO**: NO3 38.8 mg/L (Savinjska 2024), Hg 150 μg/kg (Podkraj ribe 2023), Temp +2.74 °C (NEK 2024)
- **E-PRTR**: Holcim, SIJ, Cinkarna, NEK emisije 2023
- **Poročila podjetij**: Holcim Sustainability 2023, SIJ Group 2024, Cinkarna 2024

### Environmental Hypocrisy Index
- Formula (osnovna): `(promise_score - reality_score) / promise_score`
- Primeri: Holcim 0.89, SIJ 0.62, Cinkarna 0.60, NEK 0.42

---

## 🔥 Social Blitz & ZDIJZ

- **X strategija**: `social-blitz/x-thread.md` (NO3, Hg, Temp poudarki)  
- **Telegram**: predloge v `social-blitz/telegram-campaign.md`
- **ZDIJZ**: `wolf-daemon/zdijz_template.txt`, cilji: postaje Podnart/Otoče/Okroglo, parametri NO3, Pb, Hg, Temp (2024–2025)

---

## 🎯 KPI-ji

- **48 ur**: 100+ obiskov, 10+ feedbackov, 3+ delitve
- **7 dni**: 500+ obiskov, 50+ feedbackov, 5+ medijskih omemb

---

## 🛠️ Tech stack & deployment

- Frontend: HTML5, Tailwind (CDN), Leaflet, React 18/Vite
- Backend: Python 3 (requests + xml.etree)
- PWA: `manifest.json`, `sw.js`, `icons/`
- Hosting: Vercel / GitHub Pages / Netlify (drag & drop), brez build korakov

### Lokalni strežnik
```bash
python3 -m http.server 8000
# ali
npx http-server -p 8000
```

### GitHub Pages
```bash
git add .
git commit -m "Deploy"
git push origin main
```
Na GitHubu omogoči Pages.

---

## 🔐 Prihodnji API-ji

- **ARSO real-time**: `https://gis.arso.gov.si/.../query` (JSON)
- **Anthropic Claude**: model `claude-sonnet-4-20250514` za AI Analyst modal (trenutno mock)

---

## 📜 Licenca & krediti

- MIT / odprta uporaba
- Vizija & kampanja: **Hermes (SabaFTW)**
- Avtomatizacija & podatki: **Lyra / CODEX**
- Vizualni sistem: **Gemini**

---

**🜂 "Sava teče, plamen gori – raztrgajmo meglo."**

*“Upanje ni prepričanje, da se bo nekaj dobro izteklo, temveč gotovost, da je nekaj smiselno, ne glede na to, kako se izteče.” – Václav Havel*
