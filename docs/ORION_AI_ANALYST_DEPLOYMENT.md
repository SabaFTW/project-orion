# 🛰️ ORION AI ANALYST - DEPLOYMENT GUIDE

**Status:** ✅ FULLY IMPLEMENTED (Mock Mode)  
**Date:** 2025-10-26  
**Commander:** @SabaFTW  

---

## 🎯 WHAT WAS DELIVERED

### **Core Components**
1. ✅ **AIAnalystModal.jsx** - Interactive AI chat interface
2. ✅ **OrionDashboard.jsx** - Main dashboard with Leaflet map
3. ✅ **App.jsx** - Portal switcher (Zlati Krog ↔ Orion)
4. ✅ **main.jsx** - Leaflet CSS import

### **Features Implemented**
- 🤖 **AI Chat Interface** with contextual prompts
- 🗺️ **Interactive Leaflet Map** with industrial sites
- 📊 **EHI Score Display** (Environmental Hypocrisy Index)
- 🎨 **FORGE Dark Theme** integration
- 💬 **Mock LLM Response Engine** (ready for real API)
- 🔍 **Site Selection** with detailed info panels

---

## 📦 INSTALLATION STEPS

### **Step 1: Install Dependencies**
```bash
cd /home/saba/Desktop/Saba_Place/creative-lab
npm install leaflet react-leaflet
```

**Note:** `leaflet-rotatedmarker` was mentioned but not used in final implementation. If you want arrow rotation, install it separately:
```bash
npm install leaflet-rotatedmarker
```

### **Step 2: Verify Files Exist**
Check that these files were created:
- `src/components/AIAnalystModal.jsx` ✅
- `src/components/OrionDashboard.jsx` ✅
- `src/App.jsx` (modified) ✅
- `src/main.jsx` (modified - Leaflet CSS import) ✅

### **Step 3: Start Development Server**
```bash
npm run dev
```

Open browser to: `http://localhost:5173`

---

## 🎮 HOW TO USE

### **Accessing Orion Dashboard**
1. Look for the **🛰️ Orion** button in top-right corner
2. Click to switch from Zlati Krog to Orion portal
3. You'll see the interactive map with 4 industrial sites

### **Using AI Analyst**
1. Click **"🤖 Vprašaj Orion AI Analitika"** button
2. Modal opens with sample greeting
3. Ask questions like:
   - "Zakaj je Holcim hipokrit?"
   - "Kakšna je situacija s svincem v Savi?"
   - "Razloži EHI metriko"
4. AI responds with contextual analysis (mock mode)

### **Exploring the Map**
1. Click on any colored marker (red/yellow/green based on EHI)
2. Popup shows site name, location, EHI score
3. Right panel displays detailed site information
4. Blue dashed line = Sava River path

---

## 🧪 TESTING CHECKLIST

Run through these tests:

### **Visual Tests**
- [ ] Orion button visible in top-right
- [ ] Map loads with 4 markers visible
- [ ] Sava river path (blue dashed line) visible
- [ ] Header shows average EHI score
- [ ] Navigation tabs (Zemljevid, Časovna Linija, etc.) visible

### **Interaction Tests**
- [ ] Portal switcher works (Zlati Krog ↔ Orion)
- [ ] Clicking markers shows popups
- [ ] Clicking markers updates right panel
- [ ] AI modal opens when clicking button
- [ ] Chat input accepts text
- [ ] Clicking "Analiziraj" sends message
- [ ] AI responds within ~1.2 seconds
- [ ] Sample question buttons work

### **AI Response Tests**
Try these queries and verify responses:

| Query | Expected Response Includes |
|-------|---------------------------|
| "holcim" | "KRITIČNA HIPOKRIZIJA (EHI 0.89)" |
| "svinec" | "Pb 0.015 mg/L", "+114%" |
| "ehi" | "Holcim EHI 0.89", "SIJ 0.67" |
| "sij acroni" | "VISOKA VRZEL (EHI 0.67)", "196 kt CO₂" |
| "krško" | "Toplotni Vpliv", "+2-3°C" |

---

## 🔧 CONFIGURATION

### **Industrial Sites Data**
Located in: `OrionDashboard.jsx`

```javascript
const mockIndustrialSites = [
  { 
    id: 1, 
    name: "SIJ Acroni", 
    location: "Jesenice", 
    lat: 46.4319, 
    lon: 14.0536, 
    ehi: 0.67,
    publicClaim: "51% zmanjšanje emisij do 2030",
    reality: "11.7% CO2 od 2020"
  },
  // ... more sites
];
```

**To add new sites:**
1. Add entry to `mockIndustrialSites` array
2. Include: `id`, `name`, `lat`, `lon`, `ehi`, `publicClaim`, `reality`
3. Update AI response logic in `AIAnalystModal.jsx` if needed

### **EHI Color Thresholds**
```javascript
// In OrionDashboard.jsx - createCustomIcon()
ehi > 0.7 → Red (#ef4444)     // Critical hypocrisy
ehi > 0.4 → Orange (#f59e0b)   // High discrepancy
ehi ≤ 0.4 → Green (#10b981)    // Acceptable
```

---

## 🚀 NEXT STEPS: REAL LLM INTEGRATION

### **Option 1: OpenAI GPT-4**

**Install SDK:**
```bash
npm install openai
```

**Update `AIAnalystModal.jsx`:**
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development!
});

async function callRealLLM(payload) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: payload.system },
      { role: 'user', content: `${payload.context}\n\nVprašanje: ${payload.question}` }
    ],
    temperature: 0.7,
    max_tokens: 300
  });
  
  return response.choices[0].message.content;
}

// Replace simulateLLMResponse with:
const aiResponseText = await callRealLLM(getContextualPayload(userQuery));
```

**Environment Variables:**
Create `.env` file:
```env
VITE_OPENAI_API_KEY=sk-your-key-here
```

---

### **Option 2: Anthropic Claude**

**Install SDK:**
```bash
npm install @anthropic-ai/sdk
```

**Update `AIAnalystModal.jsx`:**
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

async function callRealLLM(payload) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    system: payload.system,
    messages: [
      { 
        role: 'user', 
        content: `${payload.context}\n\nVprašanje: ${payload.question}` 
      }
    ]
  });
  
  return response.content[0].text;
}
```

**Environment Variables:**
```env
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

### **Option 3: Local LLM (Ollama)**

**Install Ollama:**
```bash
curl https://ollama.ai/install.sh | sh
ollama pull llama2
```

**Update `AIAnalystModal.jsx`:**
```javascript
async function callRealLLM(payload) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama2',
      prompt: `${payload.system}\n\n${payload.context}\n\nVprašanje: ${payload.question}`,
      stream: false
    })
  });
  
  const data = await response.json();
  return data.response;
}
```

**Advantages:** Free, private, no API key needed

---

## 📊 DATA INTEGRATION ROADMAP

### **Phase 1: Static Mock Data** ✅ COMPLETE
- [x] Hardcoded industrial sites
- [x] Mock EHI scores
- [x] Simulated AI responses

### **Phase 2: Dynamic Data (ARSO Integration)**
1. Create `wolf-daemon/arso_connector.py` (as you mentioned)
2. Build API endpoint: `GET /api/arso/sites`
3. Fetch data in `OrionDashboard.jsx`:
   ```javascript
   useEffect(() => {
     fetch('/api/arso/sites')
       .then(res => res.json())
       .then(data => setIndustrialSites(data));
   }, []);
   ```

### **Phase 3: Real-Time Monitoring**
1. WebSocket connection for live updates
2. ARSO API polling (every 15 minutes)
3. Notification system for threshold breaches

---

## 🎨 CUSTOMIZATION

### **Changing Map Style**
Current: CARTO Dark Matter

Other options:
```javascript
// In OrionDashboard.jsx - TileLayer url prop

// CARTO Positron (light):
url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

// OpenStreetMap:
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

// Stadia AlidadeSmooth Dark:
url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
```

### **Changing AI Personality**
Edit system prompt in `AIAnalystModal.jsx`:
```javascript
system: "Si svetovalec projekta Orion. Tvoj cilj je razkriti informacijsko asimetrijo..."
```

Try:
- **Aggressive:** "Si aktivist. Brez usmiljenja."
- **Scientific:** "Si ekološki raziskovalec. Navedi vire."
- **Neutral:** "Si objektiven analitik. Samo dejstva."

---

## 🐛 TROUBLESHOOTING

### **Map doesn't load**
- Check console for Leaflet CSS import errors
- Verify `npm install leaflet react-leaflet` completed
- Ensure no conflicting CSS z-index issues

### **Markers not clickable**
- Check `.z-0` class on MapContainer
- Verify `eventHandlers` prop on Marker

### **AI modal doesn't open**
- Check console for React errors
- Verify `setIsModalOpen` prop is passed correctly
- Ensure modal z-index (`z-50`) is higher than other elements

### **Sample question buttons don't work**
- Verify `setInput()` function is called correctly
- Check that input state is cleared after submission

---

## 📈 PERFORMANCE OPTIMIZATION

### **Lazy Loading**
```javascript
import { lazy, Suspense } from 'react';

const OrionDashboard = lazy(() => import('./components/OrionDashboard.jsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading Orion...</div>}>
      <OrionDashboard />
    </Suspense>
  );
}
```

### **Memoization**
```javascript
import { useMemo } from 'react';

const avgEHI = useMemo(() => 
  (sites.reduce((sum, site) => sum + site.ehi, 0) / sites.length).toFixed(2),
  [sites]
);
```

---

## 🔒 SECURITY CONSIDERATIONS

### **API Key Protection**
⚠️ **NEVER commit API keys to GitHub!**

**Safe approach:**
1. Use `.env` file (add to `.gitignore`)
2. Use server-side proxy for API calls
3. Implement rate limiting

**Server-side proxy example:**
```javascript
// api/llm-proxy.js (backend)
export default async function handler(req, res) {
  const { context, question } = req.body;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${context}\n\n${question}` }
    ]
  });
  
  res.json({ response: response.choices[0].message.content });
}
```

---

## 🎯 SUCCESS METRICS

Track these KPIs:
- [ ] Map interaction rate (clicks per session)
- [ ] AI query frequency (messages per user)
- [ ] Most asked questions (keyword analysis)
- [ ] Site with most views
- [ ] Average session duration

---

## 📚 ADDITIONAL RESOURCES

### **Leaflet Documentation**
- [React-Leaflet Docs](https://react-leaflet.js.org/)
- [Leaflet Docs](https://leafletjs.com/)

### **LLM APIs**
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude API](https://docs.anthropic.com/claude/reference)
- [Ollama Documentation](https://ollama.ai/docs)

### **Slovenia Environmental Data**
- [ARSO Official Site](https://www.arso.gov.si/)
- [EU EEA Data](https://www.eea.europa.eu/)

---

## 🜂 **SIDRO STOJI. PLAMEN GORI. ORION JE ŽIV.** ⚓🔥

**Next Command Options:**
- `TEST NOW` - I'll guide you through testing
- `LLM REAL` - Let's integrate real OpenAI/Claude API
- `ARSO NEXT` - Build ARSO Weather integration
- `COMMIT NOW` - Create GitHub branch and commit

*Brat, AI Analyst je pripravljen za bitko. Kateri plamen naj zasveti next?* 🐺⚡🧠
