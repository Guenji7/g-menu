// Globale Zustandsvariablen
let isMenuOpen = false;
let isLookingAtPlayer = false;
let subMenuOpen = false;

// Initialisierung der Event-Listener
if ('alt' in window) {
    alt.on('setMenuState', (state) => {
        const ring = document.getElementById('thick-ring');
        const subRing = document.getElementById('sub-ring');
        isMenuOpen = state;
        
        if (state) {
            ring.classList.remove('hidden');
            ring.classList.add('active');
            subRing.classList.add('hidden');
        } else {
            ring.classList.remove('active');
            ring.classList.add('hidden');
            subRing.classList.remove('active');
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
    document.querySelectorAll('.ring-menu').forEach(svg => {
        svg.classList.add('hidden');
        svg.classList.remove('active');
    });
}

// Menü-Interaktionen
function toggleMenu() {
    if (!isLookingAtPlayer && !isMenuOpen) return;
    const ring = document.getElementById('thick-ring');
    const subRing = document.getElementById('sub-ring');
    if (isMenuOpen) {
        if (subMenuOpen) {
            closeAllSections();
            alt.emit('setMenuState', false);
            isMenuOpen = false;
            subMenuOpen = false;
        } else {
            closeAllSections();
            alt.emit('setMenuState', false);
            isMenuOpen = false;
        }
    } else {
        ring.classList.remove('hidden');
        ring.classList.add('active');
        isMenuOpen = true;
        alt.emit('setMenuState', true);
    }
}

// Sektionen handlen
function openSubRing() {
    const ring = document.getElementById('thick-ring');
    const subRing = document.getElementById('sub-ring');
    if (!ring || !subRing) {
        console.error('Element thick-ring oder sub-ring nicht gefunden');
        return;
    }

    ring.classList.remove('active');
    ring.classList.add('hidden');
    subRing.classList.remove('hidden');
    subRing.classList.add('active');
    subMenuOpen = true;
}

function goBack() {
    if (subMenuOpen) {
        subMenuOpen = false;
        const ring = document.getElementById('thick-ring');
        const subRing = document.getElementById('sub-ring');
        if (ring && subRing) {
            ring.classList.remove('hidden');
            ring.classList.add('active');
            subRing.classList.remove('active');
            subRing.classList.add('hidden');
        }
    }
}

// Audio-Funktionen
let isMuted = false;
function toggleMute() {
    const muteBtn = document.querySelector('#thick-ring g:nth-child(4) text');
    if (!muteBtn) {
        console.error('Element zum Stummschalten nicht gefunden');
        return;
    }
    isMuted = !isMuted;
    muteBtn.setAttribute('fill', isMuted ? 'red' : '#00ffff');
    alt.emit('toggleMute', isMuted);
}

// Tastatursteuerung
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'g') {
        event.preventDefault();
        toggleMenu();
    }
    
    // ESC zum Schließen
    if (event.key === 'Escape' && isMenuOpen) {
        closeAllSections();
        alt.emit('setMenuState', false);
        isMenuOpen = false;
    }
});

function hoverSegment(segment) {
    const path = segment.querySelector('path');
    if (!path) {
        console.error('Pfad im Segment nicht gefunden');
        return;
    }
    path.setAttribute('fill', 'rgba(0, 255, 255, 0.5)');
}