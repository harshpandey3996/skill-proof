import React, { useEffect, useRef } from "react";

export default function RoboticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();

    // ================= PARTICLE =================
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1.5; // bigger
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.5 + 0.6; // brighter
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#22d3ee"; // glow
        ctx.fillStyle = `rgba(34,211,238,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // ================= ROBOT =================
    class Robot {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.5;
        this.size = 50;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;

        this.angle += 0.01;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.strokeStyle = "rgba(34,211,238,0.9)";
        ctx.lineWidth = 3;

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#22d3ee";

        ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);

        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(0, -this.size);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -this.size, 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }
    }

    // ================= INIT =================
    const particles = [];
    const robots = [];

    for (let i = 0; i < 160; i++) particles.push(new Particle());
    for (let i = 0; i < 8; i++) robots.push(new Robot());

    // ================= CONNECT =================
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(34,211,238,${
              0.35 * (1 - distance / 120)
            })`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // ================= ANIMATION =================
    let animationId;

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; // darker trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();

      robots.forEach((r) => {
        r.update();
        r.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "radial-gradient(circle at center, #020617, #000000)",
      }}
    />
  );
}