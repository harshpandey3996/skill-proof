import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const rippleRef = useRef(null);

  // ================= FAST WATER FLOW EFFECT =================
  useEffect(() => {
    const container = rippleRef.current;
    if (!container) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const createWater = (x, y, speed) => {
      const drop = document.createElement("span");
      const size = Math.min(140, 60 + speed * 1.8);

      drop.style.width = `${size}px`;
      drop.style.height = `${size}px`;
      drop.style.left = `${x - size / 2}px`;
      drop.style.top = `${y - size / 2}px`;
      drop.className = "water-drop";

      container.appendChild(drop);
      setTimeout(() => drop.remove(), 1200);
    };

    const handleMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime || 16;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = (Math.sqrt(dx * dx + dy * dy) / dt) * 20;

      createWater(e.clientX, e.clientY, speed);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (res.status === 200) {
        alert("Login successful!");
        setLogin(true);
        setUser(res.data);
        localStorage.setItem("token", "Hp3996@@HP");
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid credentials or user not found!");
    }
  };

  return (
    <div
      ref={rippleRef}
      className="relative min-h-screen flex items-center justify-center
                 bg-gradient-to-br from-black via-gray-900 to-black
                 overflow-hidden px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg p-8 rounded-2xl
                   bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h1>

        <div className="grid md:grid-cols-1 gap-5">
          {[
            ["Email", email, setEmail, "email", "email"],
            ["Password", password, setPassword, "password", "password"],
          ].map(([label, value, setter, type, key]) => (
            <div key={key}>
              <label className="text-sm text-gray-300">{label}</label>
              <input
                type={type}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className={`mt-1 w-full rounded-lg p-3 bg-black/40 text-white
                          placeholder-gray-400 border border-white/20
                          focus:outline-none focus:ring-2 focus:ring-green-400`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-lg font-semibold
                     bg-green-500 text-black hover:bg-green-400 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-300 mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/sign")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </form>

      {/* ================= WATER FLOW CSS ================= */}
      <style>{`
.water-drop {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(10px);
  background: radial-gradient(
    circle at 30% 30%,
    rgba(180, 220, 255, 0.9),
    rgba(80, 140, 255, 0.45),
    rgba(30, 80, 200, 0.15),
    transparent 70%
  );
  animation: liquidFlow 1.2s ease-out forwards;
  mix-blend-mode: screen;
}

@keyframes liquidFlow {
  0% {
    transform: scale(0.4);
    opacity: 0.9;
  }
  40% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(2.2) translateY(-90px);
    opacity: 0;
  }
}
`}</style>
    </div>
  );
}

export default Login;
