/* ============================================================
   Eid Al-Fitr Greeting Card — main.js
   ============================================================ */

/* ── Generate Stars ── */
(function generateStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 130; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `top:${Math.random() * 100}%`,
        `left:${Math.random() * 100}%`,
        `--dur:${Math.random() * 4 + 2}s`,
        `--delay:${Math.random() * 6}s`,
        `--max-op:${Math.random() * 0.6 + 0.3}`,
      ].join(';');
      container.appendChild(star);
    }
  })();
  
  /* ── Generate Lanterns ── */
  (function generateLanterns() {
    const container = document.getElementById('lanterns');
    const colorSets = [
      ['#c9a84c', '#f0d080'],
      ['#1a6b72', '#2fa89a'],
      ['#8b1a1a', '#d94f4f'],
    ];
    for (let i = 0; i < 7; i++) {
      const [c1, c2] = colorSets[i % colorSets.length];
      const lantern = document.createElement('div');
      lantern.className = 'lantern';
      lantern.style.cssText = `left:${i * 14 + 2}%;--sd:${3 + i * 0.4}s;--sl:${i * 0.6}s;`;
      lantern.innerHTML = `
        <svg width="24" height="54" viewBox="0 0 28 60">
          <line x1="14" y1="0"  x2="14" y2="8"  stroke="${c1}" stroke-width="1.5"/>
          <rect x="2"  y="8"  width="24" height="36" rx="4" fill="${c1}" opacity="0.85"/>
          <rect x="6"  y="12" width="16" height="28" rx="2" fill="${c2}" opacity="0.4"/>
          <ellipse cx="14" cy="44" rx="12" ry="4" fill="${c1}" opacity="0.7"/>
          <circle  cx="14" cy="24" r="5"           fill="${c2}" opacity="0.7"/>
          <line x1="14" y1="44" x2="14" y2="60" stroke="${c1}" stroke-width="1.5"/>
        </svg>`;
      container.appendChild(lantern);
    }
  })();
  
  /* ── Generate Floating Particles ── */
  (function generateParticles() {
    const container = document.getElementById('particles');
    const colors = ['#c9a84c', '#f0d080', '#2fa89a', '#f5ead0', '#fff'];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 5 + 2;
      particle.style.cssText = [
        `left:${Math.random() * 100}%`,
        `background:${colors[i % colors.length]}`,
        `animation-duration:${Math.random() * 10 + 8}s`,
        `animation-delay:${Math.random() * 12}s`,
        `width:${size}px`,
        `height:${size}px`,
        `opacity:${Math.random() * 0.4 + 0.15}`,
      ].join(';');
      container.appendChild(particle);
    }
  })();
  
  /* ── Open Card ── */
  window.openCard = function () {
    const cover      = document.getElementById('cover');
    const innerPages = document.getElementById('innerPages');
  
    cover.classList.add('opening');
    setTimeout(() => {
      cover.style.display = 'none';
      innerPages.classList.add('visible');
      launchFireworks();
    }, 620);
  };
  
  /* ── Music Player (uses <audio id="bgMusic"> in HTML) ── */
  const bgAudio   = document.getElementById('bgMusic');
  let   isPlaying = false;
  
  window.toggleMusic = function () {
    const bars = document.getElementById('bars');
    const icon = document.getElementById('playIcon');
  
    if (!isPlaying) {
      bgAudio.play()
        .then(() => {
          isPlaying = true;
          icon.textContent = '⏸';
          bars.classList.remove('paused');
          launchFireworks();
        })
        .catch(() => {
          isPlaying = true;
          icon.textContent = '⏸';
          bars.classList.remove('paused');
        });
    } else {
      bgAudio.pause();
      isPlaying = false;
      icon.textContent = '▶';
      bars.classList.add('paused');
    }
  };
  
  /* ── Fireworks ── */
  function launchFireworks() {
    for (let i = 0; i < 4; i++) {
      setTimeout(spawnBurst, i * 500);
    }
  }
  
  function spawnBurst() {
    const x      = 15 + Math.random() * 70;
    const y      = 10 + Math.random() * 55;
    const colors = ['#f0d080', '#c9a84c', '#2fa89a', '#f5ead0', '#fff', '#d94f4f'];
  
    for (let i = 0; i < 18; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
  
      const angle = (i / 18) * Math.PI * 2;
      const dist  = 40 + Math.random() * 70;
      const dx    = Math.cos(angle) * dist;
      const dy    = Math.sin(angle) * dist;
  
      spark.style.cssText = [
        `left:${x}vw`,
        `top:${y}vh`,
        `background:${colors[i % colors.length]}`,
        `transition:transform 0.9s ease-out,opacity 0.9s ease-out`,
        `opacity:1`,
      ].join(';');
  
      document.body.appendChild(spark);
  
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${dx}px, ${dy}px)`;
        spark.style.opacity   = '0';
      });
  
      setTimeout(() => spark.remove(), 1000);
    }
  }