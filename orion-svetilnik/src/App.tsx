import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Types
interface IndustrialSite {
  id: number;
  name: string;
  lat: number;
  lon: number;
  ehi: number;
  emissions: string;
  reality: string;
}

interface WaterData {
  station: string;
  station_id: string;
  coordinates: { lat: number; lon: number };
  data: {
    NO3: number;
    Pb: number;
    Hg_biota: number;
    Temp: number;
    N_discharge: number;
    status: string;
  };
  alerts: string[];
}

function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'data' | 'ai'>('map');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock industrial sites (from ARSO connector)
  const industrialSites: IndustrialSite[] = [
    { id: 1, name: "SIJ Acroni", lat: 46.0569, lon: 14.5058, ehi: 0.62, 
      emissions: "196,000 t CO₂", reality: "11.7% reduction (2024)" },
    { id: 2, name: "Lafarge/Holcim", lat: 46.1547, lon: 15.0497, ehi: 0.89,
      emissions: "450,000 t CO₂ (hist.)", reality: "Closed 2015" },
    { id: 3, name: "Ljubljana Čistilna", lat: 46.0569, lon: 14.5058, ehi: 0.69,
      emissions: "1.64 mg/L nitrates", reality: "High NO3 concentrations" },
    { id: 4, name: "Cinkarna Celje", lat: 46.2361, lon: 15.2676, ehi: 0.60,
      emissions: "15 t Pb, 18 t Zn", reality: "-15% heavy metals (2024)" },
    { id: 5, name: "Krško NE", lat: 45.9381, lon: 15.5151, ehi: 0.42,
      emissions: "+2-3°C", reality: "Minimal radioactive discharge" }
  ];

  // Sava River path (simplified)
  const savaPath: [number, number][] = [
    [46.4319, 14.0536], // Jesenice
    [46.1547, 15.0497], // Ljubljana
    [46.0569, 14.5058], // Čistilna
    [46.2361, 15.2676], // Celje
    [45.9381, 15.5151]  // Krško
  ];

  // Mock water quality data
  const waterQualityData: WaterData[] = [
    {
      station: "Podnart",
      station_id: "SI_01_003",
      coordinates: { lat: 46.4319, lon: 14.0536 },
      data: {
        NO3: 38.8,
        Pb: 0.015,
        Hg_biota: 150,
        Temp: 14.2,
        N_discharge: 1074,
        status: "Moderate (Hg exceedance)"
      },
      alerts: ["🩸 MERCURY EXCEEDANCE: 150 μg/kg (above EQS)"]
    },
    {
      station: "Okroglo",
      station_id: "SI_01_008",
      coordinates: { lat: 45.9381, lon: 15.5151 },
      data: {
        NO3: 42.1,
        Pb: 0.018,
        Hg_biota: 180,
        Temp: 17.0,
        N_discharge: 920,
        status: "Poor (thermal + chemical stress)"
      },
      alerts: [
        "⚠️ HIGH NITRATES: 42.1 mg/L",
        "🩸 MERCURY EXCEEDANCE: 180 μg/kg",
        "🔥 THERMAL STRESS: 17°C (NEK discharge)"
      ]
    }
  ];

  // Mock AI responses
  const mockAIResponses: Record<string, string> = {
    "holcim": "Holcim's EHI score of 0.89 indicates high environmental hypocrisy. Despite sustainability pledges, the Anhovo cement plant was historically one of the largest CO₂ emitters in Slovenia (450,000 t/year before closure in 2015). Current data shows legacy contamination persists.",
    "sava": "The Sava River faces multiple stressors: NO3 levels at 38.8-42.1 mg/L (approaching drinking water limits), mercury exceedances in fish tissue (150-180 μg/kg above EQS), and thermal pollution from NEK (+2.74°C average). ARSO's 'good status' classification ignores chemical failures.",
    "nek": "Krško Nuclear Plant (NEK) has the lowest EHI (0.42) due to transparent monitoring. However, thermal discharge raises Sava temperature by 2-3°C year-round, creating ecological stress zones. Radioactive discharge remains minimal (within EU limits).",
    "ehi": "EHI (Environmental Hypocrisy Index) = (Promise Score - Reality Score) / Promise Score. Scores above 0.7 indicate severe greenwashing. Holcim (0.89) and Ljubljana Čistilna (0.69) show highest hypocrisy between public statements and actual environmental impact.",
    "default": "I analyze environmental data from ARSO, E-PRTR, and corporate reports. Ask me about specific pollutants (NO3, Hg, Pb), industrial sites (Holcim, SIJ, Cinkarna, NEK), or the EHI methodology."
  };

  const handleAIQuery = () => {
    setLoading(true);
    const query = aiQuery.toLowerCase();
    
    setTimeout(() => {
      let response = mockAIResponses.default;
      
      if (query.includes('holcim') || query.includes('anhovo')) {
        response = mockAIResponses.holcim;
      } else if (query.includes('sava') || query.includes('river')) {
        response = mockAIResponses.sava;
      } else if (query.includes('nek') || query.includes('krško') || query.includes('nuclear')) {
        response = mockAIResponses.nek;
      } else if (query.includes('ehi') || query.includes('hypocrisy')) {
        response = mockAIResponses.ehi;
      }
      
      setAiResponse(response);
      setLoading(false);
    }, 1000);
  };

  const getEHIColor = (ehi: number): string => {
    if (ehi > 0.7) return 'text-red-500';
    if (ehi > 0.5) return 'text-orange-500';
    return 'text-green-500';
  };

  const getEHIBgColor = (ehi: number): string => {
    if (ehi > 0.7) return 'bg-red-100';
    if (ehi > 0.5) return 'bg-orange-100';
    return 'bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-teal-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-400">🜂 Orionov Svetilnik</h1>
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === 'map' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                🗺️ Zemljevid
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === 'data' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                📊 Podatki
              </button>
              <button
                onClick={() => setShowAIModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg hover:from-purple-700 hover:to-teal-700 transition"
              >
                🤖 Vprašaj AI
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-teal-500/30">
              <h2 className="text-xl font-bold mb-4 text-teal-400">🌊 Zemljevid Resnice: Sava River</h2>
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                  center={[46.1, 14.8]}
                  zoom={9}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  />
                  
                  {/* Sava River Flow */}
                  <Polyline
                    positions={savaPath}
                    pathOptions={{
                      color: '#00ff88',
                      weight: 4,
                      opacity: 0.8,
                      dashArray: '8, 8'
                    }}
                  />
                  
                  {/* Industrial Sites */}
                  {industrialSites.map((site) => (
                    <Marker key={site.id} position={[site.lat, site.lon]}>
                      <Popup>
                        <div className="text-slate-900 p-2">
                          <h3 className="font-bold text-lg mb-2">{site.name}</h3>
                          <p className={`font-semibold mb-2 ${getEHIColor(site.ehi)}`}>
                            EHI: {site.ehi.toFixed(2)}
                          </p>
                          <p className="text-sm"><strong>Emisije:</strong> {site.emissions}</p>
                          <p className="text-sm"><strong>Realnost:</strong> {site.reality}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  {/* Water Quality Stations */}
                  {waterQualityData.map((station, idx) => (
                    <Marker 
                      key={idx} 
                      position={[station.coordinates.lat, station.coordinates.lon]}
                    >
                      <Popup>
                        <div className="text-slate-900 p-2">
                          <h3 className="font-bold mb-2">{station.station}</h3>
                          <p className="text-xs text-slate-600 mb-2">{station.station_id}</p>
                          <div className="space-y-1 text-sm">
                            <p><strong>NO3:</strong> {station.data.NO3} mg/L</p>
                            <p><strong>Hg:</strong> {station.data.Hg_biota} μg/kg</p>
                            <p><strong>Temp:</strong> {station.data.Temp}°C</p>
                            <p><strong>Status:</strong> {station.data.status}</p>
                          </div>
                          {station.alerts.length > 0 && (
                            <div className="mt-2 text-xs text-red-600">
                              {station.alerts.map((alert, i) => (
                                <p key={i}>{alert}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            {/* EHI Dashboard */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-teal-500/30">
              <h2 className="text-2xl font-bold mb-6 text-teal-400">📊 EHI (Environmental Hypocrisy Index)</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {industrialSites.map((site) => (
                  <div 
                    key={site.id} 
                    className={`${getEHIBgColor(site.ehi)} rounded-lg p-4 border-2 ${
                      site.ehi > 0.7 ? 'border-red-500' : 
                      site.ehi > 0.5 ? 'border-orange-500' : 
                      'border-green-500'
                    }`}
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{site.name}</h3>
                    <p className={`text-3xl font-bold mb-2 ${getEHIColor(site.ehi)}`}>
                      {site.ehi.toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-700"><strong>Emisije:</strong> {site.emissions}</p>
                    <p className="text-sm text-slate-700"><strong>Realnost:</strong> {site.reality}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Quality Table */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-teal-500/30">
              <h2 className="text-2xl font-bold mb-6 text-teal-400">🌊 Kakovost Vode - Sava</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-teal-500/50">
                    <tr>
                      <th className="pb-3">Postaja</th>
                      <th className="pb-3">NO3 (mg/L)</th>
                      <th className="pb-3">Hg (μg/kg)</th>
                      <th className="pb-3">Temp (°C)</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterQualityData.map((station, idx) => (
                      <tr key={idx} className="border-b border-slate-700">
                        <td className="py-4">
                          <div>
                            <p className="font-semibold">{station.station}</p>
                            <p className="text-xs text-slate-400">{station.station_id}</p>
                          </div>
                        </td>
                        <td className={station.data.NO3 > 40 ? 'text-orange-400' : ''}>
                          {station.data.NO3}
                        </td>
                        <td className={station.data.Hg_biota > 100 ? 'text-red-400' : ''}>
                          {station.data.Hg_biota}
                        </td>
                        <td className={station.data.Temp > 16 ? 'text-red-400' : ''}>
                          {station.data.Temp}
                        </td>
                        <td>
                          <span className={`text-xs px-2 py-1 rounded ${
                            station.data.status.includes('Poor') 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {station.data.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-teal-500/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-teal-400">🤖 Vprašaj Orion AI</h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tvoje Vprašanje:</label>
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Npr: Kaj je Holcim EHI? Zakaj je Sava onesnažena? Kako deluje NEK?"
                  className="w-full bg-slate-900 rounded-lg p-3 border border-slate-700 focus:border-teal-500 focus:outline-none min-h-[100px]"
                />
              </div>
              
              <button
                onClick={handleAIQuery}
                disabled={loading || !aiQuery.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-teal-600 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🔄 Analiziram...' : '🚀 Analiza'}
              </button>
              
              {aiResponse && (
                <div className="bg-slate-900 rounded-lg p-4 border border-teal-500/30">
                  <p className="text-sm text-slate-300 leading-relaxed">{aiResponse}</p>
                  <p className="text-xs text-slate-500 mt-3">
                    💡 Podatki: ARSO 2023/2024, E-PRTR 2023, Corporate Reports
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-teal-500/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-400">
          <p>🜂 Projekt Orion: Manifest za Informacijsko Pravičnost</p>
          <p className="mt-2">Podatki: ARSO, E-PRTR, Holcim/SIJ/Cinkarna poročila | 
            <a href="https://github.com/SabaFTW/project-orion" className="text-teal-400 hover:underline ml-2">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
