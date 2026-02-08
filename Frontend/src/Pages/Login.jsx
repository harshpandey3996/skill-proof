import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { timeout: 20000 } // 20 sec for cold start
      );

      // Backend se real token aana chahiye
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setLogin(true);
      setUser(user);

      navigate("/option");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials or server sleeping!");
    } finally {
      setLoading(false);
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

        <div className="grid gap-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg p-3 bg-black/40 text-white
                         border border-white/20 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg p-3 bg-black/40 text-white
                         border border-white/20 focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-lg font-semibold
                     bg-green-500 text-black hover:bg-green-400 transition
                     disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
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
  0% { transform: scale(0.4); opacity: 0.9; }
  40% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.2) translateY(-90px); opacity: 0; }
}
`}</style>
    </div>
  );
}

export default Login;
