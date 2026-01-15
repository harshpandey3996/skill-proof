import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Crown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SelectLevel() {
  const navigate = useNavigate();
  const location = useLocation();
  const track = location.state?.track;

  // 🌊 WATER BUBBLE CURSOR EFFECT (SAFE & SMOOTH)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bubble = document.createElement("span");
      bubble.className = "water-bubble";

      bubble.style.left = e.clientX + "px";
      bubble.style.top = e.clientY + "px";

      document.body.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 800);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Invalid track selected
      </div>
    );
  }

  const handleLevelSelect = (level) => {
    navigate(`/test/${track}/${level}`);
  };

  const levels = [
    {
      id: "Beginner",
      icon: <Shield size={28} />,
      title: "Beginner",
      desc: "Basics & fundamentals. Start your journey.",
      color: "from-emerald-400 to-green-500",
    },
    {
      id: "Intermediate",
      icon: <TrendingUp size={28} />,
      title: "Intermediate",
      desc: "Practical concepts & real scenarios.",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: "Advanced",
      icon: <Crown size={28} />,
      title: "Advanced",
      desc: "Expert-level challenges & deep knowledge.",
      color: "from-fuchsia-400 to-pink-500",
    },
  ];

  return (
    <>
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-center"
        >
          Select Your <span className="text-emerald-400">Level</span>
        </motion.h1>

        <p className="text-center text-gray-400 mt-4">
          Track: <span className="text-white font-semibold">{track}</span>
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, scale: 1.03 }}
              onClick={() => handleLevelSelect(lvl.id.toLowerCase())}
              className="cursor-pointer relative rounded-3xl overflow-hidden
                         border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl group"
            >
              {/* GLOW */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${lvl.color}
                            opacity-20 group-hover:opacity-30 transition`}
              />

              <div className="relative z-10 p-8 text-center">
                <div
                  className={`mx-auto mb-6 w-16 h-16 flex items-center justify-center
                              rounded-full bg-gradient-to-br ${lvl.color} text-black`}
                >
                  {lvl.icon}
                </div>

                <h3 className="text-2xl font-bold">{lvl.title}</h3>
                <p className="text-gray-400 mt-3">{lvl.desc}</p>

                <div className="mt-8 inline-block rounded-full px-6 py-2
                                bg-white/10 text-sm text-gray-300">
                  Click to start
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
    <style>{`
      .water-bubble {
  position: fixed;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;

  background: radial-gradient(
    circle at 30% 30%,
    rgba(0, 255, 200, 0.9),
    rgba(0, 255, 200, 0.35),
    rgba(0, 255, 200, 0.05)
  );

  transform: translate(-50%, -50%);
  animation: waterRipple 0.9s ease-out forwards;
}

@keyframes waterRipple {
  0% {
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(5);
    opacity: 0;
  }
}

    `}</style>
    </>
    
  );
}
