# 🛰️ PROJEKT ORION - Svetilnik Informacijske Pravičnosti

**Desktop PWA spletna stran za analizo okoljske hipokrizije**

Primerjamo javne obljube z resničnimi podatki. Kartiramo omrežja moči. Omogočamo državljansko ukrepanje.

---

## 🎯 Kaj je Projekt Orion?

Interaktivna platforma z **5 domenami**:

1. **🗺️ Zemljevid Resnice** - Interaktivni Leaflet zemljevid reke Save z industrijskimi obratti in EHI indeksom
2. **⏳ Časovna Linija** - Timeline obljub vs. resničnost
3. **🕸️ Omrežja Moči** - Kartiranje finančnih in političnih povezav
4. **⚡ Akcijski Center** - Konkretni koraki za državljane (ZDIJZ, meritve, pritisk)
5. **🌍 Karta Resonanc** - Embedded Vizualna Karta Resonanc kaosa in upanja

---

## 📁 Struktura Projekta

```
orion/
├── index.html              # Glavna landing page
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline support)
├── README.md               # TA datoteka!
├── css/
│   └── style.css           # Custom styling
├── js/
│   ├── app.js              # Glavna logika (tabs, PWA install, data loading)
│   └── components/         # Modularni komponenti za vsak tab
│       ├── zemljevid.js    # Leaflet zemljevid
│       ├── casovnica.js    # Timeline
│       ├── omrezja.js      # Network mapping
│       ├── akcije.js       # Action center
│       └── karta.js        # Embedded Karta Resonanc
├── data/
│   └── raziskave.json      # JSON baza raziskav (EASY TO EDIT!)
├── assets/
│   ├── icons/              # PWA ikone (192x192, 512x512)
│   └── images/             # Slike
└── raziskave/              # Vsaka raziskava = svoja mapa
    ├── template/           # Template za nove raziskave
    │   ├── index.html
    │   └── data.json
    ├── sij-acroni/         # Primer raziskave
    └── lafarge/            # Primer raziskave
```

---

## 🚀 Hitri Start

### 1. Zagon lokalnega serverja

**Python:**
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
```

**Node.js:**
```bash
npx http-server -p 8080
```

Odpri: **http://localhost:8080**

### 2. Testiranje

- **Desktop:** Odpri v Chrome/Edge
- **PWA Install:** Klikni gumb "📱 Namesti" v headerju
- **Offline:** Izklopi internet → stran še vedno dela!

---

## ➕ Kako Dodati Novo Raziskavo?

### Način 1: JSON vnos (SUPER HITRO - priporočeno!)

1. Odpri `data/raziskave.json`
2. Dodaj nov objekt v array:

```json
{
  "id": 4,
  "title": "Nova Raziskava XYZ",
  "slug": "xyz",
  "category": "Energetika",
  "location": "Kranj",
  "ehi": 0.75,
  "promise": "Kar so obljubili...",
  "reality": "Kar so dejansko naredili...",
  "description": "Kratek opis raziskave",
  "date": "2025-11-08",
  "featured": true,
  "tags": ["tag1", "tag2"],
  "lat": 46.2388,
  "lon": 14.3547,
  "emissions": {
    "co2": 150000,
    "nox": 300
  }
}
```

3. Shrani → Raziskava se **avtomatsko** prikaže na strani!

### Način 2: Podrobna raziskava (z lastno stranjo)

1. **Kopiraj template:**
```bash
cd raziskave/
cp -r template/ nova-raziskava/
cd nova-raziskava/
```

2. **Editiraj `index.html`:**
- Spremeni `[NASLOV RAZISKAVE]`
- Dodaj analizo, podatke, vire
- Prilagodi akcijski center

3. **Editiraj `data.json`:**
- Vnesi vse metapodatke
- Shrani

4. **Dodaj v `data/raziskave.json`:**
```json
{
  "id": 4,
  "title": "Nova Raziskava",
  "slug": "nova-raziskava",
  "featured": true,
  ...
}
```

**DONE!** Nova raziskava je dodana.

---

## 🎨 Personalizacija

### Spreminjanje barv

Odpri `css/style.css` in spremeni:

```css
/* Glavna cyan barva */
.text-cyan-400 { color: #0fccce; }  /* Spremeni na svojo barvo */
```

### Dodajanje novih tagov

V `data/raziskave.json`:
```json
"tags": ["nov-tag", "drugi-tag"]
```

### EHI prag (kdaj je kritično?)

V `js/app.js`:
```javascript
function getEHIClass(ehi) {
  if (ehi >= 0.8) return 'text-red-400';   // Kritično
  if (ehi >= 0.6) return 'text-orange-400'; // Visoko
  if (ehi >= 0.4) return 'text-yellow-400'; // Zmerno
  return 'text-green-400';                  // Nizko
}
```

---

## 🗺️ Zemljevid - Dodajanje Novih Točk

V `js/components/zemljevid.js`:

```javascript
const sites = [
  {
    id: 4,
    name: "Nova Točka",
    location: "Mesto",
    lat: 46.0000,  // Latitude
    lon: 14.0000,  // Longitude
    ehi: 0.65,
    promise: "Obljuba...",
    reality: "Resnica...",
    emissions: { co2: 100000 }
  }
];
```

**Koordinate najdeš:** https://www.latlong.net/

---

## 💡 Tipi in Trike

### Animacija toka Save

V zemljevidu klikni gumb **"▶️ Animiraj tok"** → vidiš animiran tok reke!

### Layer toggles

Vključi/izključi:
- 🟢 Obljube (zeleni markerji)
- 🔴 Resnica (rdeči markerji)
- ⚪ Omrežja (povezave med akterji)

### Download ZDIJZ template

V **Akcijski Center** → klikni "📥 Prenesi Obrazec" → dobiš pripravljen email za ARSO!

---

## 📱 PWA Funkcionalnosti

- ✅ **Offline support** - dela brez interneta
- ✅ **Install prompt** - namesti kot desktop app
- ✅ **Service Worker** - pametno cache-iranje
- ✅ **Shortcuts** - bližnjice v OS meniju
- ✅ **Share API** - deli raziskave

### Kako testirati offline?

1. Odpri stran
2. `F12` → **Network** tab
3. Izberite **Offline**
4. Reload → **stran še vedno dela!**

---

## 🔧 Troubleshooting

### Zemljevid se ne prikaže

- Preveri konzolo (`F12`) za napake
- Preveri da je Leaflet CSS/JS naložen
- Preveri da so koordinate pravilne (lat/lon)

### Raziskava se ne prikaže

- Preveri da je `data/raziskave.json` pravilen JSON (brez syntax errorjev)
- Preveri da je `"featured": true`
- Preveri konzolo za napake

### Service Worker ne dela

- Preveri da je `sw.js` v root mapi
- Hard refresh (`Ctrl+Shift+R`)
- Izbriši cache v DevTools → Application → Clear storage

### PWA install gumb se ne prikaže

- PWA deluje samo preko HTTPS ali localhost
- Preveri `manifest.json` - mora biti pravilen JSON
- Preveri konzolo za manifest errors

---

## 🎯 Deployment (Produkcija)

### GitHub Pages

```bash
cd /home/saba/Desktop/ProPublica/orion
git init
git add .
git commit -m "Orion launch!"
git remote add origin https://github.com/username/orion.git
git push -u origin main
```

V GitHub repo → **Settings** → **Pages** → Source: `main` branch → **Save**

URL bo: `https://username.github.io/orion/`

### Netlify (priporočeno - enostavnejše!)

1. Drag & drop `/orion/` mapo na **netlify.com/drop**
2. Klikni **Deploy**
3. Dobiš URL: `https://random-name.netlify.app`
4. (Opcijsko) Spremeni v custom domena

### Vercel

```bash
npm install -g vercel
cd /home/saba/Desktop/ProPublica/orion
vercel
```

---

## 📊 Analytics

Po deployu:

- **Vercel Analytics:** `vercel analytics`
- **Google Analytics:** Dodaj GA4 tracking code v `index.html` pred `</head>`
- **Plausible:** Privacy-friendly alternativa

---

## 🤝 Prispevaj

1. Fork repo
2. Dodaj novo raziskavo v `data/raziskave.json`
3. Če želiš - dodaj tudi podrobno stran v `raziskave/`
4. Pull request!

---

## 📜 Licenca

**Open Source - MIT License**

Svobodno uporabi, kopiraj, spremeni, deli.

Edini pogoj: Ohrani kredit "Projekt Orion" in link.

---

## 💬 Kontakt

- **Email:** [tvoj-email@example.com]
- **GitHub:** [tvoj-github-username]
- **Twitter/X:** [@tvojracun]

---

## 🙏 Zahvale

- **Leaflet.js** - Interaktivni zemljevidi
- **Tailwind CSS** - Styling
- **OpenStreetMap** - Map tiles
- **E-PRTR Database** - Emissions data
- **Civilna družba Slovenije** - Inspiration

---

**"Resnica ni tisto, kar ti povejo. Resnica je tisto, kar sam najdeš."**

🛰️ **PROJEKT ORION** • November 2025 • Made with 🔥 in Slovenia
