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

  try {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      scrollY: -window.scrollY,

      onclone: (doc) => {
        doc.querySelectorAll("*").forEach((el) => {
          const style = doc.defaultView.getComputedStyle(el);
          if (style.color?.includes("oklch")) el.style.color = "#000";
          if (style.backgroundColor?.includes("oklch"))
            el.style.backgroundColor = "#fff";
          if (style.borderColor?.includes("oklch"))
            el.style.borderColor = "#f59e0b";
          el.style.boxShadow = "none";
          el.style.filter = "none";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20; // margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const x = 10;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("certificate.pdf");

    // ✅ SUCCESS ALERT
    alert("Your certificate has been downloaded successfully 🎉");
  } catch (error) {
    console.error("Certificate download failed:", error);

    // ⚠ ERROR ALERT
    alert(
      "Something went wrong while downloading the certificate. Please try again!"
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 flex justify-center items-center px-3 py-6">
        <div
          ref={certificateRef}
          className="w-full max-w-md sm:max-w-4xl bg-white rounded-3xl border-8 border-amber-400 p-4 sm:p-10 text-center overflow-hidden"
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

          <h2 className="mt-3 text-lg sm:text-3xl font-semibold text-black">
            {user?.name || "Student Name"}
          </h2>

          <div className="text-lg sm:text-2xl mt-2">{renderStars()}</div>

          <p className="font-semibold text-gray-700 text-sm sm:text-base">
            {label}
          </p>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg">
            For successfully completing the
          </p>

          <p className="text-base sm:text-2xl font-bold text-blue-700">
            {testName}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-8 text-black text-sm">
            <div className="text-center sm:text-left">
              <img src={sign1} className="w-20 mx-auto sm:mx-0" />
              <p className="font-bold mt-2">Harsh Pandey</p>
              <p className="text-xs">CEO, Skill Proof</p>
            </div>

            <div className="text-center sm:text-right">
              <img src={sign2} className="w-24 mx-auto sm:ml-auto" />
              <p className="font-bold mt-2">Ayush Mishra</p>
              <p className="text-xs">Shareholder / Owner</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-black">
            Issued on: {new Date().toDateString()}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 pb-6">
        <button
          onClick={downloadCertificate}
          className="px-5 py-3 rounded-xl bg-green-600 font-bold text-white"
        >
          Download Certificate
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 rounded-xl bg-blue-600 font-bold text-white"
        >
          Go Home
        </button>
      </div>

      <Footer />
    </>
  );
}
