let isMenuOpen = false;
let isLookingAtPlayer = false;

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
        }
    });

    alt.on('setLookingAtPlayer', (state) => {
        isLookingAtPlayer = state;
        document.body.style.cursor = state ? 'pointer' : 'default';
    });
}

function toggleMenu() {
    if (!isLookingAtPlayer && !isMenuOpen) return;
    const ring = document.getElementById('thick-ring');
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        ring.classList.remove('hidden');
        ring.classList.add('active');
        alt.emit('setMenuState', true);
    } else {
        ring.classList.remove('active');
        ring.classList.add('hidden');
        alt.emit('setMenuState', false);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'g') {
        event.preventDefault();
        toggleMenu();
    }
    
    if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});

function hoverSegment(segment) {
    const path = segment.querySelector('path');
    path.setAttribute('fill', 'rgba(0, 255, 255, 0.5)');
}

function unhoverSegment(segment) {
    const path = segment.querySelector('path');
    path.setAttribute('fill', 'rgba(0, 255, 255, 0.1)');
}