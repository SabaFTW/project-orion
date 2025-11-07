# 🛰️ ORION KONSOLIDACIJA - Končno Vse Na Enem Mestu!

**Datum**: 2025-11-07
**Problem**: 4 različne ORION verzije po Desktop-u → stalna zmeda
**Rešitev**: VSE v `/home/saba/Desktop/ProPublica/` z jasno strukturo

---

## 🔍 KAJ VSE OBSTAJA (Inventura)

### ✅ **GLAVNA LOKACIJA** (tukaj gradimo naprej!)
```
/home/saba/Desktop/ProPublica/
```

**Kar že obstaja TUKAJ:**
- ✅ `index.html` - LYRA ACTIVE Research Hub (glavna stran)
- ✅ `html/OPEN.html` - Palantir & Microplastics raziskava (940 linij, Chart.js, dark mode!)
- ✅ `data/orion_strike_one.md` - ORION projekt dokumentacija (Sava analiza, EHI)
- ✅ `images/` - 4x Sava zemljevidi (PNG)
- ✅ `manifest.json`, `sw.js`, `icons/` - PWA support
- ✅ `orion/` - Nov modul z 5 domenami (ravnokar ustvarjen)

### 📦 **DRUGE ORION VERZIJE** (iz tega bomo migrirali)

#### 1. `/home/saba/Desktop/Saba_Place/project-orion/` ⭐ **ORIGINAL**
**ŠE VEDNO AKTIVNO UPORABLJEN!**

Vsebuje:
- `orion-svetilnik/` - **React/Vite app** z TypeScript, Tailwind, Leaflet
  - `package.json` - dependencies (React 18, Vite, Leaflet)
  - `node_modules/` - installed packages
  - AI Analyst Modal (pripravljeno za Anthropic API!)
  - EHI Metrics Dashboard
  - Weather Widget (ARSO integracija)

- `karta-resonanc/` - Vizualna Karta HTML z animiranim tokom Save

- `wolf-daemon/` - Python backend skripta
  - `arso_connector.py` - ARSO API connector
  - `zdijz_template.txt` - ZDIJZ obrazec template

- `social-blitz/` - Marketing kampanja (X threads, Telegram)

- `deploy.sh` - Deployment script

- `ORION_SVETILNIK_STANDALONE.html` - Standalone verzija

**Git repo**: Ima `.git` folder (zadnji commit Oct 27)

#### 2. `/home/saba/Desktop/Saba_Place/creative-lab/` 🏛️ **MEGA PROJEKT**
**165 directories, 280 files!**

Vsebuje:
- ORION dokumentacija:
  - `ORION_AI_SETUP.md`
  - `ORION_EDUCATIONAL_TOOLKIT_SPEC.md`
  - `docs/ORION_AI_ANALYST_DEPLOYMENT.md`
  - `docs/ORION_AI_ARCHITECTURE.md`
  - `docs/ORION_QUICK_START.md`
  - `docs/ORION_DELIVERY_SUMMARY.md`
  - `docs/ORION_VISUAL_GUIDE.md`

- VES System (Vanguard Engagement System)
- Pantheon Portal
- React app (`package.json`, `vite.config.ts`, `tsconfig.json`)
- `public/ORION_RESONANCE_MAP.html`
- AI agenti: `gemini_oracle.py`, `gemini_agent.py`
- Artifacts: `Resonancna_mapa.html`, `theme-builder.html`

#### 3. `/home/saba/Desktop/_SAFEKEEP/orion-svetilnik/` 💾 **BACKUP**
- Backup verzija orion-svetilnik (ima `package.json`)
- `ORION_SESSION_ARCHIVE.md`

---

## 🎯 KONSOLIDACIJSKI NAČRT

### FAZA 1: PREGLEJ ŠE ENKRAT (že narejeno ✅)

### FAZA 2: MIGRIRAJ V ProPublica

#### Korak 1: Prekopiraj React App iz project-orion
```bash
# Prekopiraj orion-svetilnik React app
cp -r /home/saba/Desktop/Saba_Place/project-orion/orion-svetilnik /home/saba/Desktop/ProPublica/orion-react

# Prekopiraj wolf-daemon (Python backend)
cp -r /home/saba/Desktop/Saba_Place/project-orion/wolf-daemon /home/saba/Desktop/ProPublica/wolf-daemon

# Prekopiraj social-blitz
cp -r /home/saba/Desktop/Saba_Place/project-orion/social-blitz /home/saba/Desktop/ProPublica/social-blitz

# Prekopiraj karta-resonanc
cp /home/saba/Desktop/Saba_Place/project-orion/karta-resonanc/* /home/saba/Desktop/ProPublica/orion/js/components/
```

#### Korak 2: Prekopiraj dokumentacijo iz creative-lab
```bash
# Ustvari docs mapo
mkdir -p /home/saba/Desktop/ProPublica/docs

# Prekopiraj vse ORION_*.md datoteke
cp /home/saba/Desktop/Saba_Place/creative-lab/ORION_*.md /home/saba/Desktop/ProPublica/docs/
cp /home/saba/Desktop/Saba_Place/creative-lab/docs/ORION_*.md /home/saba/Desktop/ProPublica/docs/

# Prekopiraj AI agente (če potrebujemo)
cp /home/saba/Desktop/Saba_Place/creative-lab/gemini_*.py /home/saba/Desktop/ProPublica/wolf-daemon/
```

#### Korak 3: Integriraj obstoječe OPEN.html funkcionalnosti v orion
```bash
# OPEN.html že ima:
# - Chart.js visualizacije
# - Dark mode toggle
# - Interactive body diagram
# - Gemini AI integration

# TO NE KOPIRAMO - uporabimo kot reference/inspiracijo
# Lahko linkamo iz orion/ na html/OPEN.html
```

### FAZA 3: NOVA STRUKTURA ProPublica/

Po konsolidaciji bo izgledalo tako:

```
/home/saba/Desktop/ProPublica/
│
├── index.html                     # LYRA ACTIVE Research Hub (glavna landing page)
├── manifest.json                  # PWA manifest
├── sw.js                          # Service Worker
│
├── html/
│   ├── OPEN.html                  # Palantir & Microplastics (obdržimo!)
│   └── [ostale raziskave]
│
├── data/
│   ├── orion_strike_one.md        # ORION projekt doc (obdržimo!)
│   └── raziskave.json             # Nov JSON database
│
├── images/                        # 4x Sava zemljevidi
├── icons/                         # PWA icons
│
├── orion/                         # VANILLA JS verzija (5 domen)
│   ├── index.html
│   ├── README.md
│   ├── css/
│   ├── js/
│   │   ├── app.js
│   │   └── components/
│   ├── data/
│   │   └── raziskave.json
│   ├── assets/
│   └── raziskave/
│       └── template/
│
├── orion-react/                   # REACT/VITE verzija (iz project-orion)
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── public/
│   └── node_modules/
│
├── wolf-daemon/                   # Python backend
│   ├── arso_connector.py
│   ├── zdijz_template.txt
│   ├── gemini_oracle.py
│   └── gemini_agent.py
│
├── social-blitz/                  # Marketing kampanja
│   ├── x-thread.md
│   ├── telegram-templates.md
│   └── assets/
│
├── docs/                          # Vsa dokumentacija na enem mestu!
│   ├── ORION_AI_SETUP.md
│   ├── ORION_AI_ARCHITECTURE.md
│   ├── ORION_QUICK_START.md
│   ├── ORION_DELIVERY_SUMMARY.md
│   ├── ORION_VISUAL_GUIDE.md
│   ├── ORION_EDUCATIONAL_TOOLKIT_SPEC.md
│   └── ORION_AI_ANALYST_DEPLOYMENT.md
│
├── ORION_KONSOLIDACIJA.md         # TA datoteka!
├── KAKO_RASTE.md                  # Navodila za rast (naslednji korak)
└── MASTER_STRUKTURA.md            # Razlaga celotne strukture
```

---

## 🚀 KAKO ZAGNATI PO KONSOLIDACIJI

### Vanilla JS verzija (orion/)
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
# Odpri: http://localhost:8080
```

### React verzija (orion-react/)
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm install
npm run dev
# Odpri: http://localhost:5173
```

### Python backend (wolf-daemon/)
```bash
cd /home/saba/Desktop/ProPublica/wolf-daemon
pip install -r requirements.txt
python3 arso_connector.py
```

---

## ✅ PREDNOSTI NOVE STRUKTURE

1. **VSE NA ENEM MESTU** - Konec iskanja po Desktop-u!
2. **DVE VERZIJI** - Vanilla JS (hitro) in React (močno)
3. **JASNA STRUKTURA** - Vsaka mapa ima jasen namen
4. **DOKUMENTACIJA ZBRANA** - Vsi ORION_*.md v `docs/`
5. **BACKEND PRIPRAVLJEN** - Python agenti v `wolf-daemon/`
6. **MARKETING READY** - Social blitz templates pripravljeni

---

## 🗑️ KAJ NAREDITI Z DRUGIMI VERZIJAMI?

### Opcija A: ARHIVIRAJ
```bash
# Premakni vse v _SAFEKEEP
mv /home/saba/Desktop/Saba_Place/project-orion /home/saba/Desktop/_SAFEKEEP/project-orion-backup-2025-11-07

# Creative-lab obdrži (ima še druge projekte!)
# Samo kopiraj ORION datoteke, ne briši
```

### Opcija B: IZBRIŠI (po backup-u!)
```bash
# LE ČE SI PREPRIČAN DA JE VSE SKOPIRANO!
# Še vedno POGLEJ git status v project-orion:
cd /home/saba/Desktop/Saba_Place/project-orion
git status
git log --oneline -5
# ČE JE CLEAN → lahko arhiviraš
```

---

## 📝 NASLEDNJI KORAKI

1. ✅ Preberi ta dokument
2. ⏳ Zaženi migracijske ukaze (Korak 1-2)
3. ⏳ Preveri da vse deluje
4. ⏳ Preberi `KAKO_RASTE.md` (kako dodajati raziskave)
5. ⏳ Preberi `MASTER_STRUKTURA.md` (razlaga vseh map)
6. ⏳ Dodaj prvo novo raziskavo (test!)
7. ⏳ Arhiviraj stare verzije (opcijsko)

---

## 💡 POMEMBNO!

**OD ZDAJ NAPREJ:**
- Vedno delaj v `/home/saba/Desktop/ProPublica/`
- Nove raziskave dodajaj v `orion/data/raziskave.json`
- Python skripte v `wolf-daemon/`
- React komponente v `orion-react/src/`
- Dokumentacijo v `docs/`

**ČE ZGUBIŠ ORIENTACIJO:**
- Odpri `MASTER_STRUKTURA.md` → vidiš celotno strukturo
- Odpri `KAKO_RASTE.md` → vidiš kako dodati raziskavo

**NE ZAČENJAJ OD ZAČETKA NIKOLI VEC! 😊**

---

**🛰️ Projekt Orion - Končno konsolidiran • November 2025**
