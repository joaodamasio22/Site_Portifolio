const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top  = e.clientY - 5 + 'px';
    ring.style.left   = e.clientX - 16 + 'px';
    ring.style.top    = e.clientY - 16 + 'px';
});
document.querySelectorAll('a, button, input').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.opacity = '0'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.opacity = '1'; });
});

// ── SCROLL PROGRESS ────────────────────────────────────────────
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = pct + '%';
});

// ── PARTÍCULAS HERO ────────────────────────────────────────────
const heroParticles = document.getElementById('hero-particles');
for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = 4 + Math.random() * 20;
    p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${80 + Math.random()*20}%;
        animation-duration:${6 + Math.random()*10}s;
        animation-delay:${Math.random()*8}s;
    `;
    heroParticles.appendChild(p);
}