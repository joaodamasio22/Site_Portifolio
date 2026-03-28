(function() {
  const canvas = document.getElementById('jarvis-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.offsetWidth;
  let H = canvas.offsetHeight;
  canvas.width = W;
  canvas.height = H;

  const NUM_NOS = 72;
  const DIST_CONEXAO = 90;
  const nos = [];

  for (let i = 0; i < NUM_NOS; i++) {
    const r = 2 + Math.random() * 3.5;
    nos.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r,
      pulso: Math.random() * Math.PI * 2,
      velocidadePulso: 0.02 + Math.random() * 0.02,
    });
  }

  function desenhar() {
    ctx.clearRect(0, 0, W, H);

    // Conexões
    for (let i = 0; i < nos.length; i++) {
      for (let j = i + 1; j < nos.length; j++) {
        const dx = nos[i].x - nos[j].x;
        const dy = nos[i].y - nos[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST_CONEXAO) {
          const alpha = (1 - dist / DIST_CONEXAO) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nos[i].x, nos[i].y);
          ctx.lineTo(nos[j].x, nos[j].y);
          ctx.strokeStyle = `rgba(100, 160, 255, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Nós
    nos.forEach(no => {
      no.pulso += no.velocidadePulso;
      const escala = 1 + Math.sin(no.pulso) * 0.25;
      const raioAtual = no.r * escala;

      // Brilho suave
      const grad = ctx.createRadialGradient(no.x, no.y, 0, no.x, no.y, raioAtual * 3);
      grad.addColorStop(0, 'rgba(80, 180, 255, 0.5)');
      grad.addColorStop(1, 'rgba(80, 180, 255, 0)');
      ctx.beginPath();
      ctx.arc(no.x, no.y, raioAtual * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Núcleo
      ctx.beginPath();
      ctx.arc(no.x, no.y, raioAtual, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120, 200, 255, 0.85)`;
      ctx.fill();

      // Movimento
      no.x += no.vx;
      no.y += no.vy;
      if (no.x < 0 || no.x > W) no.vx *= -1;
      if (no.y < 0 || no.y > H) no.vy *= -1;
    });

    requestAnimationFrame(desenhar);
  }

  desenhar();

  // Responsivo
  window.addEventListener('resize', () => {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
  });
})();
