// Časovna Linija Component
// Timeline of promises vs reality

function initCasovnica() {
    const container = document.getElementById('casovnicaContainer');

    const timeline = [
        { year: 1960, event: "EAF tehnologija uvedena v SIJ", type: "tech", icon: "⚙️" },
        { year: 2015, event: "Lafarge zaprt po pritisků skupnosti", type: "success", icon: "✅" },
        { year: 2020, event: "SIJ zaveza: -51% emisij do 2030", type: "promise", icon: "🟢" },
        { year: 2023, event: "ResponsibleSteel certifikacija SIJ", type: "pr", icon: "🏆" },
        { year: 2024, event: "EBRD posojilo €230M za 'dekarbonizacijo'", type: "funding", icon: "💰" },
        { year: 2025, event: "Dejanske emisije: Ni transparentnih podatkov", type: "reality", icon: "🔴" }
    ];

    container.innerHTML = `
        <div class="bg-slate-900 rounded-lg border-2 border-slate-700 p-8">
            <h2 class="text-3xl font-bold mb-6 text-cyan-400">⏳ Časovna Linija: Obljube vs. Resnica</h2>
            <p class="text-slate-400 mb-8">Primerjava ključnih dogodkov v industriji vzdolž Save</p>

            <div class="relative timeline-line">
                <div class="space-y-8 pl-12">
                    ${timeline.map((event, idx) => `
                        <div class="relative">
                            <div class="absolute -left-12 w-10 h-10 rounded-full border-4 flex items-center justify-center text-lg ${
                                event.type === 'promise' ? 'bg-green-500 border-green-300' :
                                event.type === 'reality' ? 'bg-red-500 border-red-300' :
                                event.type === 'pr' ? 'bg-blue-500 border-blue-300' :
                                event.type === 'funding' ? 'bg-yellow-500 border-yellow-300' :
                                event.type === 'success' ? 'bg-emerald-500 border-emerald-300' :
                                'bg-slate-500 border-slate-300'
                            }">
                                ${event.icon}
                            </div>

                            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-cyan-500 transition">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="font-bold text-cyan-400 text-lg">${event.year}</span>
                                    <span class="px-2 py-1 rounded text-xs font-bold ${
                                        event.type === 'promise' ? 'bg-green-500/20 text-green-400' :
                                        event.type === 'reality' ? 'bg-red-500/20 text-red-400' :
                                        event.type === 'pr' ? 'bg-blue-500/20 text-blue-400' :
                                        event.type === 'funding' ? 'bg-yellow-500/20 text-yellow-400' :
                                        event.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                                        'bg-slate-500/20 text-slate-400'
                                    }">
                                        ${event.type.toUpperCase()}
                                    </span>
                                </div>
                                <p class="text-slate-300">${event.event}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="mt-8 p-5 bg-cyan-900/20 border border-cyan-700/50 rounded-lg">
                <h3 class="text-cyan-400 font-bold mb-2">💡 Kritična Opomba</h3>
                <p class="text-sm text-slate-300">
                    EAF (Electric Arc Furnace) tehnologija je bila uvedena leta 1960.
                    "Dekarbonizacija" leta 2024 temelji na <strong>že obstoječi tehnologiji</strong>, ne na novi inovaciji.
                    €230M EU financiranja gre za nadgradnjo obstoječega sistema, ne za prebojno spremembo.
                </p>
            </div>
        </div>
    `;
}
