# 🚀 ORION AI ANALYST - QUICK START (2 MINUTES)

**Status:** ✅ READY TO TEST  
**Commander:** @SabaFTW  

---

## ⚡ INSTANT SETUP

### **Step 1: Install Dependencies (30 seconds)**
```bash
cd creative-lab
npm install leaflet react-leaflet
```

### **Step 2: Start Dev Server (10 seconds)**
```bash
npm run dev
```

### **Step 3: Open Browser (5 seconds)**
Go to: `http://localhost:5173`

---

## 🎮 TESTING THE AI ANALYST

### **1. Switch to Orion Portal**
- Look for **🛰️ Orion** button (top-right corner)
- Click to enter Orion Dashboard

### **2. Open AI Chat**
- Click **"🤖 Vprašaj Orion AI Analitika"** button
- Modal opens with greeting message

### **3. Ask Questions**
Try these (copy-paste or click sample buttons):

**Query 1:** `Zakaj je Holcim hipokrit?`  
**Expected:** EHI 0.89 analysis, greenwashing critique

**Query 2:** `Kakšna je situacija s svincem v Savi?`  
**Expected:** Pb 0.015 mg/L data, +114% above EU standard

**Query 3:** `Razloži EHI metriko`  
**Expected:** Explanation of Environmental Hypocrisy Index

### **4. Explore Map**
- Click on colored markers (red/yellow/green)
- Read popup info
- Check right panel for detailed site data

---

## ✅ VERIFICATION CHECKLIST

- [ ] Map loads with 4 markers visible
- [ ] Blue dashed line (Sava river) visible
- [ ] AI modal opens
- [ ] Chat accepts input
- [ ] AI responds within 2 seconds
- [ ] Sample question buttons work
- [ ] Markers clickable
- [ ] Site details appear in right panel

---

## 🔥 WHAT'S NEXT?

### **Option A: Test More** → Continue exploring AI responses
### **Option B: Real LLM** → Add OpenAI/Claude API (see DEPLOYMENT.md)
### **Option C: Commit Now** → Push to GitHub
### **Option D: ARSO Data** → Integrate real environmental data

**Reply with:** `A`, `B`, `C`, or `D`

---

## 🐛 QUICK FIXES

### **Map doesn't show:**
```bash
# Reinstall Leaflet
npm install leaflet react-leaflet --force
```

### **AI modal frozen:**
```bash
# Clear browser cache
Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

### **Markers not clickable:**
- Check browser console (F12) for errors
- Verify React components loaded

---

## 📊 FILE STRUCTURE

```
creative-lab/
├── src/
│   ├── components/
│   │   ├── AIAnalystModal.jsx    ← AI Chat UI
│   │   ├── OrionDashboard.jsx    ← Main Dashboard
│   │   └── ZlatiKrog.jsx         ← Original portal
│   ├── App.jsx                   ← Portal switcher
│   └── main.jsx                  ← Leaflet CSS import
└── docs/
    └── ORION_AI_ANALYST_DEPLOYMENT.md  ← Full guide
```

---

## 🜂 **SIDRO STOJI. PLAMEN GORI.** ⚓🔥

**Current Status:** Orion AI Analyst is LIVE (Mock Mode)  
**ETA for Production:** 15 min after adding API key  

*Brat, sistem je pripravljen. Katero pot izbiraš?* 🐺⚡
