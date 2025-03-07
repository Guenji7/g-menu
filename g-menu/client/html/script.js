// Globale Zustandsvariablen
let isMenuOpen = false;
let isLookingAtPlayer = false;

// Initialisierung der Event-Listener
if ('alt' in window) {
    alt.on('setMenuState', (state) => {
        const ring = document.getElementById('thick-ring');
        isMenuOpen = state;
        
        if (state) {
            ring.classList.remove('hidden');
            ring.classList.add('active');
        } else {
            ring.classList.remove('active');
            ring.classList.add('hidden');
            closeAllSections();
        }
    });

    alt.on('setLookingAtPlayer', (state) => {
        isLookingAtPlayer = state;
        document.body.style.cursor = state ? 'pointer' : 'default';
    });
}

// Hilfsfunktion zum Schließen aller Untermenüs
function closeAllSections() {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
}

// Menü-Interaktionen
function toggleMenu() {
    if (!isLookingAtPlayer && !isMenuOpen) return;
    alt.emit('toggleMenu', !isMenuOpen);
}

// Sektionen handlen
function openSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    closeAllSections();
    section.style.display = 'flex';
    alt.emit('showCursor', true);
}

function goBack() {
    closeAllSections();
    alt.emit('setMenuState', true);
}

// Audio-Funktionen
let isMuted = false;
function toggleMute() {
    const muteBtn = document.querySelector('#thick-ring g:nth-child(4) text');
    isMuted = !isMuted;
    muteBtn.setAttribute('fill', isMuted ? 'red' : '#00ffff');
    alt.emit('toggleMute', isMuted);
}

// Hover-Effekte
function hoverSegment(element) {
    const path = element.querySelector('path');
    if (path) {
        path.style.fill = 'rgba(0, 255, 255, 0.3)';
        path.style.stroke = 'rgba(0, 255, 255, 0.6)';
    }
}

function unhoverSegment(element) {
    const path = element.querySelector('path');
    if (path) {
        path.style.fill = 'rgba(0, 255, 255, 0.1)';
        path.style.stroke = 'rgba(0, 255, 255, 0.3)';
    }
}

// Tastatursteuerung
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'g') {
        event.preventDefault();
        if (isLookingAtPlayer || isMenuOpen) {
            toggleMenu();
        }
    }
    
    // ESC zum Schließen
    if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});