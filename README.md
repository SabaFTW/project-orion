# 🜂 PROJECT ORION: Manifest za Informacijsko Pravičnost

**Cilj**: Razbiti monopol nad resnico z odprto, AI-pogonjeno platformo za ekološko transparentnost.

---

## 🌊 **PLATFORMS**

### **1. Vizualna Karta Resonanc** (`karta-resonanc/`)
- **Live URL**: `vizualna-karta-resonanc.vercel.app` (coming soon)
- **Tech**: HTML, Leaflet.js, CSS animations
- **Features**: 
  - Animated Sava River flow (green arrows, rotated 120°/160°/220°)
  - 5 Industrial markers (SIJ, Holcim, Cinkarna, NEK, Ljubljana Čistilna)
  - Heatmap layers (NO3 38.8 mg/L, Hg 150 μg/kg, Temp +2.74°C)
  - Inline sources (ARSO 2023/2024, E-PRTR 2023)

### **2. Orionov Svetilnik** (`orion-svetilnik/`)
- **Live URL**: `orion-svetilnik.vercel.app` (coming soon)
- **Tech**: React, TypeScript, Vite, Leaflet, Tailwind
- **Features**:
  - **AI Analyst Modal**: Simulated LLM Q&A (ready for Anthropic API)
  - **ZemljevidResnice**: Interactive Leaflet map with EHI markers
  - **EHI Metrics Dashboard**: Holcim (0.89), SIJ (0.62), Cinkarna (0.60), NEK (0.42)
  - **Weather Widget**: ARSO integration (mock data: NO3, Pb, Hg, Temp)

### **3. Wolf Daemon** (`wolf-daemon/`)
- **Purpose**: Backend Python scripts for data collection
- **Files**:
  - `arso_connector.py`: ARSO API/mock data fetcher
  - `zdijz_template.txt`: ZDIJZ (Environmental Data Access) request template

### **4. Social Blitz** (`social-blitz/`)
- **Campaign Assets**: X threads, Telegram templates, visual memes
- **Strategy**: 10-post X thread, infographics (EHI bar chart, "Sava Ni Tiha" meme)

---

## 🚀 **QUICK START**

### **Prerequisites**
- Node.js 18+ (`node -v`)
- Python 3.10+ (`python3 --version`)
- Vercel CLI (`npm i -g vercel`)

### **Deploy Karta Resonanc**
```bash
cd karta-resonanc
vercel --prod
```

### **Deploy Orion Svetilnik**
```bash
cd orion-svetilnik
npm install
npm run build
vercel --prod
```

### **Test Wolf Daemon**
```bash
cd wolf-daemon
pip install -r requirements.txt
python3 arso_connector.py
```

---

## 📊 **DATA SOURCES**

### **Environmental Data**
- **ARSO** (Slovenian Environment Agency): 
  - NO3: 38.8 mg/L (Savinjska groundwater, 2024)
  - Hg: 150 μg/kg (Podkraj fish tissue, 2023)
  - Temp: +2.74°C (NEK avg, 2024)
  - N: 1074 t/year (surface water discharge, 2023)
- **E-PRTR** (European Pollutant Register): 
  - Holcim Anhovo, SIJ Acroni, Cinkarna Celje, NEK Krško emissions
- **Company Reports**: 
  - Holcim Sustainability Report 2023
  - SIJ Group Annual Report 2024
  - Cinkarna Celje Environmental Report 2024

### **EHI (Environmental Hypocrisy Index)**
- **Formula**: `(Promise Score - Reality Score) / Promise Score`
- **Scores**:
  - Holcim: 0.89 (High hypocrisy)
  - SIJ Acroni: 0.62 (Medium)
  - Cinkarna Celje: 0.60 (Medium)
  - NEK Krško: 0.42 (Low)

---

## 🔥 **SOCIAL BLITZ CAMPAIGN**

### **X (Twitter) Strategy**
- **Main Post**: ARSO megla razkrita – Sava kriči!
- **Data bullets**: NO3 38.8 mg/L, Hg 150 μg/kg, Temp +2.74°C
- **Hashtags**: `#SavaNiTiha #ARSOmegla #ZDIJZ #EkološkaResnica`

### **10-Post Thread**: [See `social-blitz/x-thread.md`]

### **Telegram Templates**: [See `social-blitz/telegram-templates.md`]

---

## 📧 **ZDIJZ (Environmental Data Access) Request**

**Template**: `wolf-daemon/zdijz_template.txt`

**Recipient**: ARSO (info@arso.gov.si)

**Parameters Requested**:
- Stations: Podnart (SI_01_003), Otoče (SI_02_007), Okroglo (SI_01_008)
- Parameters: NO3 (mg/L), Pb (μg/L), Hg (μg/kg biota), Temp (°C)
- Timeframe: 1.1.2024 – 31.12.2025
- Format: CSV/Excel

---

## 🎯 **SUCCESS METRICS**

### **48 Hours**
- 100+ visits to both platforms
- 10+ feedback responses (via embedded forms)
- 3+ social shares (X retweets, Telegram forwards)

### **7 Days**
- 500+ visits
- 50+ feedback submissions
- 5+ media mentions (blogs, news sites)

---

## 🛠️ **TECH STACK**

### **Frontend**
- **Karta Resonanc**: HTML, Leaflet.js, CSS3 animations
- **Orion Svetilnik**: React 18, TypeScript, Vite, Tailwind CSS, Leaflet

### **Backend**
- **Wolf Daemon**: Python 3.10, `requests`, `xml.etree`
- **Future API**: Elysia.js (Bun runtime), TypeScript

### **Deployment**
- **Hosting**: Vercel (serverless)
- **CI/CD**: GitHub Actions (future)

---

## 🔐 **API INTEGRATION (FUTURE)**

### **ARSO Real-Time API**
- **Endpoint**: `https://gis.arso.gov.si/arcgis/rest/services/KakovostPovrsinskihVoda/MapServer/0/query`
- **Format**: JSON
- **Auth**: None (public API)

### **Anthropic API (AI Analyst)**
- **Model**: `claude-sonnet-4-20250514`
- **Use Case**: AI-powered Q&A in Orion Svetilnik
- **Status**: Mock responses ready, API key integration pending

---

## 📜 **LICENSE**

Open Source (MIT) – Fork, improve, deploy.

---

## 👥 **CONTRIBUTORS**

- **Hermes (SabaFTW)**: Vision, strategy, social blitz
- **Lyra (AI)**: Code synthesis, data analysis, deployment

---

## 🔗 **LINKS**

- **GitHub Repo**: [github.com/SabaFTW/project-orion](https://github.com/SabaFTW/project-orion)
- **Documentation**: See `/docs` folder
- **Deployment Guide**: `docs/DEPLOYMENT_GUIDE.md`
- **Project Manifest**: `docs/MANIFEST.md`

---

**🜂 Sava teče, plamen gori – raztrgali smo meglo!**

*"Upanje ni prepričanje, da se bo nekaj dobro izteklo, temveč gotovost, da je nekaj smiselno, ne glede na to, kako se izteče." – Václav Havel*
