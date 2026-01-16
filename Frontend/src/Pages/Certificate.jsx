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

  const testName =
    certificateType === "webdev"
      ? "Web Development Test"
      : certificateType === "appdev"
      ? "Mobile App Development Test"
      : certificateType === "datascience"
      ? "Data Science Test"
      : certificateType === "cyber"
      ? "Cyber Security Test"
      : certificateType === "core"
      ? "Core CSE Test"
      : certificateType === "aiml"
      ? "AI & Machine Learning Test"
      : "Skill Test";

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

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #020617, #1e293b, #020617)",
          padding: "40px 16px",
        }}
      >
        <div
          ref={certificateRef}
          style={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            border: "8px solid #c9a44c",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontWeight: "700", letterSpacing: "2px", color: "#b45309", marginBottom: "12px" }}>
            SKILL PROOF
          </div>

          <h1 style={{ fontSize: "40px", marginBottom: "12px", color: "#0f172a" }}>
            Certificate of Excellence
          </h1>

          <p style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", color: "#555" }}>
            This is proudly presented to
          </p>

          <h2 style={{ marginTop: "20px", fontSize: "32px", color: "#020617" }}>
            {user?.name || "Student Name"}
          </h2>

          <div style={{ fontSize: "26px", marginTop: "10px" }}>
            {renderStars()}
          </div>

          <p style={{ marginTop: "6px", fontWeight: "600", color: "#666" }}>{label}</p>

          <p style={{ marginTop: "24px", fontSize: "18px" }}>
            For successfully completing the
          </p>

          <p style={{ fontSize: "22px", fontWeight: "700", color: "#1e3a8a" }}>
            {testName}
          </p>

          {/* Footer */}
          <div style={{ marginTop: "50px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "#444" }}>
            <div style={{ textAlign: "left" }}>
              <strong>Date</strong>
              <div>{new Date().toDateString()}</div>
             
              <div style={{ fontWeight: "700" }}>Harsh Pandey</div>
              <div style={{ fontSize: "12px" }}>CEO, Skill Proof</div>
               <img src={sign1} alt="Harsh Pandey" style={{ width: "110px", height: "50px" , margin: "3px"}} />
            </div>

            <div style={{ textAlign: "right" }}>
              
              <div style={{ fontWeight: "700" }}>Ayush Mishra</div>
              <div style={{ fontSize: "12px" }}>Shareholder/Owner of Skill Proof</div>
              <img src={sign2} alt="Ayush Mishra" style={{ width: "130px", height: "60px" , marginLeft:"30px" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", paddingBottom: "40px" }}>
        <button onClick={downloadCertificate} style={{ padding: "12px 24px", borderRadius: "10px", background: "linear-gradient(135deg,#22c55e,#16a34a)", fontWeight: "700", border: "none", cursor: "pointer" }}>
          Download Certificate 📄
        </button>

        <button onClick={() => navigate("/")} style={{ padding: "12px 24px", borderRadius: "10px", background: "linear-gradient(135deg,#60a5fa,#2563eb)", fontWeight: "700", border: "none", cursor: "pointer" }}>
          Go to Home
        </button>
      </div>

      <Footer />
    </>
  );
}
