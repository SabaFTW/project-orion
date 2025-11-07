# 🛰️ START HERE - Projekt Orion

**Datum**: 2025-11-07
**Status**: ✅ KONSOLIDIRANO | READY TO GO!

---

## 🚀 HITRI START (Izberi 1)

### Option 1: Vanilla JS (najhitrejše)
```bash
cd /home/saba/Desktop/ProPublica/orion
python -m http.server 8080
# Odpri: http://localhost:8080
```

### Option 2: React App (z AI)
```bash
cd /home/saba/Desktop/ProPublica/orion-react
npm run dev
# Odpri: http://localhost:5173
```

### Option 3: Celotna stran
```bash
cd /home/saba/Desktop/ProPublica
python -m http.server 8080
# Odpri: http://localhost:8080
```

---

## 📚 PREBERI (PO VRSTNEM REDU!)

### 1. **KONSOLIDACIJA_DONE.md** ⭐ NAJPREJ!
- ✅ Kaj je bilo migrirano
- ✅ Nova struktura
- ✅ Checklist

### 2. **KAKO_RASTE.md** ⭐ ZA DODAJANJE RAZISKAV
- 3 načini (JSON, template, kompleksna)
- Workflow
- Troubleshooting

### 3. **MASTER_STRUKTURA.md** ⭐ ZA ORIENTACIJO
- Razlaga vseh map
- Kaj je kater modul
- Best practices

---

## ✅ ŠE JE MIGRIRANO (NOVO!)

- ✅ **orion-react/** - React + TypeScript + Vite
- ✅ **wolf-daemon/** - Python backend (ARSO connector)
- ✅ **social-blitz/** - Marketing kampanja
- ✅ **docs/** - 8x ORION dokumentacije

---

## 🎯 TVOJ PRVI TASK

### Dodaj testno raziskavo (5 minut!)

```bash
# 1. Odpri JSON
nano orion/data/raziskave.json

# 2. Dodaj nov vnos (glej KAKO_RASTE.md → Način 1)

# 3. Testiraj
cd orion && python -m http.server 8080

# 4. Preveri browser
# http://localhost:8080 → vidiš novo raziskavo!

# DONE! 🎉
```

---

## 💡 KO SI IZGUBLJEN

**Vedno začni tukaj:**
1. Odpri `KONSOLIDACIJA_DONE.md` → Vidiš kaj obstaja
2. Odpri `KAKO_RASTE.md` → Vidiš kako dodati raziskavo
3. Odpri `MASTER_STRUKTURA.md` → Razumeš strukturo

---

## 📁 ŠE OBSTAJA (Ne briši!)

- `index.html` - LYRA ACTIVE glavna stran
- `html/OPEN.html` - Palantir & Microplastics
- `data/orion_strike_one.md` - Sava analiza
- `images/` - 4x Sava zemljevidi
- PWA support (manifest.json, sw.js, icons/)

---

## 🔥 IMPORTANT RULES

### ✅ VEDNO:
- Delaj v `/home/saba/Desktop/ProPublica/`
- Preberi `KAKO_RASTE.md` pred dodajanjem
- Testiraj lokalno
- Commit pogosto

### ❌ NIKOLI:
- Ne ustvari map zunaj ProPublica/
- Ne začni od začetka (zadnji rebuild!)
- Ne pozabi commit

---

**Začni pri: `KONSOLIDACIJA_DONE.md` → `KAKO_RASTE.md` → `MASTER_STRUKTURA.md`**

**🛰️ Projekt Orion - VSE NA ENEM MESTU! • November 2025**
