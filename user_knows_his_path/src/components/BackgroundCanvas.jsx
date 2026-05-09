import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

  const C = '#AB131C';
    const ALPHA = 0.05;
    const CELL = 110;
    const S = 28;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }

    const icons = [
      function gear(ctx) {
        const teeth = 8;
        const R = S / 2;
        const r = R * 0.65;
        const ir = R * 0.38;
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
          const a0 = (i / teeth) * Math.PI * 2;
          const a1 = ((i + 0.35) / teeth) * Math.PI * 2;
          const a2 = ((i + 0.65) / teeth) * Math.PI * 2;
          const a3 = ((i + 1) / teeth) * Math.PI * 2;
          if (i === 0) ctx.moveTo(Math.cos(a0) * r, Math.sin(a0) * r);
          ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
          ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R);
          ctx.lineTo(Math.cos(a2) * R, Math.sin(a2) * R);
          ctx.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
          ctx.lineTo(Math.cos(a3) * r, Math.sin(a3) * r);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, ir, 0, Math.PI * 2);
        ctx.stroke();
      },
      function laptop(ctx) {
        const w = S * 0.85;
        const h = S * 0.55;
        ctx.strokeRect(-w / 2, -h / 2, w, h);
        ctx.beginPath();
        ctx.moveTo(-w / 2, h / 2);
        ctx.lineTo(-w / 2 - 4, h / 2 + 5);
        ctx.lineTo(w / 2 + 4, h / 2 + 5);
        ctx.lineTo(w / 2, h / 2);
        ctx.stroke();
      },
      function car(ctx) {
        const bw = S * 0.9;
        const bh = S * 0.28;
        const by = S * 0.08;
        ctx.beginPath();
        ctx.moveTo(-bw / 2, by);
        ctx.lineTo(-bw / 2, by - bh);
        ctx.lineTo(-bw * 0.28, by - bh - S * 0.22);
        ctx.lineTo(bw * 0.18, by - bh - S * 0.22);
        ctx.lineTo(bw / 2, by - bh);
        ctx.lineTo(bw / 2, by);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-bw * 0.3, by + S * 0.07, S * 0.14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bw * 0.3, by + S * 0.07, S * 0.14, 0, Math.PI * 2);
        ctx.stroke();
      },
      function energy(ctx) {
        ctx.beginPath();
        ctx.moveTo(-S * 0.18, -S * 0.48);
        ctx.lineTo(-S * 0.28, 0);
        ctx.lineTo(-S * 0.02, 0);
        ctx.lineTo(-S * 0.18, S * 0.48);
        ctx.lineTo(S * 0.28, 0);
        ctx.lineTo(S * 0.02, 0);
        ctx.closePath();
        ctx.stroke();
      },
      function building(ctx) {
        const bw = S * 0.65;
        const bh = S * 0.7;
        const bx = -bw / 2;
        const by = S * 0.38 - bh;
        ctx.strokeRect(bx, by, bw, bh);
        const ww = bw * 0.22;
        const wh = bh * 0.16;
        const gap = bw * 0.14;
        for (let r = 0; r < 2; r++)
          for (let c = 0; c < 2; c++)
            ctx.strokeRect(
              bx + gap + (ww + gap) * c,
              by + gap + (wh + gap * 1.2) * r,
              ww,
              wh
            );
      },
      function pen(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, S * 0.48);
        ctx.lineTo(-S * 0.22, -S * 0.1);
        ctx.lineTo(S * 0.22, -S * 0.1);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-S * 0.22, -S * 0.1);
        ctx.lineTo(-S * 0.22, -S * 0.3);
        ctx.lineTo(S * 0.22, -S * 0.3);
        ctx.lineTo(S * 0.22, -S * 0.1);
        ctx.stroke();
      },
    ];

    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = C;
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = ALPHA;

      const cols = Math.ceil(canvas.width / CELL) + 1;
      const rows = Math.ceil(canvas.height / CELL) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * 3 + col) % icons.length;
          const offX = row % 2 === 0 ? 0 : CELL * 0.5;
          ctx.save();
          ctx.translate(col * CELL + offX, row * CELL);
          icons[idx](ctx);
          ctx.restore();
        }
      }
    }

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bg-icons-canvas"
      style={{
        position: 'fixed',
        inset: '64px 0 0 0',
        width: '100%',
        height: 'calc(100vh - 64px)',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
