import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function History() {
  const [history, setHistory] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      try {
        const res = await axios.get(`${API}/history/${user.email}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold text-center mb-8">Your Test History</h1>

        {history.length === 0 ? (
          <p className="text-center text-gray-400">
            You have not attempted any tests yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-lg border border-white/10"
              >
                <h2 className="text-xl font-semibold capitalize">
                  {item.track} - {item.level}
                </h2>
                <p className="text-gray-400 mt-2">
                  Score: {item.score} / {item.total}
                </p>
                <p className="text-gray-500 mt-1 text-sm">
                  Attempted on: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}