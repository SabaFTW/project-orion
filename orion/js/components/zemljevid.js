// Zemljevid Resnice Component
// Interactive Leaflet map with animated Sava River

function initZemljevid() {
    const container = document.getElementById('zemljevidContainer');

    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Map -->
            <div class="lg:col-span-2">
                <div class="bg-slate-900 rounded-lg border-2 border-slate-700 p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-2xl font-bold text-cyan-400">🗺️ Interaktivni Zemljevid Save</h3>
                        <div class="flex gap-2">
                            <button id="animateRiver" class="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-semibold transition">
                                ▶️ Animiraj tok
                            </button>
                        </div>
                    </div>
                    <div id="map"></div>

                    <!-- Layer Controls -->
                    <div class="mt-4 flex flex-wrap gap-3">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="layerPromises" checked class="form-checkbox text-cyan-500">
                            <span class="text-sm">🟢 Obljube</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="layerReality" checked class="form-checkbox text-cyan-500">
                            <span class="text-sm">🔴 Resnica</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="layerNetworks" class="form-checkbox text-cyan-500">
                            <span class="text-sm">⚪ Omrežja</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Site Details Sidebar -->
            <div>
                <div id="siteDetails" class="bg-slate-900 rounded-lg border-2 border-slate-700 p-6">
                    <div class="text-center text-slate-400">
                        <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <p class="font-medium">Izberite točko na zemljevidu</p>
                        <p class="text-sm mt-2">Kliknite na marker za podrobnosti</p>
                    </div>
                </div>

                <!-- Legend -->
                <div class="mt-6 bg-slate-900 rounded-lg border-2 border-slate-700 p-6">
                    <h4 class="font-bold text-sm mb-3 text-slate-300">LEGENDA - EHI</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded-full bg-red-500/30 border-2 border-red-400"></div>
                            <span class="text-slate-400">EHI > 0.7 (Kritična)</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded-full bg-orange-500/30 border-2 border-orange-400"></div>
                            <span class="text-slate-400">EHI 0.5-0.7 (Visoka)</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded-full bg-yellow-500/30 border-2 border-yellow-400"></div>
                            <span class="text-slate-400">EHI 0.3-0.5 (Zmerna)</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded-full bg-green-500/30 border-2 border-green-400"></div>
                            <span class="text-slate-400">EHI < 0.3 (Nizka)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Leaflet Map
    const map = L.map('map').setView([46.15, 15.0], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Mock Industrial Sites Data
    const sites = [
        {
            id: 1,
            name: "SIJ Acroni",
            location: "Jesenice",
            lat: 46.4319,
            lon: 14.0536,
            type: "Jeklo",
            ehi: 0.67,
            promise: "51% zmanjšanje emisij do 2030",
            reality: "EAF tehnologija že od 1960-ih",
            emissions: { co2: 218000, nox: 450, sox: 230 }
        },
        {
            id: 2,
            name: "Lafarge Cement",
            location: "Trbovlje",
            lat: 46.1547,
            lon: 15.0497,
            type: "Cement",
            ehi: 0.89,
            promise: "Trajnostno poslovanje",
            reality: "Zaprt 2015 po 13-letnem boju",
            emissions: { co2: 450000, nox: 890, sox: 620 }
        },
        {
            id: 3,
            name: "Ljubljana Čistilna",
            location: "Ljubljana",
            lat: 46.0569,
            lon: 14.5058,
            type: "Komunala",
            ehi: 0.69,
            promise: "Zelena prestolnica Evrope",
            reality: "Najvišja konc. nitratov na Savi",
            emissions: { nitrates: 1.64, phosphorus: 0.42 }
        }
    ];

    // Add markers
    sites.forEach(site => {
        const color = site.ehi > 0.7 ? 'red' : site.ehi > 0.5 ? 'orange' : site.ehi > 0.3 ? 'yellow' : 'green';

        const marker = L.circleMarker([site.lat, site.lon], {
            radius: 10,
            fillColor: color,
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(map);

        marker.on('click', () => showSiteDetails(site));
    });

    // Sava River Path (simplified)
    const savaPath = [
        [46.4319, 14.0536],  // Jesenice (near source)
        [46.3569, 14.1125],  // Radovljica
        [46.2431, 14.3558],  // Kranj
        [46.0569, 14.5058],  // Ljubljana
        [46.1547, 15.0497],  // Trbovlje
        [46.0411, 15.2675],  // Sevnica
        [45.9542, 15.5089]   // Krško
    ];

    let riverLine;
    let animatedLine;

    function drawRiver() {
        if (riverLine) map.removeLayer(riverLine);

        riverLine = L.polyline(savaPath, {
            color: '#0fccce',
            weight: 4,
            opacity: 0.6,
            smoothFactor: 1
        }).addTo(map);
    }

    drawRiver();

    // Animate River Flow
    document.getElementById('animateRiver').addEventListener('click', () => {
        if (animatedLine) {
            map.removeLayer(animatedLine);
            animatedLine = null;
            return;
        }

        let currentPoint = 0;
        const interval = setInterval(() => {
            if (currentPoint >= savaPath.length - 1) {
                clearInterval(interval);
                return;
            }

            const segment = [savaPath[currentPoint], savaPath[currentPoint + 1]];

            const line = L.polyline(segment, {
                color: '#00ffff',
                weight: 6,
                opacity: 1
            }).addTo(map);

            setTimeout(() => {
                map.removeLayer(line);
            }, 1000);

            currentPoint++;
        }, 500);
    });

    // Show site details
    function showSiteDetails(site) {
        const detailsDiv = document.getElementById('siteDetails');

        detailsDiv.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="text-xl font-bold text-cyan-400">${site.name}</h3>
                        <p class="text-slate-400 text-sm">${site.location} • ${site.type}</p>
                    </div>
                    <div class="px-3 py-1 rounded-full text-xs font-bold ${
                        site.ehi > 0.7 ? 'bg-red-500/20 text-red-400' :
                        site.ehi > 0.5 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                    }">
                        EHI: ${site.ehi}
                    </div>
                </div>

                <div class="bg-green-900/20 border border-green-700/50 rounded p-3">
                    <div class="text-xs text-green-400 mb-1">🟢 JAVNA OBLJUBA</div>
                    <p class="text-green-100 text-sm">${site.promise}</p>
                </div>

                <div class="bg-red-900/20 border border-red-700/50 rounded p-3">
                    <div class="text-xs text-red-400 mb-1">🔴 DEJANSKA RESNICA</div>
                    <p class="text-red-100 text-sm">${site.reality}</p>
                </div>

                <div>
                    <div class="text-xs text-slate-500 mb-2">EMISIJE</div>
                    <div class="space-y-1">
                        ${Object.entries(site.emissions).map(([key, value]) => `
                            <div class="flex justify-between text-sm">
                                <span class="text-slate-400 uppercase">${key}:</span>
                                <span class="font-mono text-slate-200">${value.toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button onclick="window.location.href='raziskave/${site.name.toLowerCase().replace(/\s+/g, '-')}/'"
                        class="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition">
                    Podrobna Raziskava →
                </button>
            </div>
        `;
    }

    // Layer toggles
    document.getElementById('layerPromises').addEventListener('change', (e) => {
        // Toggle promise layer visibility (implement as needed)
        console.log('Toggle promises:', e.target.checked);
    });

    document.getElementById('layerReality').addEventListener('change', (e) => {
        console.log('Toggle reality:', e.target.checked);
    });

    document.getElementById('layerNetworks').addEventListener('change', (e) => {
        console.log('Toggle networks:', e.target.checked);
    });
}
