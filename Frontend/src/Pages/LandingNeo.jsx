import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NeoPageOne } from "./PageOne";
import { NeoPageTwo } from "./PageTwo";
import { NeoPageThree } from "./PageThree";
import RoboticBackground from "./RoboticBackground";
import AiPage from "./Aipage";

const TRACK_ROUTES = {
  Web_Development: "/webdev-task",
  "AI/ML": "/ml-task",
  "Cyber Security": "/cyber-task",
  "Data Science": "/ds-task",
};

export default function LandingNeo() {
  const navigate = useNavigate();

  // 🔐 AUTH CHECK
  const isLoggedIn = () => {
    return localStorage.getItem("token");
  };

  const handleCTA = () => {
    navigate(isLoggedIn() ? "/option" : "/login");
  };

  const handleTrackClick = (route) => {
    if (isLoggedIn()) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        
        {/* 🤖 ROBOTIC BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <RoboticBackground/>
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-10" />

        {/* CONTENT */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Prove Skills that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Shine
            </span>
          </h1>

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
          </div>
        </div>
      </section>

      {/* POPULAR TRACKS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Popular Tracks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(TRACK_ROUTES).map((track, idx) => (
            <div
              key={idx}
              onClick={() => handleTrackClick(TRACK_ROUTES[track])}
              className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 hover:scale-105 transition"
            >
              <div className="p-6 bg-black/50 backdrop-blur">
                <h3 className="font-semibold">{track}</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Hands-on challenges
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NeoPageOne />
      <NeoPageTwo />
      <NeoPageThree />
      <AiPage/>

      <Footer />
    </div>
  );
}