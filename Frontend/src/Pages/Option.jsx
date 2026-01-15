import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Option() {
  const [selected, setSelected] = useState("Frontend");
  const navigate = useNavigate();

  // 🔥 CURSOR WATER BUBBLE ANIMATION
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bubble = document.createElement("div");
      bubble.className = "cursor-bubble";

      bubble.style.left = e.clientX + "px";
      bubble.style.top = e.clientY + "px";

      document.body.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 900);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const options = [
    {
      title: "Web Development",
      route: "/webdev-task",
      img: "https://t3.ftcdn.net/jpg/02/14/53/92/360_F_214539232_YnUrtuwUEt84gHuU0qG8l7OwZvH4rnPG.jpg",
    },
    {
      title: "App Development",
      route: "/app-task",
      img: "https://tse1.mm.bing.net/th/id/OIP.nOiqIEoh5pcWAY_uRysELAHaDt?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Data Science",
      route: "/ds-task",
      img: "https://th.bing.com/th/id/OIP.oqyPRoVBH5NQR1phxOG1xAHaHa",
    },
    {
      title: "AI / Machine Learning",
      route: "/ml-task",
      img: "https://tse3.mm.bing.net/th/id/OIP.W6tTVj5LdjLXk8XAGnZ7fAHaEO?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Cyber Security",
      route: "/cyber-task",
      img: "https://cdn.pixabay.com/photo/2023/05/18/16/08/ai-generated-8002660_1280.jpg",
    },
    {
      title: "Core CSE Subjects",
      route: "/core-cse-task",
      img: "https://tse1.mm.bing.net/th/id/OIP.udiigqB7kbdmRFAN-ylqpQHaEo?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  const handleContinue = () => {
    const selectedOption = options.find((o) => o.title === selected);
    if (selectedOption) {
      navigate(selectedOption.route);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Skill Verification 🚀
          </h1>

          {/* GRID CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {options.map((item) => (
              <div
                key={item.title}
                onClick={() => setSelected(item.title)}
                className={`group cursor-pointer relative rounded-3xl p-6 flex flex-col items-center text-center
                  transition-all duration-300 overflow-hidden
                  ${
                    selected === item.title
                      ? "scale-105 border border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                      : "border border-white/10 bg-white/5 hover:scale-105 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                  }`}
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 mb-5 rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* TITLE */}
                <h2 className="text-xl font-semibold tracking-wide">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Skill Assessment
                </p>

                {/* CARD GLOW OVERLAY */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition
                                bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* CONTINUE BUTTON */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleContinue}
              className="px-10 py-4 bg-green-500 text-black rounded-xl text-lg font-semibold hover:scale-105 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* WATER BUBBLE CSS */}
      <style>
        {`
        .cursor-bubble {
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
        `}
      </style>
    </>
  );
}
