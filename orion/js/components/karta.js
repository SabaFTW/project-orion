// Karta Resonanc Component
// Embedded Vizualna Karta Resonanc

function initKarta() {
    const container = document.getElementById('kartaContainer');

    container.innerHTML = `
        <div class="bg-slate-900 rounded-lg border-2 border-slate-700 p-8">
            <h2 class="text-3xl font-bold mb-6 text-cyan-400">🌍 Karta Resonanc Kaosa in Upanja</h2>
            <p class="text-slate-400 mb-8">
                Globalni dogodki in lokalni odmev vzdolž Save - od pandemije do poplav,
                od mladinskih gibanj do industrijske realnosti.
            </p>

            <div class="rounded-lg border-2 border-slate-700 overflow-hidden bg-slate-950" style="height: 600px">
                <iframe
                    src="../index.html"
                    class="w-full h-full"
                    title="Vizualna Karta Resonanc"
                    style="border: none;"
                ></iframe>
            </div>

            <div class="mt-6 p-4 bg-slate-800/30 rounded border border-slate-700">
                <p class="text-sm text-slate-400">
                    <strong class="text-cyan-400">Metaforična Moč:</strong> Reka Sava teče kot živi organizem,
                    povezujoč industrijske obratte (SIJ, Lafarge) z mladinskimi gibanji in skupnostno odpornostjo.
                    Tok vode je tok informacij - od izvora kaosa do izliva upanja.
                </p>
            </div>

            <div class="mt-6">
                <h3 class="text-lg font-bold text-slate-300 mb-4">🔗 Povezani Onesnaževalci:</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="kartaCrossRef">
                    <!-- Populated by cross-reference -->
                </div>
            </div>
        </div>
    `;

    // Cross-reference with industrial sites from zemljevid
    const sites = [
        { name: "SIJ Acroni", location: "Jesenice", ehi: 0.67, reality: "EAF od 1960" },
        { name: "Lafarge", location: "Trbovlje", ehi: 0.89, reality: "Zaprt 2015" },
        { name: "Ljubljana", location: "Centralna ČN", ehi: 0.69, reality: "Najvišji nitrati" }
    ];

    const crossRefDiv = document.getElementById('kartaCrossRef');
    if (crossRefDiv) {
        crossRefDiv.innerHTML = sites.map(site => `
            <div class="bg-slate-800/50 rounded p-4 border border-slate-700 hover:border-cyan-500 transition cursor-pointer"
                 onclick="switchToTab('zemljevid'); highlightSite('${site.name}');">
                <div class="font-bold text-cyan-400 mb-2">${site.name}</div>
                <div class="text-sm text-slate-400">EHI: ${site.ehi}</div>
                <div class="text-xs text-slate-500 mt-2">${site.reality}</div>
            </div>
        `).join('');
    }
}

// Helper function to switch tabs programmatically
function switchToTab(tabName) {
    const button = document.querySelector(`[data-tab="${tabName}"]`);
    if (button) button.click();
}

// Helper function to highlight specific site on map
function highlightSite(siteName) {
    console.log('Highlighting site:', siteName);
    // TODO: Implement map marker highlighting
}
