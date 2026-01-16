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

  // 🔥 TAILWIND v4 SAFE PDF GENERATION
  const downloadCertificate = async () => {
  if (!certificateRef.current) return;

  const canvas = await html2canvas(certificateRef.current, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,

    // 🔥 THIS IS THE REAL FIX
    onclone: (clonedDoc) => {
      const all = clonedDoc.querySelectorAll("*");

      all.forEach((el) => {
        const style = clonedDoc.defaultView.getComputedStyle(el);

        // color
        if (style.color.includes("oklch")) {
          el.style.color = "#000000";
        }

        // background
        if (style.backgroundColor.includes("oklch")) {
          el.style.backgroundColor = "#ffffff";
        }

        // border
        if (style.borderColor.includes("oklch")) {
          el.style.borderColor = "#fbbf24";
        }

        el.style.boxShadow = "none";
        el.style.filter = "none";
      });

      // 🔒 BODY SAFE
      clonedDoc.body.style.background = "#ffffff";
      clonedDoc.body.style.color = "#000000";
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("portrait", "px", "a4");

  const w = pdf.internal.pageSize.getWidth();
  const h = (canvas.height * w) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, w, h);
  pdf.save("certificate.pdf");
};

  return (
    <>
      <Navbar />

      {/* UI = Tailwind (allowed) */}
      <div className="min-h-screen bg-slate-900 flex justify-center items-center px-3 py-6">
        <div
          ref={certificateRef}
          className="w-full max-w-md sm:max-w-4xl bg-white rounded-2xl sm:rounded-3xl border-[6px] sm:border-[8px] border-amber-400 p-4 sm:p-10 text-center"
        >
          <p className="tracking-widest text-amber-600 font-bold text-xs sm:text-sm">
            SKILL PROOF
          </p>

          <h1 className="text-xl sm:text-4xl font-bold text-black mt-2">
            Certificate of Excellence
          </h1>

          <p className="uppercase text-[10px] sm:text-xs tracking-widest text-gray-600 mt-3">
            This is proudly presented to
          </p>

          <h2 className="mt-3 text-lg sm:text-3xl font-semibold text-black break-words">
            {user?.name || "Student Name"}
          </h2>

          <div className="text-lg sm:text-2xl mt-2">{renderStars()}</div>

          <p className="font-semibold text-gray-700 text-sm sm:text-base">
            {label}
          </p>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg">
            For successfully completing the
          </p>

          <p className="text-base sm:text-2xl font-bold text-blue-700 break-words px-2">
            {testName}
          </p>

          {/* FOOTER */}
<div className="mt-8  text-black text-xs sm:text-sm">

  {/* SIGNATURES */}
  <div className="flex flex-col sm:flex-row justify-between gap-8">
    
    {/* LEFT / CEO */}
    <div className="text-center sm:mt-18  sm:text-left">
      <p className="font-bold mt-5">Harsh Pandey</p>
      <p className="text-xs mb-2">CEO, Skill Proof</p>
      <img
        src={sign1}
        alt="Harsh Pandey"
        className="w-20 sm:w-20 mx-auto sm:mx-0"
      />
    </div>

    {/* RIGHT / SHAREHOLDER */}
    <div className="text-center sm:text-right sm:mt-25">
      <p className="font-bold">Ayush Mishra</p>
      <p className="text-xs mb-2">Shareholder / Owner</p>
      <img
        src={sign2}
        alt="Ayush Mishra"
        className="w-24 sm:w-23 mx-auto sm:ml-10"
      />
    </div>
  </div>

  {/* ISSUED DATE */}
  <div className="mt-6 text-center sm:text-left">
    <p className="text-xs">
      Issued on: {new Date().toDateString()}
    </p>
  </div>

</div>

        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-3 pb-6 flex-wrap">
        <button
          onClick={downloadCertificate}
          className="px-5 py-3 rounded-xl bg-green-600 font-bold text-white"
        >
          Download Certificate 📄
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 rounded-xl bg-blue-600 font-bold text-white"
        >
          Go to Home
        </button>
      </div>

      <Footer />
    </>
  );
}
