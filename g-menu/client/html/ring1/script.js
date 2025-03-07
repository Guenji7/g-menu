function openSection(sectionId) {
    const ring = document.getElementById('thick-ring');
    ring.classList.remove('active');
    ring.classList.add('hidden');
  
    const section = document.getElementById(sectionId);
    section.style.display = 'flex';
  }
  
  function goBack() {
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
  
    const ring = document.getElementById('thick-ring');
    ring.classList.remove('hidden');
    ring.classList.add('active');
  }
  
  let isMuted = false;
  function toggleMute() {
    const muteBtn = document.querySelector('#thick-ring g:last-child text');
    if (isMuted) {
      muteBtn.setAttribute('fill', '#00ffff');
      isMuted = false;
    } else {
      muteBtn.setAttribute('fill', 'red');
      isMuted = true;
    }
  }
  
  document.getElementById('centerButton').addEventListener('click', () => {
    const ring = document.getElementById('thick-ring');
    if (ring.classList.contains('hidden')) {
      ring.classList.remove('hidden');
      ring.classList.add('active');
      document.getElementById('centerButton').innerHTML = '<i class="fa-solid fa-times"></i>';
    } else {
      ring.classList.remove('active');
      ring.classList.add('hidden');
      document.getElementById('centerButton').innerHTML = 'G';
    }
  });
  
  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'g') {
      const ring = document.getElementById('thick-ring');
      ring.classList.toggle('hidden');
    }
  });
  
  function hoverSegment(element) {
    element.querySelector('path').style.fill = 'rgba(0, 255, 255, 0.3)';
  }
  
  function unhoverSegment(element) {
    element.querySelector('path').style.fill = 'rgba(0, 255, 255, 0.1)';
  }