import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import RoboticBackground from "../Pages/RoboticBackground";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const email = user?.email;

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/history/${email}`);
        setHistory(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [email]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white relative">
        <RoboticBackground />
        <h2 className="z-10 text-xl animate-pulse">⏳ Loading history...</h2>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 BACKGROUND */}
      <RoboticBackground />

      <div className="relative z-10 min-h-screen text-white px-4 py-10">

        {/* Header */}
        <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            📜 Certificate History
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:scale-105 transition"
          >
            🏠 Home
          </button>
        </div>

        {/* Empty */}
        {history.length === 0 ? (
          <div className="text-center mt-20 text-gray-400">
            <p className="text-xl">😕 No certificates yet</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {history.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl hover:scale-105 transition duration-300"
              >
                <h2 className="text-xl font-bold capitalize">
                  🎯 {item.track}
                </h2>

                <p className="text-gray-300">
                  📚 Level: {item.level}
                </p>

                <p className="text-gray-400 text-sm">
                  📅 {new Date(item.createdAt).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    navigate("/certificate", {
                      state: {
                        type: item.track,
                        level: item.level,
                      },
                    })
                  }
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition"
                >
                  ⬇ View Certificate
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default History;
