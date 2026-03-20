import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Crown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ================= ROBOTIC BACKGROUND LIGHT =================
function RoboticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (isMobile ? 1.5 : 3) + (isMobile ? 0.5 : 1.5);
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * (isMobile ? 0.3 : 0.5) + 0.3;
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
        ctx.fillStyle = `rgba(34,211,238,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = isMobile ? 40 : 160;
    const particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" style={{ background: "radial-gradient(circle at center, #020617, #000000)" }} />;
}

// ================= SELECT LEVEL =================
export default function SelectLevel() {
  const navigate = useNavigate();
  const location = useLocation();
  const track = location.state?.track;

  if (!track) return <div className="min-h-screen flex items-center justify-center text-red-500">Invalid track selected</div>;

  const handleLevelSelect = (level) => navigate(`/test/${track}/${level}`);

  const levels = [
    { id: "Beginner", icon: <Shield size={20} />, title: "Beginner", desc: "Basics & fundamentals.", color: "from-emerald-400 to-green-500" },
    { id: "Intermediate", icon: <TrendingUp size={20} />, title: "Intermediate", desc: "Practical & real scenarios.", color: "from-cyan-400 to-blue-500" },
    { id: "Advanced", icon: <Crown size={20} />, title: "Advanced", desc: "Expert-level challenges.", color: "from-fuchsia-400 to-pink-500" },
  ];

  return (
    <>
      <RoboticBackground />
      <div className="relative z-10 min-h-screen overflow-hidden text-white">
        <Navbar />
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
            Select Your <span className="text-emerald-400">Level</span>
          </motion.h1>
          <p className="text-center text-gray-400 mt-2 text-sm sm:text-base">
            Track: <span className="text-white font-semibold">{track}</span>
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {levels.map((lvl) => (
              <motion.div
                key={lvl.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleLevelSelect(lvl.id.toLowerCase())}
                className="cursor-pointer relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-md group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${lvl.color} opacity-15 group-hover:opacity-25 transition`} />
                <div className="relative z-10 p-4 sm:p-5 text-center">
                  <div className={`mx-auto mb-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${lvl.color} text-black`}>
                    {lvl.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{lvl.title}</h3>
                  <p className="text-gray-400 mt-1 text-xs sm:text-sm">{lvl.desc}</p>
                  <div className="mt-4 inline-block rounded-full px-3 py-1 bg-white/10 text-xs text-gray-300">Click to start</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
       
      </div>
       <Footer />
    </>
  );
}