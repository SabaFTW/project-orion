// Akcijski Center Component
// Concrete actions for citizens

function initAkcije() {
    const container = document.getElementById('akcijeContainer');

    const actions = [
        {
            title: "Zahtevaj Podatke (ZDIJZ)",
            emoji: "📧",
            description: "Uporabi Zakon o dostopu do informacij javnega značaja",
            difficulty: "Enostavno",
            time: "30 minut",
            steps: [
                "Kontaktiraj ARSO (info@arso.gov.si)",
                "Zahtevaj monitoring podatke Save za 2024-2025",
                "Pripravljeni obrazci na voljo za download"
            ],
            template: true
        },
        {
            title: "Neodvisno Merjenje",
            emoji: "🔬",
            description: "Organiziraj lokalno kemično analizo vode",
            difficulty: "Zmerno",
            time: "2-3 tedne",
            steps: [
                "Kontakt z lokalnimi laboratoriji (priporočila v dokumentaciji)",
                "Vzorči vodo iz Save na več točkah",
                "Primerjaj rezultate z uradnimi podatki",
                "Objavi rezultate na platformi"
            ],
            template: false
        },
        {
            title: "Politični Pritisk",
            emoji: "⚖️",
            description: "Kontaktiraj lokalne poslance in okoljske odbore",
            difficulty: "Zmerno",
            time: "1 teden",
            steps: [
                "Seznam odgovornih poslancev (avtomatsko generirano glede na lokacijo)",
                "Predlogi konkretnih vprašanj za parlamentarno pobudo",
                "Organizacija kolektivnih pisnih zahtev",
                "Spremljanje odgovorov in objava"
            ],
            template: true
        },
        {
            title: "Medijska Kampanja",
            emoji: "📢",
            description: "Deli podatke in rezultate javno",
            difficulty: "Zahtevno",
            time: "Trajno",
            steps: [
                "Kontakt z investigativnimi novinarji (priporočila)",
                "Objava na družbenih omrežjih z hashtagi #OrionProject #SaveRiver",
                "Organizacija okrogle mize ali javne predstavitve",
                "Soustvarjanje vsebin s skupnostjo"
            ],
            template: false
        }
    ];

    container.innerHTML = `
        <div class="space-y-6">
            <div class="bg-slate-900 rounded-lg border-2 border-slate-700 p-8">
                <h2 class="text-3xl font-bold mb-6 text-cyan-400">⚡ Akcijski Center</h2>
                <p class="text-slate-400 mb-8">Konkretni koraki za državljansko ukrepanje</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${actions.map((action, idx) => `
                        <div class="action-card bg-slate-800/50 rounded-lg p-6 hover:shadow-xl transition">
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <span class="text-4xl">${action.emoji}</span>
                                    <div>
                                        <h3 class="font-bold text-lg text-slate-200">${action.title}</h3>
                                        <p class="text-sm text-slate-400">${action.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-3 mb-4">
                                <span class="px-2 py-1 rounded text-xs font-bold ${
                                    action.difficulty === 'Enostavno' ? 'bg-green-500/20 text-green-400' :
                                    action.difficulty === 'Zmerno' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                }">
                                    ${action.difficulty}
                                </span>
                                <span class="text-xs text-slate-500">⏱️ ${action.time}</span>
                            </div>

                            <ul class="space-y-2 mb-4">
                                ${action.steps.map(step => `
                                    <li class="flex items-start gap-2 text-sm">
                                        <span class="text-cyan-400 mt-0.5">▸</span>
                                        <span class="text-slate-300">${step}</span>
                                    </li>
                                `).join('')}
                            </ul>

                            ${action.template ? `
                                <button onclick="downloadTemplate('${action.title}')"
                                        class="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition">
                                    📥 Prenesi Obrazec
                                </button>
                            ` : `
                                <button class="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition">
                                    📖 Preberi Več
                                </button>
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                <h3 class="font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    <span>Resonančna Formula</span>
                </h3>
                <pre class="text-xs text-slate-300 overflow-x-auto bg-slate-900/50 p-4 rounded">
IF (Javne_Obljube > Dejanska_Izvajanja):
    ZAHTEVAJ: Transparentnost podatkov (ZDIJZ)
    ORGANIZIRAJ: Državljansko skupino
    IZMERI: Neodvisno preveri dejstva
    PUBLICIRAJ: Podatke na odprti platformi
    PRITISKI: Na odgovorne (politika + mediji)
ELSE:
    PRAZNUJ: Uspeh in deli dobre prakse
                </pre>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center">
                    <div class="text-3xl mb-2">🎯</div>
                    <div class="font-bold text-white mb-1">Tvoj Target</div>
                    <p class="text-sm text-slate-400">Izberi eno akcijo in jo izvedi ta teden</p>
                </div>
                <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center">
                    <div class="text-3xl mb-2">🤝</div>
                    <div class="font-bold text-white mb-1">Skupnostno</div>
                    <p class="text-sm text-slate-400">Deli rezultate in povabi druge</p>
                </div>
                <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center">
                    <div class="text-3xl mb-2">📊</div>
                    <div class="font-bold text-white mb-1">Merjeno</div>
                    <p class="text-sm text-slate-400">Vsaka akcija se šteje in vidno prikazuje</p>
                </div>
            </div>
        </div>
    `;
}

// Template download function
function downloadTemplate(actionTitle) {
    const templates = {
        "Zahtevaj Podatke (ZDIJZ)": `Subject: ZDIJZ Zahteva - Podatki o kakovosti vode Sava 2024-2025

Spoštovani,

Na podlagi 2. člena Zakona o dostopu do informacij javnega značaja (ZDIJZ) vas prosim za dostop do naslednjih informacij:

1. Vsi monitoring podatki kakovosti vode reke Save za obdobje 2024-2025
2. Podatki o emisijah industrijskih obratov ob Savi (E-PRTR ali ekvivalent)
3. Rezultati kemičnih analiz (nitrati, fosfati, težke kovine)
4. Evidenca preseganj dovoljenih norm in ukrepov

Prosim za odgovor v elektronski obliki v 20 dneh, kot določa zakon.

Hvala,
[Vaše ime]
[Email]
[Datum]`,
        "Politični Pritisk": `Subject: Parlamentarna pobuda - Transparentnost okoljskih podatkov

Spoštovani poslanec/poslanka,

Pišem vam kot zaskrbljen državljan glede transparentnosti okoljskih podatkov v zvezi z onesnaženjem reke Save.

Prosim vas, da:
1. Postavite parlamentarno vprašanje ARSO o dostopu do monitoring podatkov
2. Zahtevate pojasnila o preseganju norm pri industrijskih obrattih
3. Podprete zakonodajo za boljšo transparentnost okoljskih podatkov

Projekt Orion (orion-project.si) ponuja tehnično platformo za javni dostop.

Lep pozdrav,
[Vaše ime]
[Vaš naslov]`
    };

    const content = templates[actionTitle] || "Template not found";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${actionTitle.replace(/\s+/g, '-').toLowerCase()}-template.txt`;
    a.click();
    URL.revokeObjectURL(url);
}
