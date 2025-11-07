import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import researchData from './data/raziskave.json';
import ResearchCard from './components/ResearchCard.tsx';
import { Raziskava } from './types/raziskava.ts';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

function App() {
  const raziskave = useMemo(() => researchData as Raziskava[], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ehiFilter, setEhiFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const totalResearch = raziskave.length;
  const avgEHI = (raziskave.reduce((sum, item) => sum + item.ehi, 0) / totalResearch).toFixed(2);
  const categories = new Set(raziskave.map((item) => item.category));
  const totalCategories = categories.size;
  const timelineEvents = useMemo(
    () => [...raziskave].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [raziskave],
  );

  const filteredResearch = useMemo(() => {
    return raziskave.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesEhi =
        ehiFilter === 'all' ||
        (ehiFilter === 'critical' && item.ehi >= 0.8) ||
        (ehiFilter === 'high' && item.ehi >= 0.6 && item.ehi < 0.8) ||
        (ehiFilter === 'medium' && item.ehi >= 0.3 && item.ehi < 0.6) ||
        (ehiFilter === 'low' && item.ehi < 0.3);
      return matchesSearch && matchesCategory && matchesEhi;
    });
  }, [raziskave, searchQuery, categoryFilter, ehiFilter]);

  const displayedResearch = useMemo(() => {
    return [...filteredResearch].sort((a, b) => {
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'ehi-high-low') return b.ehi - a.ehi;
      if (sortBy === 'ehi-low-high') return a.ehi - b.ehi;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filteredResearch, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    raziskave.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [raziskave]);

  const ehiBuckets = useMemo(() => {
    const buckets = { low: 0, medium: 0, high: 0, critical: 0 };
    raziskave.forEach((item) => {
      if (item.ehi >= 0.8) buckets.critical += 1;
      else if (item.ehi >= 0.6) buckets.high += 1;
      else if (item.ehi >= 0.3) buckets.medium += 1;
      else buckets.low += 1;
    });
    return buckets;
  }, [raziskave]);

  const ehiDistributionData = {
    labels: ['Nizka (0-0.3)', 'Srednja (0.3-0.6)', 'Visoka (0.6-0.8)', 'Kritična (0.8-1.0)'],
    datasets: [
      {
        label: 'Število primerov',
        data: [ehiBuckets.low, ehiBuckets.medium, ehiBuckets.high, ehiBuckets.critical],
        backgroundColor: ['#22C55E', '#FACC15', '#F97316', '#EF4444'].map((color) => `${color}33`),
        borderColor: ['#22C55E', '#FACC15', '#F97316', '#EF4444'],
        borderWidth: 2,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Raziskav',
        data: Object.values(categoryCounts),
        backgroundColor: '#0FCCCE33',
        borderColor: '#0FCCCE',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const ehiTrendData = {
    labels: timelineEvents
      .slice()
      .reverse()
      .map((item) => new Date(item.date).toLocaleDateString('sl-SI')),
    datasets: [
      {
        label: 'EHI',
        data: timelineEvents
          .slice()
          .reverse()
          .map((item) => item.ehi),
        borderColor: '#0FCCCE',
        backgroundColor: 'rgba(15, 204, 206, 0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const mapSites = useMemo(
    () =>
      raziskave.filter((item) => typeof item.lat === 'number' && typeof item.lon === 'number') as Array<
        Raziskava & { lat: number; lon: number }
      >,
    [raziskave],
  );

  const mapCenter = mapSites.length ? [mapSites[0].lat, mapSites[0].lon] : [46.05, 14.5];

  const savaPath: [number, number][] = [
    [46.5, 13.7],
    [46.3, 14.0],
    [46.15, 14.4],
    [45.95, 15.5],
  ];

  const getEhiColor = (value: number) => {
    if (value >= 0.8) return '#EF4444';
    if (value >= 0.6) return '#F97316';
    if (value >= 0.3) return '#FACC15';
    return '#22C55E';
  };

  const getEhiRadius = (value: number) => {
    if (value >= 0.8) return 18;
    if (value >= 0.6) return 14;
    if (value >= 0.3) return 10;
    return 8;
  };

  return (
    <div className="bg-background text-text-primary min-h-screen font-body">
      <section
        className="text-center py-20 lg:py-32"
        style={{ background: 'linear-gradient(180deg, var(--background) 0%, #080b21 100%)' }}
      >
        <h1 className="text-h1 font-heading mb-4">🛰️ Projekt Orion</h1>
        <p className="text-h3" style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>
          Raziskave Okoljske Hipokrizije
        </p>
        <p className="mt-4 max-w-2xl mx-auto">Primerjamo obljube z resničnostjo. S podatki, ne z mnenji.</p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="btn-primary">Dodaj Raziskavo</button>
          <button className="btn-secondary">ZDIJZ Obrazec</button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          <div className="card !py-6">
            <div className="text-h2 font-bold">{totalResearch}</div>
            <div className="text-secondary">Raziskav</div>
          </div>
          <div className="card !py-6">
            <div className="text-h2 font-bold">{avgEHI}</div>
            <div className="text-secondary">Povprečen EHI</div>
          </div>
          <div className="card !py-6">
            <div className="text-h2 font-bold">{totalCategories}</div>
            <div className="text-secondary">Kategorij</div>
          </div>
          <div className="card !py-6">
            <div className="text-h2 font-bold">48-72h</div>
            <div className="text-secondary">Čas Analize</div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-10 py-4 bg-surface/80 backdrop-blur-lg border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 items-center">
          <input
            type="search"
            placeholder="🔍 Išči po naslovu, kraju..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex-grow bg-background border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="bg-background border border-slate-700 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Vse Kategorije</option>
            {[...categories].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={ehiFilter}
            onChange={(event) => setEhiFilter(event.target.value)}
            className="bg-background border border-slate-700 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">EHI (vsi)</option>
            <option value="critical">Kritičen (0.8+)</option>
            <option value="high">Visok (0.6-0.8)</option>
            <option value="medium">Srednji (0.3-0.6)</option>
            <option value="low">Nizek (0-0.3)</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="bg-background border border-slate-700 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="latest">Najprej Najnovejše</option>
            <option value="oldest">Najprej Najstarejše</option>
            <option value="ehi-high-low">EHI (visok-nizek)</option>
            <option value="ehi-low-high">EHI (nizek-visok)</option>
          </select>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-h3 font-heading">🌍 Karta Resnice</h3>
              <span className="text-sm text-text-secondary">Live Leaflet</span>
            </div>
            <div className="h-[420px] rounded-xl overflow-hidden border border-slate-800">
              {typeof window !== 'undefined' && (
                <MapContainer
                  center={mapCenter as [number, number]}
                  zoom={7}
                  minZoom={6}
                  maxZoom={12}
                  style={{ height: '100%', width: '100%' }}
                  className="leaflet-dark"
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO" />
                  <Polyline positions={savaPath} pathOptions={{ color: '#0FCCCE', weight: 4, opacity: 0.8, dashArray: '10, 6' }} />
                  {mapSites.map((site) => (
                    <CircleMarker
                      key={site.id}
                      center={[site.lat, site.lon]}
                      pathOptions={{ color: getEhiColor(site.ehi), fillColor: getEhiColor(site.ehi), fillOpacity: 0.6 }}
                      radius={getEhiRadius(site.ehi)}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={1} className="map-tooltip">
                        <div className="font-bold text-slate-900">{site.title}</div>
                        <div className="text-xs text-slate-700">EHI: {site.ehi}</div>
                        <div className="text-xs text-slate-500">{site.location || 'Neznana lokacija'}</div>
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-3 text-primary">EHI trend</h3>
              <Line
                data={ehiTrendData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true, max: 1 },
                  },
                }}
              />
            </div>

            <div className="card grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">EHI distribucija</h3>
                <Doughnut
                  data={ehiDistributionData}
                  options={{
                    plugins: { legend: { position: 'bottom', labels: { color: '#E8EAED' } } },
                    cutout: '60%',
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Kategorije</h3>
                <Bar
                  data={categoryChartData}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { ticks: { color: '#9CA3AF' }, grid: { display: false } },
                      y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card timeline">
          <h3 className="text-lg font-semibold mb-6 text-primary">Časovna linija obljub vs. realnosti</h3>
          <div className="timeline-list">
            {timelineEvents.slice(0, 8).map((event) => (
              <div className="timeline-item" key={event.id}>
                <div className={`timeline-dot ${event.ehi >= 0.7 ? 'danger' : event.ehi >= 0.4 ? 'warning' : 'ok'}`} />
                <div className="timeline-content">
                  <p className="timeline-date">{new Date(event.date).toLocaleDateString('sl-SI')}</p>
                  <h4>{event.title}</h4>
                  <p className="text-sm text-text-secondary">{event.promise || event.description}</p>
                </div>
                <div className="timeline-ehi">EHI {event.ehi.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="research-grid">
          {displayedResearch.map((raziskava) => (
            <ResearchCard key={raziskava.id} {...raziskava} />
          ))}
        </div>
      </main>

      <footer className="text-center py-12 text-text-secondary">
        <p>Projekt Orion | AETHERON ∞ SHABAD</p>
      </footer>
    </div>
  );
}

export default App;
