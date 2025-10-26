import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default icon issue
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
  location: string;
  lat: number;
  lon: number;
  type: string;
  emissions: any;
  publicClaim: string;
  reality: string;
  ehi: number;
  year: number;
}

// Mock Data
const mockIndustrialSites: IndustrialSite[] = [
  {
    id: 1,
    name: "SIJ Acroni",
    location: "Jesenice",
    lat: 46.4319,
    lon: 14.0536,
    type: "Steel Production",
    emissions: { co2: 196000, nox: 450, sox: 230 },
    publicClaim: "51% zmanjšanje emisij do 2030",
    reality: "EAF tehnologija od 1960-ih, ni nova",
    ehi: 0.62,
    year: 2024
  },
  {
    id: 2,
    name: "Lafarge/Holcim",
    location: "Anhovo",
    lat: 46.1547,
    lon: 15.0497,
    type: "Cement Production",
    emissions: { co2: 450000, nox: 890, sox: 620 },
    publicClaim: "Trajnostno poslovanje",
    reality: "Zaprt 2015 po 13-letnem boju",
    ehi: 0.89,
    year: 2015
  },
  {
    id: 3,
    name: "Ljubljana Čistilna",
    location: "Ljubljana",
    lat: 46.0569,
    lon: 14.5058,
    type: "Wastewater Treatment",
    emissions: { nitrates: 1.64, phosphorus: 0.42 },
    publicClaim: "Zelena prestolnica Evrope",
    reality: "Najvišja konc. nitratov na Savi",
    ehi: 0.69,
    year: 2024
  },
  {
    id: 4,
    name: "Cinkarna Celje",
    location: "Celje",
    lat: 46.2361,
    lon: 15.2676,
    type: "Chemical Production",
    emissions: { co2: 85000 },
    publicClaim: "Zmanjšanje težkih kovin",
    reality: "15 t Pb, 18 t Zn letno",
    ehi: 0.60,
    year: 2024
  },
  {
    id: 5,
    name: "NEK Krško",
    location: "Krško",
    lat: 45.9381,
    lon: 15.5151,
    type: "Nuclear Power",
    emissions: { co2: 0 },
    publicClaim: "Safe, minimal impact",
    reality: "+2-3°C thermal discharge",
    ehi: 0.42,
    year: 2024
  }
];

// Sava River path
const savaPath: [number, number][] = [
  [46.4319, 14.0536],
  [46.1547, 15.0497],
  [46.0569, 14.5058],
  [46.2361, 15.2676],
  [45.9381, 15.5151]
];

function App() {
  const [activeDomain, setActiveDomain] = useState('zemljevid');
  const [selectedSite, setSelectedSite] = useState<IndustrialSite | null>(null);

  const avgEHI = (mockIndustrialSites.reduce((sum, site) => sum + site.ehi, 0) / mockIndustrialSites.length).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                🛰️ ORIONOV SVETILNIK
              </h1>
              <p className="text-slate-400 text-sm mt-1">Projekt za Informacijsko Pravičnost</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Indeks Ekološke Hipokrizije</div>
              <div className={`text-3xl font-bold ${Number(avgEHI) > 0.6 ? 'text-red-400' : 'text-yellow-400'}`}>
                {avgEHI}
              </div>
              <div className="text-xs text-slate-400">
                {Number(avgEHI) > 0.6 ? 'VISOKA HIPOKRIZIJA' : 'ZMERNA HIPOKRIZIJA'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Nav */}
      <nav className="border-b border-slate-800 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveDomain('zemljevid')}
              className={`px-6 py-4 border-b-2 ${activeDomain === 'zemljevid' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400'}`}
            >
              🗺️ Zemljevid Resnice
            </button>
            <button
              onClick={() => setActiveDomain('info')}
              className={`px-6 py-4 border-b-2 ${activeDomain === 'info' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400'}`}
            >
              ℹ️ Info
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeDomain === 'zemljevid' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MAP */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 h-[600px]">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">🌊 Sava River - Industrial Sites</h2>
                <div className="h-[520px] rounded-lg overflow-hidden">
                  <MapContainer
                    center={[46.1, 14.8]}
                    zoom={8}
                    className="h-full w-full"
                    style={{ background: '#1e293b' }}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      attribution='&copy; CARTO'
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
                    {mockIndustrialSites.map((site) => (
                      <Marker 
                        key={site.id} 
                        position={[site.lat, site.lon]}
                        eventHandlers={{
                          click: () => setSelectedSite(site)
                        }}
                      >
                        <Popup>
                          <div className="text-slate-900 p-2 min-w-[200px]">
                            <h3 className="font-bold text-lg mb-2">{site.name}</h3>
                            <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${
                              site.ehi > 0.7 ? 'bg-red-500 text-white' : 
                              site.ehi > 0.5 ? 'bg-yellow-500 text-black' : 
                              'bg-green-500 text-white'
                            }`}>
                              EHI: {site.ehi}
                            </div>
                            <p className="text-sm mt-2"><strong>Lokacija:</strong> {site.location}</p>
                            <p className="text-sm"><strong>Tip:</strong> {site.type}</p>
                            <p className="text-sm mt-2 text-green-700"><strong>Obljuba:</strong> {site.publicClaim}</p>
                            <p className="text-sm text-red-700"><strong>Resnica:</strong> {site.reality}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              {selectedSite ? (
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">{selectedSite.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">🟢 JAVNA OBLJUBA</div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-sm">
                        {selectedSite.publicClaim}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">🔴 DEJANSKA RESNICA</div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-sm">
                        {selectedSite.reality}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-2">EMISIJE ({selectedSite.year})</div>
                      <div className="space-y-2">
                        {Object.entries(selectedSite.emissions).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-slate-400 uppercase">{key}:</span>
                            <span className="font-mono text-slate-200">
                              {typeof value === 'number' ? value.toLocaleString() : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <p className="text-slate-400">Klikni na marker za podrobnosti</p>
                </div>
              )}

              {/* Legend */}
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                <h4 className="font-bold text-sm mb-3 text-slate-300">LEGENDA</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-slate-400">EHI &gt; 0.7 (Visoka hipokrizija)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-slate-400">EHI 0.4-0.7 (Zmerna)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-slate-400">EHI &lt; 0.4 (Nizka)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDomain === 'info' && (
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">📊 O Projektu</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong className="text-cyan-400">EHI (Environmental Hypocrisy Index)</strong> meri razkorak med 
                javnimi obljubami in dejansko okoljsko realnostjo.
              </p>
              <p className="text-sm text-slate-400">
                Formula: (Promise Score - Reality Score) / Promise Score
              </p>
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {mockIndustrialSites.slice(0, 3).map(site => (
                  <div key={site.id} className="bg-slate-800/50 rounded p-4 border border-slate-700">
                    <div className="font-bold text-cyan-400 mb-2">{site.name}</div>
                    <div className="text-2xl font-bold text-red-400 mb-2">EHI: {site.ehi}</div>
                    <div className="text-xs text-slate-500">{site.reality}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-slate-500 text-sm">
        <p>"Resnica ni tisto, kar ti povedo. Resnica je tisto, kar sam najdeš."</p>
        <p className="mt-2">Projekt Orion • Oktober 2025</p>
      </footer>
    </div>
  );
}

export default App;
