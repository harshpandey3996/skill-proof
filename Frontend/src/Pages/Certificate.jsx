import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect } from "react";

export default function Certificate() {
  const navigate = useNavigate();
  const location = useLocation();
  const certificateRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || '{"name":"John Doe"}');
  const state = location.state || {};
  const certificateType = state.type || "webdev";
  const certificateLevel = state.level || "beginner";

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

  // ✅ FIXED PDF DOWNLOAD
  const downloadCertificate = async () => {
    const element = certificateRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3, // 🔥 high quality
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");

    const pdfWidth = 297;
    const pdfHeight = 210;

    const imgProps = pdf.getImageProperties(imgData);

    const ratio = Math.min(
      pdfWidth / imgProps.width,
      pdfHeight / imgProps.height
    );

    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("certificate.pdf");
  };


  // ================= SAVE CERTIFICATE HISTORY =================
useEffect(() => {
  const saveCertificateHistory = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData || !userData.email) return;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/save-progress`,
        {
          email: userData.email,
          track: certificateType,
          level: certificateLevel,
          score: 1,
          total: 1,
        }
      );

      console.log("✅ Certificate history saved");
    } catch (err) {
      console.log("Already saved or error ignored");
    }
  };

  saveCertificateHistory();
}, [certificateType, certificateLevel]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f1f5f9" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "15px" }}>
          <button onClick={downloadCertificate} style={btnGreen}>
            Download Certificate
          </button>

          <button onClick={() => navigate("/")} style={btnBlue}>
            Go Home
          </button>
        </div>

        {/* Certificate Wrapper */}
        <div style={{ width: "100%", maxWidth: "1000px" }}>
          
          <div
            ref={certificateRef}
            style={{
              width: "100%",
              aspectRatio: "297 / 210", // ✅ A4 ratio lock
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "4px solid #2563eb",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center" }}>
              <h1 style={heading}>CERTIFICATE</h1>
              <p style={subHeading}>OF ACHIEVEMENT</p>
            </div>

            {/* Body */}
            <div style={{ textAlign: "center" }}>
              <p style={text}>This certificate is proudly presented to</p>

              <h2 style={name}>{user.name}</h2>

              <div style={{ fontSize: "20px" }}>{renderStars()}</div>

              <h3 style={level}>{label}</h3>

              <p style={text}>
                For successfully completing <b>{testName}</b>
              </p>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
              Issued on:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// 🎨 Styles
const heading = {
  fontSize: "clamp(20px, 4vw, 32px)",
  margin: 0,
  letterSpacing: "2px",
};

const subHeading = {
  margin: "5px 0",
  color: "#555",
};

const text = {
  fontSize: "clamp(12px, 2vw, 16px)",
};

const name = {
  fontSize: "clamp(18px, 3vw, 26px)",
  borderBottom: "2px solid #ccc",
  display: "inline-block",
  padding: "5px 10px",
};

const level = {
  color: "#2563eb",
};

const btnGreen = {
  padding: "10px 16px",
  background: "#16a34a",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const btnBlue = {
  padding: "10px 16px",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};





