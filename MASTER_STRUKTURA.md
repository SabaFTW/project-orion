# 🗺️ MASTER STRUKTURA - Projekt Orion

**Namen**: Razlaga VSEGA kar je v `/home/saba/Desktop/ProPublica/`
**Uporaba**: Ko se zgubiš ali pozabiš kje je kaj

---

## 📂 CELOTNA STRUKTURA

```
/home/saba/Desktop/ProPublica/
│
├── 📄 index.html                          # GLAVNA STRAN - LYRA ACTIVE Research Hub
├── 📄 manifest.json                       # PWA manifest (App name, icons, shortcuts)
├── 📄 sw.js                               # Service Worker (offline support)
│
├── 📄 ORION_KONSOLIDACIJA.md              # Plan za konsolidacijo vseh verzij
├── 📄 KAKO_RASTE.md                       # Navodila kako dodati raziskave
├── 📄 MASTER_STRUKTURA.md                 # TA DATOTEKA - razlaga vsega!
│
├── 📁 html/                               # RAZISKAVE (kompleksne HTML strani)
│   ├── OPEN.html                          # Palantir & Microplastics (940 linij)
│   │                                      # - Chart.js grafi
│   │                                      # - Dark mode toggle
│   │                                      # - Interactive body diagram
│   │                                      # - Gemini AI integration
│   └── [prihodnje raziskave...]
│
├── 📁 data/                               # PODATKI
│   ├── orion_strike_one.md                # ORION projekt dokumentacija
│   │                                      # - Sava River analiza
│   │                                      # - EHI calculations
│   │                                      # - Scientific sources
│   │                                      # - Network of power
│   └── raziskave.json                     # JSON database za orion modul
│
├── 📁 images/                             # SLIKE
│   ├── sava_map1.png                      # Sava River zemljevid 1
│   ├── sava_map2.png                      # Sava River zemljevid 2
│   ├── sava_map3.png                      # Sava River zemljevid 3
│   └── sava_map4.png                      # Sava River zemljevid 4
│
├── 📁 icons/                              # PWA IKONE
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── ...
│
├── 📁 orion/                              # VANILLA JS VERZIJA (5 domen)
│   ├── 📄 index.html                      # Landing page z tab navigation
│   ├── 📄 README.md                       # Dokumentacija za orion modul
│   ├── 📄 manifest.json                   # PWA manifest
│   ├── 📄 sw.js                           # Service Worker
│   │
│   ├── 📁 css/
│   │   └── style.css                      # Custom styling, animations, EHI colors
│   │
│   ├── 📁 js/
│   │   ├── app.js                         # Glavna logika (tabs, PWA, data loading)
│   │   └── 📁 components/                 # Modularne komponente
│   │       ├── zemljevid.js               # Leaflet zemljevid z Sava flow animation
│   │       ├── casovnica.js               # Timeline (obljube vs. resnica)
│   │       ├── omrezja.js                 # Network mapping (financial connections)
│   │       ├── akcije.js                  # Action center (ZDIJZ, testing, pressure)
│   │       └── karta.js                   # Embedded Karta Resonanc
│   │
│   ├── 📁 data/
│   │   └── raziskave.json                 # JSON database (3 mock raziskave)
│   │
│   ├── 📁 assets/
│   │   ├── 📁 icons/                      # PWA ikone (192x192, 512x512)
│   │   └── 📁 images/                     # Slike za orion
│   │
│   └── 📁 raziskave/                      # PODROBNE RAZISKAVE
│       ├── 📁 template/                   # Template za nove raziskave
│       │   ├── index.html                 # HTML template z [PLACEHOLDER]
│       │   └── data.json                  # JSON template
│       ├── 📁 sij-acroni/                 # Primer raziskave
│       └── 📁 lafarge/                    # Primer raziskave
│
├── 📁 orion-react/                        # REACT/VITE VERZIJA (iz project-orion)
│   ├── 📄 package.json                    # Dependencies (React 18, Vite, Leaflet)
│   ├── 📄 vite.config.ts                  # Vite konfiguracija
│   ├── 📄 tsconfig.json                   # TypeScript config
│   ├── 📄 tailwind.config.js              # Tailwind CSS config
│   │
│   ├── 📁 src/
│   │   ├── main.tsx                       # Entry point
│   │   ├── App.tsx                        # Glavna komponenta
│   │   ├── 📁 components/
│   │   │   ├── ZemljevidResnice.tsx       # Leaflet zemljevid komponenta
│   │   │   ├── AIAnalystModal.tsx         # AI chat modal (Anthropic ready)
│   │   │   ├── EHIMetrics.tsx             # EHI dashboard
│   │   │   └── WeatherWidget.tsx          # ARSO weather integracija
│   │   ├── 📁 pages/
│   │   │   ├── Home.tsx
│   │   │   └── Research.tsx
│   │   └── 📁 styles/
│   │       └── index.css
│   │
│   ├── 📁 public/
│   │   └── [static assets]
│   │
│   └── 📁 node_modules/                   # Installed packages
│
├── 📁 wolf-daemon/                        # PYTHON BACKEND
│   ├── arso_connector.py                  # ARSO API connector
│   ├── zdijz_template.txt                 # ZDIJZ obrazec template
│   ├── gemini_oracle.py                   # Gemini AI agent (iz creative-lab)
│   ├── gemini_agent.py                    # Gemini AI helper
│   └── requirements.txt                   # Python dependencies
│
├── 📁 social-blitz/                       # MARKETING KAMPANJA
│   ├── x-thread.md                        # 10-post X thread
│   ├── telegram-templates.md              # Telegram kampanja
│   └── 📁 assets/
│       ├── ehi-bar-chart.png              # Infografika
│       └── sava-ni-tiha-meme.png          # Meme
│
└── 📁 docs/                               # DOKUMENTACIJA
    ├── ORION_AI_SETUP.md                  # AI setup navodila
    ├── ORION_AI_ARCHITECTURE.md           # AI arhitektura
    ├── ORION_QUICK_START.md               # Hitri start
    ├── ORION_DELIVERY_SUMMARY.md          # Delivery povzetek
    ├── ORION_VISUAL_GUIDE.md              # Vizualni vodič
    ├── ORION_EDUCATIONAL_TOOLKIT_SPEC.md  # Educational toolkit
    └── ORION_AI_ANALYST_DEPLOYMENT.md     # AI analyst deployment
```

---

## 🎯 KAJ JE KATER MODUL?

### 1. **LYRA ACTIVE Research Hub** (`index.html`)
- **Namen**: Glavna landing page za vse raziskave
- **Tehnologija**: HTML, CSS, JavaScript
- **Funkcije**:
  - Seznam raziskav
  - PWA support (install button)
  - Links na posamezne raziskave

**Kdaj uporabiti**: Glavna vstopna točka projekta

---

### 2. **Kompleksne Raziskave** (`html/`)

#### OPEN.html - Palantir & Microplastics
- **Namen**: Podrobna interaktivna raziskava o mikroplastiki
- **Tehnologija**: HTML, Chart.js, Gemini AI
- **Funkcije**:
  - Pollution bar chart (top polluters)
  - Brain concentration timeline
  - Interactive body diagram (health impacts)
  - Dark mode toggle
  - Gemini AI action planning
  - Share to social media

**Kdaj uporabiti**: Template za kompleksne raziskave z grafi in AI

---

### 3. **Orion Vanilla JS** (`orion/`)
- **Namen**: Modularni sistem za hitro dodajanje raziskav
- **Tehnologija**: HTML, Vanilla JS, Leaflet, Tailwind CSS
- **5 Domen**:

#### 🗺️ Zemljevid Resnice (`zemljevid.js`)
- Leaflet zemljevid reke Save
- Industrijski obrati (markers)
- EHI-based barve (green → red)
- Animated Sava flow
- Clickable popups s podatki

#### ⏳ Časovna Linija (`casovnica.js`)
- Timeline 1960-2025
- Obljube vs. resnica
- Color-coded events (zeleno/rdeče)
- Historical analysis (SIJ Group)

#### 🕸️ Omrežja Moči (`omrezja.js`)
- Financial connections
- Corporate influence mapping
- Actor network grid
- Critical findings (structural conflicts)

#### ⚡ Akcijski Center (`akcije.js`)
- 4 action cards:
  1. ZDIJZ zahteva (template download)
  2. Independent testing
  3. Political pressure
  4. Media campaign
- Difficulty + time estimates
- Resonance Formula

#### 🌍 Karta Resonanc (`karta.js`)
- Embedded vizualna karta
- Cross-reference z industrial sites
- Tab switching helpers

**Kdaj uporabiti**: Za hitro dodajanje osnovnih raziskav (JSON-driven)

---

### 4. **Orion React** (`orion-react/`)
- **Namen**: Močna React/TypeScript aplikacija z AI
- **Tehnologija**: React 18, TypeScript, Vite, Tailwind, Leaflet
- **Key Features**:
  - AI Analyst Modal (Anthropic Claude ready!)
  - ZemljevidResnice komponenta
  - EHI Metrics Dashboard
  - Weather Widget (ARSO integracija)
  - TypeScript type safety
  - Fast HMR (Hot Module Replacement)

**Kdaj uporabiti**: Za kompleksne interaktivne app-e z AI chat

---

### 5. **Wolf Daemon** (`wolf-daemon/`)
- **Namen**: Backend Python skripta za data fetching
- **Tehnologija**: Python 3.10+, requests, xml.etree
- **Funkcije**:
  - ARSO API connector (groundwater, fish tissue, temp)
  - ZDIJZ template generator
  - Gemini AI oracle (Q&A)
  - Gemini agent (helper functions)

**Kdaj uporabiti**: Za fetching realnih podatkov iz ARSO, E-PRTR

---

### 6. **Social Blitz** (`social-blitz/`)
- **Namen**: Marketing kampanja za social media
- **Vsebina**:
  - X (Twitter) 10-post thread
  - Telegram kampanja templates
  - Infografike (EHI bar chart, memes)
  - Hashtag strategija (#SavaNiTiha #ARSOmegla)

**Kdaj uporabiti**: Za launch nove raziskave na socialnih omrežjih

---

### 7. **Dokumentacija** (`docs/`)
- **Namen**: Tehnična dokumentacija za vse ORION komponente
- **Vsebuje**:
  - AI setup navodila
  - AI arhitektura
  - Quick start guide
  - Deployment guide
  - Visual guide
  - Educational toolkit

**Kdaj uporabiti**: Ko rabiš tehnične detajle

---

## 🔀 KAKO MODULI DELUJEJO SKUPAJ?

### Primer 1: Dodajanje osnovne raziskave
```
1. Dodaj v orion/data/raziskave.json
   ↓
2. Raziskava se avtomatsko prikaže na orion/index.html
   ↓
3. Marker se prikaže na zemljevidu (zemljevid.js)
   ↓
4. Link iz glavnega index.html
```

### Primer 2: Kompleksna raziskava z grafi
```
1. Kopiraj html/OPEN.html kot template
   ↓
2. Spremeni podatke in Chart.js grafe
   ↓
3. Dodaj link v index.html
   ↓
4. Deploy!
```

### Primer 3: React app z AI
```
1. Razvij komponente v orion-react/src/
   ↓
2. Uporabi AI Analyst Modal za chat
   ↓
3. Fetch podatke iz wolf-daemon/ (ARSO connector)
   ↓
4. Build: npm run build
   ↓
5. Deploy na Vercel
```

---

## 📊 PODATKOVNI TOK

```
ARSO API
   ↓
wolf-daemon/arso_connector.py
   ↓
JSON data
   ↓
┌─────────────────┬─────────────────┐
│                 │                 │
│ orion/          │ orion-react/    │
│ (Vanilla JS)    │ (React)         │
│                 │                 │
│ zemljevid.js    │ ZemljevidResnice.tsx
│ (Leaflet map)   │ (Leaflet map)   │
│                 │                 │
└─────────────────┴─────────────────┘
         ↓
   User sees data
```

---

## 🚀 KAJ ZAGNATI ZA KAJ?

### Za testiranje vanilla JS verzije:
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
# Odpri: http://localhost:8080
```

### Za testiranje React verzije:
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm install
npm run dev
# Odpri: http://localhost:5173
```

### Za fetching ARSO podatkov:
```bash
cd /home/saba/Desktop/ProPublica/wolf-daemon
pip install -r requirements.txt
python3 arso_connector.py
```

### Za testiranje celotnega ProPublica:
```bash
cd /home/saba/Desktop/ProPublica
python -m http.server 8080
# Odpri: http://localhost:8080
# Lahko greš na:
# - index.html (glavna stran)
# - html/OPEN.html (Palantir raziskava)
# - orion/index.html (5 domen)
```

---

## 📝 KDO EDITIRA KATERE DATOTEKE?

### Za dodajanje osnovne raziskave:
- **Editiraj**: `orion/data/raziskave.json`
- **Opcijsko**: `orion/js/components/zemljevid.js` (za marker)

### Za kompleksno raziskavo:
- **Editiraj**: `html/NOVA_RAZISKAVA.html` (kopiraj OPEN.html)
- **Linkaj**: `index.html` (dodaj link na novo raziskavo)

### Za React app funkcionalnosti:
- **Editiraj**: `orion-react/src/components/*.tsx`
- **Build**: `npm run build`

### Za Python backend:
- **Editiraj**: `wolf-daemon/nova_skripta.py`
- **Testiraj**: `python3 nova_skripta.py`

### Za social media kampanjo:
- **Editiraj**: `social-blitz/x-thread.md`
- **Dodaj slike**: `social-blitz/assets/`

### Za dokumentacijo:
- **Editiraj**: `docs/ORION_NOVA_DOK.md`

---

## 🎨 STYLE GUIDE

### Barve (Tailwind)
- **Cyan** (`text-cyan-400`): Glavna brand barva, linki, highlights
- **Zelena** (`text-green-400`): Obljube, pozitivno
- **Rdeča** (`text-red-400`): Resnica, kritično, visok EHI
- **Rumena** (`text-yellow-400`): Opozorila, srednji EHI
- **Slate** (`bg-slate-900`): Backgrounds, dark mode

### EHI Color Coding
```javascript
if (ehi >= 0.8) return 'text-red-400';      // Kritično
if (ehi >= 0.6) return 'text-orange-400';   // Visoko
if (ehi >= 0.4) return 'text-yellow-400';   // Zmerno
return 'text-green-400';                     // Nizko
```

### Font
- **Family**: Inter (Google Fonts)
- **Weights**: 400 (normal), 600 (semibold), 700 (bold), 900 (black)

---

## 🔧 DEPENDENCY MANAGEMENT

### Vanilla JS (orion/)
- **Leaflet.js**: 1.9.4 (CDN)
- **Tailwind CSS**: 3.4+ (CDN)
- **No build step!** Vse preko CDN

### React (orion-react/)
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-leaflet": "^4.2.1",
  "leaflet": "^1.9.4"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.2.1",
  "typescript": "^5.2.2",
  "vite": "^5.0.8",
  "tailwindcss": "^3.4.18"
}
```

### Python (wolf-daemon/)
```
requests>=2.31.0
beautifulsoup4>=4.12.0  # Za scraping
pandas>=2.1.0           # Za data analysis
```

---

## 🐛 COMMON ISSUES

### "Module not found" v React
```bash
cd /home/saba/Desktop/ProPublica/orion-react
rm -rf node_modules package-lock.json
npm install
```

### Zemljevid se ne prikaže
- Preveri da je Leaflet CSS loaded
- Preveri koordinate (lat/lon morajo biti numbers!)
- Hard refresh (Ctrl+Shift+R)

### JSON syntax error
```bash
cat orion/data/raziskave.json | python3 -m json.tool
# Če error → popravi JSON
```

### Service Worker ne dela
```bash
# F12 → Application → Clear storage → Clear site data
# Hard refresh (Ctrl+Shift+R)
```

---

## 📚 REFERENCE DOKUMENTI

**Začni tukaj:**
1. `ORION_KONSOLIDACIJA.md` - Plan konsolidacije
2. `KAKO_RASTE.md` - Navodila za rast
3. `MASTER_STRUKTURA.md` - Ta dokument!

**Za tehnične detajle:**
- `orion/README.md` - Vanilla JS dokumentacija
- `docs/ORION_QUICK_START.md` - Quick start
- `docs/ORION_AI_ARCHITECTURE.md` - AI arhitektura

**Za deployment:**
- `docs/ORION_DELIVERY_SUMMARY.md` - Deployment povzetek
- `/home/saba/Desktop/Saba_Place/project-orion/DEPLOYMENT_COMPLETE_GUIDE.md`

---

## 💡 BEST PRACTICES

### ✅ DO:
- Uporabljaj template-e
- Dodaj v JSON database
- Testiraj lokalno
- Commit pogosto
- Dokumentiraj spremembe

### ❌ DON'T:
- Ne ustvari novih map zunaj `/home/saba/Desktop/ProPublica/`
- Ne začni od začetka
- Ne kopiraj celotnega projekta
- Ne pozabi git commit
- Ne hard-code API keys (uporabi .env!)

---

## 🎯 QUICK LINKS

| Kaj rabiš? | Kam greš? |
|------------|-----------|
| Dodati raziskavo | `KAKO_RASTE.md` → Način 1 |
| Razumeti strukturo | `MASTER_STRUKTURA.md` (ta dokument) |
| Konsolidirati verzije | `ORION_KONSOLIDACIJA.md` |
| Zagnati React app | `orion-react/` → `npm run dev` |
| Fetch ARSO podatke | `wolf-daemon/arso_connector.py` |
| Deploy na Vercel | `orion-react/` → `vercel --prod` |
| Social media kampanja | `social-blitz/x-thread.md` |
| AI dokumentacija | `docs/ORION_AI_ARCHITECTURE.md` |

---

**🗺️ Zdaj veš kje je vse! • Projekt Orion • November 2025**
