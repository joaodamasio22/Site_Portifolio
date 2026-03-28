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
// ── PARTÍCULAS — loop do rodapé ao header ──────────────────────
// ── PARTÍCULAS — nascem no footer, somem no header ─────────────
const heroParticles = document.getElementById('hero-particles');

function criarParticula() {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = 4 + Math.random() * 18;
    const duracaoMs = (9 + Math.random() * 12) * 1000;
    const leftPct = Math.random() * 100;

    p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${leftPct}%;
        position: fixed;
        border-radius: 50%;
        background: rgba(79,58,172,0.25);
        pointer-events: none;
        z-index: 0;
        opacity: 0;
    `;

    document.body.appendChild(p);

    const inicio = performance.now();

    function animar(agora) {
        const progresso = (agora - inicio) / duracaoMs;

        if (progresso >= 1) {
            p.remove();
            criarParticula();
            return;
        }

        // Sobe da base da tela (100vh) até o topo (0)
        const y = window.innerHeight * (1 - progresso);
        p.style.top = y + 'px';

        // Fade in nos primeiros 8%, fade out nos últimos 10%
        let opacity;
        if (progresso < 0.08) {
            opacity = progresso / 0.08;
        } else if (progresso > 0.90) {
            opacity = (1 - progresso) / 0.10;
        } else {
            opacity = 1;
        }
        p.style.opacity = opacity * 0.55;

        // Leve balanço lateral
        const balanco = Math.sin(progresso * Math.PI * 5) * 15;
        p.style.marginLeft = balanco + 'px';

        requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
}

// Inicia 45 partículas em momentos diferentes
for (let i = 0; i < 45; i++) {
    setTimeout(criarParticula, Math.random() * 10000);
}