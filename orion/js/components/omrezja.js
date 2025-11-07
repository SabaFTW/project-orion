// Omrežja Moči Component
// Network mapping of power connections

function initOmrezja() {
    const container = document.getElementById('omrezjaContainer');

    const connections = [
        { from: "SIJ Group", to: "EBRD (EU)", amount: "€230M", type: "funding", impact: "Kritično" },
        { from: "SIJ Group", to: "ResponsibleSteel", amount: "Certifikacija", type: "certification", impact: "PR" },
        { from: "Lafarge Cement", to: "Lokalne oblasti", amount: "Donacije + Delovna mesta", type: "influence", impact: "Strukturno" },
        { from: "EU Green Deal", to: "Slovenija", amount: "Regulacija + Financiranje", type: "policy", impact: "Sistemsko" },
        { from: "Industrija", to: "Lobisti", amount: "Neznano", type: "lobbying", impact: "Skrito" }
    ];

    const actors = [
        { name: "SIJ Group", type: "corporation", connections: 3, influence: "Visoka" },
        { name: "EBRD", type: "finance", connections: 1, influence: "Kritična" },
        { name: "Lafarge", type: "corporation", connections: 2, influence: "Zgodovinska" },
        { name: "EU Green Deal", type: "policy", connections: 1, influence: "Sistemska" },
        { name: "Lokalne oblasti", type: "government", connections: 1, influence: "Operativna" }
    ];

    container.innerHTML = `
        <div class="space-y-6">
            <div class="bg-slate-900 rounded-lg border-2 border-slate-700 p-8">
                <h2 class="text-3xl font-bold mb-6 text-cyan-400">🕸️ Omrežja Moči</h2>
                <p class="text-slate-400 mb-8">Kartiranje finančnih in političnih povezav</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    ${connections.map(conn => `
                        <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-cyan-500 transition">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-slate-200">${conn.from}</span>
                                    <span class="text-cyan-400">→</span>
                                    <span class="font-bold text-cyan-400">${conn.to}</span>
                                </div>
                            </div>
                            <div class="text-sm text-slate-400 mb-2">${conn.amount}</div>
                            <div class="flex items-center justify-between">
                                <div class="inline-block px-2 py-1 rounded text-xs font-semibold ${
                                    conn.type === 'funding' ? 'bg-yellow-500/20 text-yellow-400' :
                                    conn.type === 'certification' ? 'bg-blue-500/20 text-blue-400' :
                                    conn.type === 'influence' ? 'bg-red-500/20 text-red-400' :
                                    conn.type === 'lobbying' ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-slate-500/20 text-slate-400'
                                }">
                                    ${conn.type}
                                </div>
                                <span class="text-xs text-slate-500">Vpliv: ${conn.impact}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <h3 class="font-bold text-red-400 mb-3 flex items-center gap-2">
                        <span>⚠️</span>
                        <span>Kritična Ugotovitev: Strukturni Konflikt Interesov</span>
                    </h3>
                    <p class="text-slate-300 text-sm leading-relaxed">
                        Primer Lafarge: Lokalne oblasti so "gledale stran" zaradi donacij, sponzorstev in delovnih mest.
                        To je <strong>strukturni vzrok</strong> zakaj se onesnaženje ne ustavi kljub očitnim preseganjem norm.
                        Šele dolgotrajni pritisk civilne družbe (13 let!) je uspel zapreti obrat.
                    </p>
                </div>
            </div>

            <div class="bg-slate-900 rounded-lg border-2 border-slate-700 p-8">
                <h3 class="text-2xl font-bold mb-4 text-cyan-400">Ključni Akterji</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${actors.map(actor => `
                        <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                            <div class="flex items-start justify-between mb-2">
                                <h4 class="font-bold text-white">${actor.name}</h4>
                                <span class="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">
                                    ${actor.connections} povezav
                                </span>
                            </div>
                            <div class="text-sm text-slate-400 mb-1 capitalize">${actor.type}</div>
                            <div class="text-xs text-slate-500">Vpliv: ${actor.influence}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
