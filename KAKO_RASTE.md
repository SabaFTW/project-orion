# 🌱 KAKO PROJEKT ORION RASTE - Brez Rebuild-anja!

**Problem**: Že 6x začeli od začetka 😭
**Rešitev**: ENOSTAVNA navodila kako dodati novo vsebino brez rebuild-anja

---

## 🎯 TRI NAČINI ZA DODAJANJE RAZISKAV

### 🟢 NAČIN 1: JSON VNOS (SUPER HITRO - 2 minuti!)

**Uporabi to, ko:**
- Imaš osnovne podatke (ime podjetja, lokacija, EHI)
- Ne rabiš celotne strani z grafiko
- Hočeš raziskavo hitro objavit

**Koraki:**
1. Odpri `/home/saba/Desktop/ProPublica/orion/data/raziskave.json`
2. Dodaj nov objekt v array:

```json
{
  "id": 4,
  "title": "Petrochemical XYZ - Plastični ogenj",
  "slug": "xyz-plastics",
  "category": "Kemija",
  "location": "Maribor",
  "ehi": 0.78,
  "promise": "Zero plastic waste do 2025",
  "reality": "5000 ton mikroplastike v Dravo letno",
  "description": "Petrochemical XYZ obljublja ničelno plastično onesnaževanje, medtem ko ARSO podatki kažejo 5000 ton mikroplastike v Dravi.",
  "date": "2025-11-07",
  "featured": true,
  "tags": ["mikroplastika", "Drava", "kemija"],
  "lat": 46.5547,
  "lon": 15.6467,
  "emissions": {
    "co2": 180000,
    "nox": 450,
    "microplastics": 5000
  },
  "sources": [
    "ARSO Mikroplastika poročilo 2024",
    "E-PRTR 2023",
    "Petrochemical XYZ Sustainability Report 2024"
  ],
  "author": "Projekt Orion",
  "lastUpdated": "2025-11-07"
}
```

3. Shrani datoteko
4. **DONE!** Raziskava se avtomatsko prikaže na strani!

**Preverjanje:**
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
# Odpri http://localhost:8080 → vidiš novo raziskavo!
```

---

### 🟡 NAČIN 2: PODROBNA STRAN (S TEMPLATE-OM - 15 minut)

**Uporabi to, ko:**
- Rabiš celotno raziskovalno stran z analizo
- Imaš veliko podatkov in grafov
- Hočeš embedding OPEN.html tipa vsebine

**Koraki:**

#### 1. Kopiraj template
```bash
cd /home/saba/Desktop/ProPublica/orion/raziskave
cp -r template/ xyz-plastics/
cd xyz-plastics/
```

#### 2. Editiraj `index.html`
Spremeni vse `[PLACEHOLDER]` vrednosti:

```html
<!-- Spremeni -->
<h1 class="text-4xl md:text-5xl font-black text-white mb-4">[NASLOV RAZISKAVE]</h1>

<!-- Na -->
<h1 class="text-4xl md:text-5xl font-black text-white mb-4">Petrochemical XYZ - Plastični ogenj</h1>
```

**Placeholder-ji za spremembo:**
- `[NASLOV RAZISKAVE]` → "Petrochemical XYZ - Plastični ogenj"
- `[Lokacija]` → "Maribor"
- `[Kategorija]` → "Kemija"
- `[Datum]` → "2025-11-07"
- `[0.00]` → "0.78"
- `[Kratek uvodni opis]` → "Petrochemical XYZ obljublja..."
- `[Javna obljuba]` → "Zero plastic waste do 2025"
- `[Resnični podatki]` → "5000 ton mikroplastike..."
- itd.

#### 3. Editiraj `data.json`
```json
{
  "id": 4,
  "title": "Petrochemical XYZ - Plastični ogenj",
  "slug": "xyz-plastics",
  ...
}
```

#### 4. Dodaj v glavni JSON database
Odpri `/home/saba/Desktop/ProPublica/orion/data/raziskave.json` in dodaj:

```json
{
  "id": 4,
  "title": "Petrochemical XYZ - Plastični ogenj",
  "slug": "xyz-plastics",
  "featured": true,
  ...
}
```

#### 5. **DONE!** Raziskava ima svojo stran
```bash
# Preveri:
http://localhost:8080/raziskave/xyz-plastics/index.html
```

---

### 🔴 NAČIN 3: KOMPLEKSNA RAZISKAVA (Kot OPEN.html - 1-2 uri)

**Uporabi to, ko:**
- Rabiš interaktivne grafe (Chart.js)
- Imaš kompleksno analizo
- Hočeš AI integracije (Gemini)

**Koraki:**

#### 1. Kopiraj OPEN.html kot template
```bash
cd /home/saba/Desktop/ProPublica/html
cp OPEN.html XYZ_PLASTICS.html
```

#### 2. Spremeni vse specifične podatke
- Spremeni naslov: "Palantir & Microplastics" → "Petrochemical XYZ - Plastični ogenj"
- Spremeni grafe (Chart.js data):

```javascript
// Najdi:
const pollutionData = {
    labels: ['Holcim Anhovo', 'Cinkarna Celje', ...],
    datasets: [{
        data: [...]
    }]
};

// Spremeni v:
const pollutionData = {
    labels: ['Petrochemical XYZ', 'Competitor A', 'Competitor B'],
    datasets: [{
        data: [5000, 3200, 1800]
    }]
};
```

#### 3. Dodaj link v glavni index.html
```html
<!-- V /home/saba/Desktop/ProPublica/index.html -->
<a href="html/XYZ_PLASTICS.html" class="research-card">
    <h3>Petrochemical XYZ - Plastični ogenj</h3>
    <span class="ehi-badge">EHI: 0.78</span>
</a>
```

#### 4. **DONE!** Kompleksna raziskava z grafi
```bash
# Preveri:
http://localhost:8080/html/XYZ_PLASTICS.html
```

---

## 📊 DODAJANJE PODATKOV V ZEMLJEVID

**Če hočeš raziskavo prikazati na Leaflet zemljevidu:**

1. Odpri `/home/saba/Desktop/ProPublica/orion/js/components/zemljevid.js`

2. Dodaj novo točko v `sites` array:

```javascript
const sites = [
  {
    id: 1,
    name: "SIJ Acroni",
    location: "Jesenice",
    lat: 46.4319,
    lon: 14.0536,
    ehi: 0.67,
    ...
  },
  // DODAJ NOV SITE:
  {
    id: 4,
    name: "Petrochemical XYZ",
    location: "Maribor",
    lat: 46.5547,
    lon: 15.6467,
    ehi: 0.78,
    promise: "Zero plastic waste do 2025",
    reality: "5000 ton mikroplastike v Dravo",
    emissions: {
      co2: 180000,
      microplastics: 5000
    },
    category: "Kemija"
  }
];
```

3. Shrani → marker se avtomatsko prikaže na zemljevidu!

**Kako najti koordinate?**
- Pojdi na https://www.latlong.net/
- Vnesi naslov podjetja
- Kopiraj lat/lon številke

---

## 🐍 DODAJANJE PYTHON SKRIPT (ARSO podatki, AI agenti)

**Za dodajanje novih Python skript v `wolf-daemon/`:**

### Primer: Nova ARSO skripta

1. Ustvari novo datoteko:
```bash
cd /home/saba/Desktop/ProPublica/wolf-daemon
nano drava_connector.py
```

2. Kopiraj strukturo iz `arso_connector.py`:
```python
import requests
import json
from datetime import datetime

def fetch_drava_data(station_id):
    """Fetch microplastics data from Drava"""
    # Tvoja logika tukaj
    pass

if __name__ == "__main__":
    data = fetch_drava_data("SI_04_012")
    print(json.dumps(data, indent=2))
```

3. Dodaj v `requirements.txt` (če uporabljaš nove package):
```bash
requests>=2.31.0
beautifulsoup4>=4.12.0  # Če rabiš scraping
pandas>=2.1.0           # Če rabiš data analysis
```

4. Testiraj:
```bash
python3 drava_connector.py
```

---

## ⚛️ DODAJANJE REACT KOMPONENT (orion-react/)

**Za dodajanje novih React komponent v orion-react/:**

### Primer: Nova raziskava komponenta

1. Ustvari novo komponento:
```bash
cd /home/saba/Desktop/ProPublica/orion-react/src/components
nano PetrochemicalXYZ.tsx
```

2. Napiši komponento:
```tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function PetrochemicalXYZ() {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Petrochemical XYZ</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-900/20 p-4 rounded">
          <h3 className="text-green-400 font-bold">Obljuba</h3>
          <p>Zero plastic waste do 2025</p>
        </div>
        <div className="bg-red-900/20 p-4 rounded">
          <h3 className="text-red-400 font-bold">Resnica</h3>
          <p>5000 ton mikroplastike letno</p>
        </div>
      </div>
    </div>
  );
}
```

3. Dodaj v routing (če uporabljaš React Router):
```tsx
// V src/App.tsx ali src/main.tsx
import PetrochemicalXYZ from './components/PetrochemicalXYZ';

// Dodaj route:
<Route path="/raziskave/xyz" element={<PetrochemicalXYZ />} />
```

4. Build:
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm run build
```

---

## 📝 DODAJANJE DOKUMENTACIJE

**Za dodajanje nove dokumentacije v `docs/`:**

1. Ustvari novo markdown datoteko:
```bash
cd /home/saba/Desktop/ProPublica/docs
nano ORION_XYZ_ANALIZA.md
```

2. Uporabi konsistenten format:
```markdown
# Petrochemical XYZ - Analiza

**Datum**: 2025-11-07
**Kategorija**: Kemija
**EHI**: 0.78

## Uvod
[Tvoja analiza...]

## Podatki
[Tabele, grafi...]

## Zaključki
[Ugotovitve...]

## Viri
- ARSO 2024
- E-PRTR 2023
```

3. Linkaj iz drugih dokumentov:
```markdown
<!-- V ORION_QUICK_START.md -->
Za XYZ analizo glej [ORION_XYZ_ANALIZA.md](ORION_XYZ_ANALIZA.md)
```

---

## 🎨 DODAJANJE NOVIH TAGOV

**V `orion/data/raziskave.json`:**

```json
{
  "tags": ["mikroplastika", "Drava", "kemija", "nov-tag"]
}
```

**Tag filtering se avtomatsko zgodi v `orion/js/app.js`!**

---

## 🚀 DEPLOYMENT (Ko si pripravljen na produkcijo)

### Vanilla JS verzija (orion/)

**GitHub Pages:**
```bash
cd /home/saba/Desktop/ProPublica
git init
git add .
git commit -m "Orion launch 🛰️"
git remote add origin https://github.com/TVOJ_USERNAME/ProPublica.git
git push -u origin main

# V GitHub repo → Settings → Pages → Source: main branch → Save
# URL: https://TVOJ_USERNAME.github.io/ProPublica/
```

**Netlify (lažje!):**
```bash
# Drag & drop /ProPublica/ na netlify.com/drop
# Ali:
npm install -g netlify-cli
cd /home/saba/Desktop/ProPublica
netlify deploy --prod
```

### React verzija (orion-react/)

**Vercel:**
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm install -g vercel
vercel --prod
# Sledi navodilom
```

---

## ✅ CHECKLIST ZA VSAKO NOVO RAZISKAVO

- [ ] Zbral podatke (EHI, obljuba, resnica, emisije)
- [ ] Našel koordinate (lat/lon)
- [ ] Dodal v `orion/data/raziskave.json`
- [ ] (Opcijsko) Ustvaril podrobno stran v `orion/raziskave/`
- [ ] (Opcijsko) Dodal točko na zemljevid v `zemljevid.js`
- [ ] Testiral lokalno (`python -m http.server 8080`)
- [ ] Committal spremembe (`git commit -m "Add XYZ research"`)
- [ ] (Ko pripravljen) Deploy na produkcijo

---

## 🐛 TROUBLESHOOTING

### Raziskava se ne prikaže
```bash
# 1. Preveri JSON syntax
cd /home/saba/Desktop/ProPublica/orion
cat data/raziskave.json | python3 -m json.tool
# Če error → popravi JSON

# 2. Preveri browser console
# F12 → Console → išči napake

# 3. Hard refresh
# Ctrl+Shift+R
```

### Zemljevid se ne naloži
```bash
# Preveri da je Leaflet CSS/JS loaded
# F12 → Network → išči leaflet.css in leaflet.js

# Preveri koordinate
# lat/lon morajo biti številke, ne stringi
# PRAVILNO: "lat": 46.5547
# NAPAČNO: "lat": "46.5547"
```

### Python skripta ne dela
```bash
# Preveri dependencies
pip install -r requirements.txt

# Preveri Python verzijo
python3 --version  # Mora biti 3.10+

# Testiraj import
python3 -c "import requests; print('OK')"
```

---

## 💡 POMEMBNO!

**PRAVILA ZA RAST:**
1. **Vedno uporabljaj template** - Ne začni od začetka!
2. **JSON je tvoj prijatelj** - Večina raziskav lahko gre samo v JSON
3. **Testiral lokalno** - Preden deploy-aš
4. **Git commit pogosto** - Da imaš backup
5. **Dokumentiraj spremembe** - Kratka commit sporočila

**KO SI IZGUBLJEN:**
- Odpri `ORION_KONSOLIDACIJA.md` → vidiš kje je vse
- Odpri `MASTER_STRUKTURA.md` → razumeš strukturo
- Odpri `KAKO_RASTE.md` → to datoteko! 😊

**NE:**
- ❌ Ne ustvari nove mape zunaj `/home/saba/Desktop/ProPublica/`
- ❌ Ne začni od začetka
- ❌ Ne kopiraj celotnega projekta
- ❌ Ne pozabi commit-at

**DA:**
- ✅ Uporabi template
- ✅ Dodaj v JSON
- ✅ Testiraj lokalno
- ✅ Commit spremembe
- ✅ Dokumentiraj

---

## 🎯 PRIMER WORKFLOW (Celoten proces)

```bash
# 1. Začni novo raziskavo
cd /home/saba/Desktop/ProPublica

# 2. Odpri JSON editor
nano orion/data/raziskave.json

# 3. Dodaj novo raziskavo (kopiraj template zgoraj)

# 4. Shrani (Ctrl+X → Y → Enter)

# 5. Testiraj
cd orion
python -m http.server 8080

# 6. Odpri browser: http://localhost:8080

# 7. Preveri da je vse OK

# 8. Commit
cd /home/saba/Desktop/ProPublica
git add orion/data/raziskave.json
git commit -m "Add Petrochemical XYZ research (EHI: 0.78)"

# 9. (Opcijsko) Push na GitHub
git push origin main

# 10. DONE! 🎉
```

**Čas**: 5-10 minut za osnovno raziskavo!

---

**🌱 Projekt Orion raste organsko - brez rebuild-anja! • November 2025**
