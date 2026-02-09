import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API = import.meta.env.VITE_API_URL; // /api included in .env

function Signup({ setLogin, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setCpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // 👈 new

  const navigate = useNavigate();
  const rippleRef = useRef(null);

  // ================= WATER EFFECT =================
  useEffect(() => {
    const container = rippleRef.current;
    if (!container) return;

    let lastX = 0,
      lastY = 0,
      lastTime = 0;

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

  // ================= VALIDATION =================
  const validate = () => {
    let err = {};
    if (!name.trim()) err.name = true;
    if (!email.trim()) err.email = true;
    if (!password) err.password = true;
    if (!confirmpassword) err.confirmpassword = true;
    if (phone && phone.length !== 10) err.phone = true;

    if (password !== confirmpassword) {
      err.confirmpassword = true;
      alert("Password and Confirm Password must be same");
    }

    if (password.length > 8) {
      err.password = true;
      alert("Password max 8 characters allowed");
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SUBMIT =================
 
const submit = async (e) => {
  e.preventDefault();
  if (!validate() || loading) return;

  try {
    setLoading(true);

    const res = await axios.post(`${API}/post`, {
      name,
      email,
      password,
      confirmpassword,
      phone,
    });

    alert("User Registered Successfully!");

    setLogin(true);
    setUser(res.data);

   
    localStorage.setItem("token", "Hp3996@@HP");
    localStorage.setItem("user", JSON.stringify(res.data));

    navigate("/option");
    window.location.reload(); 
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
  <Navbar/>
    <div
      ref={rippleRef}
      className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden px-4"
    >
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-lg p-8 rounded-2xl
        bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        <div className="grid md:grid-cols-2 gap-5">
          <Input label="Name" value={name} setValue={setName} error={errors.name} />
          <Input label="Email" value={email} setValue={setEmail} error={errors.email} type="email" />
          <Input label="Password" value={password} setValue={setPassword} error={errors.password} type="password" maxLength={8} />
          <Input label="Confirm Password" value={confirmpassword} setValue={setCpassword} error={errors.confirmpassword} type="password" maxLength={8} />
          <Input
            label="Phone"
            value={phone}
            setValue={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))}
            error={errors.phone}
            type="tel"
            maxLength={10}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-8 w-full py-3 rounded-lg font-semibold
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-400"}
          text-black transition`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* 👇 YE WALA PART TERA ORIGINAL - BOTTOM LINK */}
        <p className="text-center text-gray-300 mt-5 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Login
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
    rgba(180,220,255,0.9),
    rgba(80,140,255,0.45),
    rgba(30,80,200,0.15),
    transparent 70%
  );
  animation: liquidFlow 1.2s ease-out forwards;
}
@keyframes liquidFlow {
  0% { transform: scale(0.4); opacity: 0.9; }
  40% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.2) translateY(-90px); opacity: 0; }
}
`}</style>
    </div>
        <Footer/>
    </>
    
  );
}

function Input({ label, value, setValue, error, type = "text", maxLength }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        className={`mt-1 w-full rounded-lg p-3 bg-black/40 text-white border
        ${error ? "border-red-500" : "border-white/20"}
        focus:outline-none focus:ring-2
        ${error ? "focus:ring-red-500" : "focus:ring-green-400"}`}
      />
    </div>
  );
}

export default Signup;
