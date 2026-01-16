import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sign1 from "../assets/Pandey.png";
import sign2 from "../assets/Mishra.png";

export default function Certificate() {
  const navigate = useNavigate();
  const location = useLocation();
  const certificateRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const certificateType = location.state?.type || "frontend";
  const certificateLevel = location.state?.level || "beginner";

  const testNameMap = {
    webdev: "Web Development Test",
    appdev: "Mobile App Development Test",
    datascience: "Data Science Test",
    cyber: "Cyber Security Test",
    core: "Core CSE Test",
    aiml: "AI & Machine Learning Test",
  };

  const testName = testNameMap[certificateType] || "Skill Test";

  const levelConfig = {
    beginner: { stars: 1, label: "Beginner Level" },
    intermediate: { stars: 2, label: "Intermediate Level" },
    advanced: { stars: 3, label: "Advanced Level" },
  };

  const { stars, label } = levelConfig[certificateLevel];
  const renderStars = () => "⭐".repeat(stars);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px", "a4");

    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(`${user?.name || "Student"}_${testName}_${label}.pdf`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950 flex justify-center items-center px-4 py-10">
        <div
          ref={certificateRef}
          className="w-full max-w-4xl bg-white rounded-3xl border-[8px] border-amber-400 p-6 sm:p-10 text-center shadow-2xl"
        >
          <p className="tracking-widest text-amber-600 font-bold text-xs sm:text-sm">
            SKILL PROOF
          </p>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2">
            Certificate of Excellence
          </h1>

          <p className="uppercase text-[10px] sm:text-xs tracking-widest text-gray-500 mt-3">
            This is proudly presented to
          </p>

          <h2 className="mt-4 text-xl sm:text-3xl font-semibold text-slate-950">
            {user?.name || "Student Name"}
          </h2>

          <div className="text-lg sm:text-2xl mt-2">{renderStars()}</div>
          <p className="font-semibold text-gray-600 text-sm sm:text-base">
            {label}
          </p>

          <p className="mt-6 text-sm sm:text-lg">
            For successfully completing the
          </p>

          <p className="text-lg sm:text-2xl font-bold text-blue-700">
            {testName}
          </p>

          {/* FOOTER */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-6 text-sm text-gray-700">
            <div className="text-center sm:text-left">
              
              
              <p className="sm:mt-19 mt-10 font-bold">Harsh Pandey</p>
              <p className="text-xs">CEO, Skill Proof</p>

              <img
                src={sign1}
                alt="Harsh Pandey"
                className="mx-auto sm:mr-7  w-18"
              />
              <p className="sm:mt-5 font-semibold">Issued on</p>
              <p>{new Date().toDateString()}</p>

            </div>

            <div className="text-center sm:text-right sm:mt-21">
              
              <p className="font-bold">Ayush Mishra</p>
              <p className="text-xs">
                Shareholder / Owner of Skill Proof
              </p>
              <img
                src={sign2}
                alt="Ayush Mishra"
                className="mx-auto sm:ml-14 w-32 mb-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 pb-10 flex-wrap">
        <button
          onClick={downloadCertificate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold text-white"
        >
          Download Certificate 📄
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 font-bold text-white"
        >
          Go to Home
        </button>
      </div>

      <Footer />
    </>
  );
}
