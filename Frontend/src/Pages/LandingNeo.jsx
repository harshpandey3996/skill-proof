import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NeoPageOne } from "./PageOne";
import { NeoPageTwo } from "./PageTwo";
import { NeoPageThree } from "./PageThree";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
];

// 🔥 Track → Route mapping
const TRACK_ROUTES = {
  Web_Development: "/webdev-task",
  "AI/ML": "/ml-task",
  "Cyber Security": "/cyber-task",
  "Data Science": "/ds-task",
};

export default function LandingNeo() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % HERO_IMAGES.length),
      2200
    );
    return () => clearInterval(t);
  }, []);

  const handleCTA = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/option" : "/login");
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh]">
        <AnimatePresence>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[i]})` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-extrabold"
          >
            Prove Skills that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Shine
            </span>
          </motion.h1>

          <p className="mt-5 max-w-xl text-gray-300">
            Real challenges. Verifiable results. Certificates that recruiters
            respect.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleCTA}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-4 font-semibold text-black hover:scale-105 transition"
            >
              Get Verified Free <ArrowRight />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <Sparkles /> 3k+ learners
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="-mt-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Zap />, title: "Real-world tests", desc: "Practical scenarios only" },
          { icon: <ShieldCheck />, title: "Verified proof", desc: "Shareable certificates" },
          { icon: <Sparkles />, title: "Fast growth", desc: "Track & improve" },
        ].map((c, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-6"
          >
            <div className="text-emerald-400 mb-2">{c.icon}</div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-400">{c.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= POPULAR TRACKS (CLICKABLE) ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Popular Tracks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(TRACK_ROUTES).map((track, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(TRACK_ROUTES[track])}
              className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20"
            >
              <div className="p-6 bg-black/50 backdrop-blur">
                <h3 className="font-semibold">{track}</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Hands-on challenges
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <NeoPageOne />
      <NeoPageTwo />
      <NeoPageThree />

      <Footer />
    </div>
  );
}
