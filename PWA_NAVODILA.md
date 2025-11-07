# LYRA ACTIVE - Desktop PWA

## Kaj je narejeno

Vaša spletna stran je sedaj **Progressive Web App (PWA)** z naslednjimi funkcionalnostmi:

### ✅ Desktop verzija
- Optimizirana za desktop prikaz
- Responsive dizajn (deluje tudi na mobilnih napravah)
- Modern UI z dark mode podporo

### ✅ PWA funkcionalnosti
- **Offline delovanje** - stran deluje tudi brez interneta
- **Instalacija** - lahko instalirate kot desktop aplikacijo
- **Cache strategije**:
  - Static assets (CSS, JS, fonti) - cache first
  - HTML strani - network first (vedno svež content)
  - Slike - cache first
  - JSON podatki - network first

### ✅ Desktop optimizacije
- `window-controls-overlay` - integracija z OS
- Shortcuts (bližnjice v desktop meniju)
- Share target - možnost deljenja
- Ikone vseh velikosti (72px - 512px)

## Kako uporabljati

### 1. Zaganjanje lokalno (development)

Potrebujete lokalni web server. Možnosti:

**Python 3:**
```bash
cd /home/saba/Desktop/ProPublica
python -m http.server 8000
```

**Node.js (http-server):**
```bash
cd /home/saba/Desktop/ProPublica
npx http-server -p 8000
```

Odprite: `http://localhost:8000`

### 2. Instalacija kot Desktop App

1. Odprite stran v Chrome/Edge/Chromium brskalniku
2. V naslovni vrstici bo prikazana ikona "Install"
3. Kliknite na gumb **"Install App"** ali ikono ⊕
4. Aplikacija se bo namestila na vaš računalnik

Alternativno:
- Chrome: Meni → More Tools → Create Shortcut → ✓ Open as window
- Edge: Meni → Apps → Install this site as an app

### 3. Preverite PWA funkcionalnosti

V Chrome/Edge Developer Tools:
- `F12` → **Application** tab
- **Service Workers** - preverite ali se je registriral
- **Cache Storage** - preverite cache
- **Manifest** - preverite manifest.json

## Struktura map

```
/home/saba/Desktop/ProPublica/
├── index.html           # Glavna stran
├── OPEN.html            # Investigation stran
├── manifest.json        # PWA manifest (posodobljen)
├── sw.js               # Service Worker (izboljšan)
├── icons/              # PWA ikone
│   ├── icon.svg        # SVG predloga
│   └── icon-*.png      # PNG ikone (72-512px)
├── data/               # JSON podatki
├── images/             # Slike
├── audio/              # Audio datoteke
├── pdfs/               # PDF dokumenti
├── html/               # HTML moduli
└── generate-icons.sh   # Skripta za regeneracijo ikon
```

## Kako dodati nov content (rastenje strani)

### Dodajanje novega projekta

Uredite `index.html` in dodajte nov projekt v sekcijo `#projects`:

```html
<div class="project-card card">
    <div class="p-6">
        <div class="text-4xl mb-4">🆕</div>
        <h3 class="text-2xl font-bold mb-3">Nov Projekt</h3>
        <p class="text-gray-600 mb-4">Opis projekta...</p>
        <div class="mb-4">
            <span class="research-tag">Tag1</span>
            <span class="research-tag">Tag2</span>
        </div>
        <a href="noviprojekt.html" class="inline-block px-6 py-2 bg-teal-600 text-white rounded-full">
            Poglej →
        </a>
    </div>
</div>
```

### Dodajanje raziskav v arhiv

Uredite `index.html` in dodajte v sekcijo `#research`:

```html
<li class="flex items-start">
    <span class="mr-2">🎧</span>
    <div>
        <a href="#" class="font-semibold hover:text-teal-600">Nov naslov</a>
        <p class="text-sm text-gray-600">Kratek opis</p>
    </div>
</li>
```

### Dodajanje novih HTML strani

1. Ustvarite novo HTML datoteko v `/home/saba/Desktop/ProPublica/`
2. Kopirajte header in footer iz `index.html`
3. Dodajte vsebino
4. Service Worker bo avtomatsko cacheiral novo stran

### Posodobitev Service Worker verzije

Ko dodajate nov content in želite osvežiti cache:

1. Uredite `sw.js`
2. Spremenite `CACHE_VERSION`:
```javascript
const CACHE_VERSION = 'v3'; // bilo v2
```
3. Reload strani bo izbrisal stare cache-e

## Testiranje offline funkcionalnosti

1. Odprite stran
2. `F12` → **Network** tab
3. Izberite **Offline** v dropdown meniju
4. Osvežite stran - mora delovati!

## Kako spremeniti ikone

### Možnost 1: Uredite SVG
```bash
cd /home/saba/Desktop/ProPublica
# Uredite icons/icon.svg
nano icons/icon.svg
# Regenerirajte PNG ikone
./generate-icons.sh
```

### Možnost 2: Naložite PNG
Zamenjajte obstoječe PNG ikone v `icons/` mapi.

## Deployment (produkcija)

### GitHub Pages
```bash
cd /home/saba/Desktop/ProPublica
git init
git add .
git commit -m "Initial PWA commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

V GitHub repo Settings → Pages → Source: `main` branch

### Netlify / Vercel
1. Drag & drop celotno mapo na Netlify/Vercel
2. Publish!

## Debugging

### Service Worker se ne registrira
```bash
# Preverite v konzoli (F12):
# Should see: "SW registered: ServiceWorkerRegistration"
```

### Stran ne deluje offline
```bash
# Preverite cache v DevTools:
# Application → Cache Storage → lyra-static-v2
```

### Ikone se ne prikazujejo
```bash
# Preverite pot v manifest.json
# Preverite da ikone obstajajo v icons/ mapi
```

## Napredne funkcije

### Background Sync
Service Worker podpira background sync za sinhronizacijo podatkov ko je internet na voljo.

### Push Notifications
Koda za push notifications je pripravljena v `sw.js` (vrstica 96-122).

### Share Target
Stran lahko sprejema deljene vsebine iz drugih aplikacij (manifest.json).

## Razvoj naprej

### Dodajanje novega Service Worker funkcionalnosti

Uredite `sw.js`:

```javascript
// Primer: Cache images za 7 dni
const MAX_IMAGE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

self.addEventListener('fetch', (event) => {
  // Vaša logika
});
```

### Dodajanje analytics

```html
<!-- Dodajte v index.html pred </body> -->
<script>
  if ('serviceWorker' in navigator) {
    // Track PWA install
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed!');
      // Send to analytics
    });
  }
</script>
```

## Podpora

- PWA Developer Docs: https://web.dev/progressive-web-apps/
- Service Worker API: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- Web App Manifest: https://developer.mozilla.org/en-US/docs/Web/Manifest

---

**Vse datoteke so shranjene v `/home/saba/Desktop/ProPublica/` - NIČ NA DESKTOPU!** ✅
