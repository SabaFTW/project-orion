// Main App Logic for Projekt Orion
// Handles tab switching, PWA install, and data loading

// === PWA Install Prompt ===
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    installBtn.classList.add('hidden');
});

// === Tab Switching ===
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active from all
        tabButtons.forEach(btn => {
            btn.classList.remove('active', 'border-cyan-400', 'text-cyan-400', 'bg-cyan-400/5');
            btn.classList.add('border-transparent', 'text-slate-400');
        });

        // Add active to clicked
        button.classList.add('active', 'border-cyan-400', 'text-cyan-400', 'bg-cyan-400/5');
        button.classList.remove('border-transparent', 'text-slate-400');

        // Hide all content
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Show target content
        const targetContent = document.getElementById(`tab-${targetTab}`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        // Initialize components if needed
        initializeTabContent(targetTab);
    });
});

// === Initialize Tab Content ===
function initializeTabContent(tab) {
    switch(tab) {
        case 'zemljevid':
            if (!window.zemljevidInitialized) {
                initZemljevid();
                window.zemljevidInitialized = true;
            }
            break;
        case 'casovnica':
            if (!window.casovnicaInitialized) {
                initCasovnica();
                window.casovnicaInitialized = true;
            }
            break;
        case 'omrezja':
            if (!window.omrezjaInitialized) {
                initOmrezja();
                window.omrezjaInitialized = true;
            }
            break;
        case 'akcije':
            if (!window.akcijeInitialized) {
                initAkcije();
                window.akcijeInitialized = true;
            }
            break;
        case 'karta':
            if (!window.kartaInitialized) {
                initKarta();
                window.kartaInitialized = true;
            }
            break;
    }
}

// === Data Loading ===
async function loadResearchData() {
    try {
        const response = await fetch('data/raziskave.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading research data:', error);
        // Return mock data if file doesn't exist yet
        return getMockResearchData();
    }
}

function getMockResearchData() {
    return [
        {
            id: 1,
            title: "SIJ Acroni - Greenwashing Jeklarne",
            slug: "sij-acroni",
            category: "Energetika",
            location: "Jesenice",
            ehi: 0.67,
            promise: "51% zmanjšanje emisij do 2030",
            reality: "EAF tehnologija že od 1960-ih - ni nova",
            description: "Analiza razkoraka med javnimi obljubami SIJ Group in dejanskimi podatki o emisijah.",
            date: "2025-11-07",
            featured: true,
            tags: ["jeklo", "EU-financiranje", "greenwashing"]
        },
        {
            id: 2,
            title: "Lafarge Cement - Zaprt po 13-letnem boju",
            slug: "lafarge",
            category: "Industrija",
            location: "Trbovlje",
            ehi: 0.89,
            promise: "Trajnostno poslovanje",
            reality: "Zaprt 2015 po pritisků skupnosti",
            description: "Primer kako lokalna skupnost lahko ustavi onesnaževalca kljub lobiju.",
            date: "2025-11-06",
            featured: true,
            tags: ["cement", "uspeh", "aktivizem"]
        },
        {
            id: 3,
            title: "Ljubljana - Zelena prestolnica?",
            slug: "ljubljana-ciscenje",
            category: "Komunala",
            location: "Ljubljana",
            ehi: 0.69,
            promise: "Zelena prestolnica Evrope",
            reality: "Najvišja konc. nitratov na Savi",
            description: "Razkorak med zeleno podobo Ljubljane in dejanskimi podatki o kakovosti vode.",
            date: "2025-11-05",
            featured: true,
            tags: ["voda", "nitrati", "greenwashing"]
        }
    ];
}

// === Render Research Cards ===
async function renderResearchCards() {
    const data = await loadResearchData();
    const grid = document.getElementById('raziskaveGrid');

    if (!grid) return;

    const featured = data.filter(r => r.featured);

    grid.innerHTML = featured.map(research => `
        <div class="research-card bg-slate-800 border-2 border-slate-700 rounded-lg p-6 hover:border-cyan-500 transition cursor-pointer"
             onclick="window.location.href='raziskave/${research.slug}/'">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h4 class="text-xl font-bold text-white mb-1">${research.title}</h4>
                    <p class="text-slate-400 text-sm">${research.location} • ${research.category}</p>
                </div>
                <div class="ehi-badge px-3 py-1 rounded-full text-sm font-bold ${getEHIClass(research.ehi)}">
                    EHI: ${research.ehi}
                </div>
            </div>

            <div class="space-y-3 mb-4">
                <div class="bg-green-900/20 border border-green-700/50 rounded p-3">
                    <div class="text-xs text-green-400 mb-1">🟢 JAVNA OBLJUBA</div>
                    <p class="text-green-100 text-sm">${research.promise}</p>
                </div>

                <div class="bg-red-900/20 border border-red-700/50 rounded p-3">
                    <div class="text-xs text-red-400 mb-1">🔴 DEJANSKA RESNICA</div>
                    <p class="text-red-100 text-sm">${research.reality}</p>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
                ${research.tags.map(tag => `
                    <span class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">#${tag}</span>
                `).join('')}
            </div>

            <button class="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition">
                Raziskuj →
            </button>
        </div>
    `).join('');

    // Update average EHI
    const avgEHI = (featured.reduce((sum, r) => sum + r.ehi, 0) / featured.length).toFixed(2);
    const avgEHIElement = document.getElementById('avgEHI');
    if (avgEHIElement) {
        avgEHIElement.textContent = avgEHI;
        avgEHIElement.className = `text-2xl font-bold ${getEHIColorClass(avgEHI)}`;
    }
}

function getEHIClass(ehi) {
    if (ehi >= 0.8) return 'bg-red-900/30 text-red-400';
    if (ehi >= 0.6) return 'bg-orange-900/30 text-orange-400';
    if (ehi >= 0.4) return 'bg-yellow-900/30 text-yellow-400';
    return 'bg-green-900/30 text-green-400';
}

function getEHIColorClass(ehi) {
    if (ehi >= 0.8) return 'text-red-400';
    if (ehi >= 0.6) return 'text-orange-400';
    if (ehi >= 0.4) return 'text-yellow-400';
    return 'text-green-400';
}

// === Initialize on Load ===
document.addEventListener('DOMContentLoaded', () => {
    // Render research cards
    renderResearchCards();

    // Initialize first tab (zemljevid)
    initializeTabContent('zemljevid');

    // Service Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
