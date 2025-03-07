// Funktion zum Öffnen eines Abschnitts
function openSection(sectionId) {
    // Verstecke den Ring
    const ring = document.getElementById('thick-ring');
    ring.classList.remove('active');
    ring.classList.add('hidden');

    // Zeige den gewählten Abschnitt
    const section = document.getElementById(sectionId);
    section.style.display = 'flex';
}

// Funktion für Zurück-Button
function goBack() {
    // Verstecke alle Abschnitte
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Zeige den Ring wieder an
    const ring = document.getElementById('thick-ring');
    ring.classList.remove('hidden');
    ring.classList.add('active');
}

// Mute-Funktion
let isMuted = false;
function toggleMute() {
    const muteBtn = document.querySelector('#thick-ring g:last-child text');
    if (isMuted) {
        muteBtn.setAttribute('fill', '#00ffff'); // Ändere zurück zur Standardfarbe
        isMuted = false;
    } else {
        muteBtn.setAttribute('fill', 'red'); // Ändere zu Rot für "Stumm"
        isMuted = true;
    }
}

// Zentraler Button klicken, um das Menü zu öffnen/schließen
document.getElementById('centerButton').addEventListener('click', () => {
    toggleMenu();
});

// Tastendruck "G" öffnet/schließt das Ring-Menü
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'g') {
        toggleMenu();
    }
});

// Toggle-Menu korrigiert
function toggleMenu() {
    const ring = document.getElementById('thick-ring');
    const centerButton = document.getElementById('centerButton');
    
    if (ring.classList.contains('hidden')) {
        ring.classList.remove('hidden');
        ring.classList.add('active');
        centerButton.innerHTML = '<i class="fa-solid fa-times"></i>';
    } else {
        ring.classList.remove('active');
        ring.classList.add('hidden');
        centerButton.innerHTML = 'G';
    }
}

// Event-Listener für Center-Button aktualisiert
document.getElementById('centerButton').addEventListener('click', toggleMenu);