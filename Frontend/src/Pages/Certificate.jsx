import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.85);
    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);
    pdf.save("certificate.pdf");
  };

  const cornerStyle = (pos) => {
    const base = {
      position: "absolute",
      width: "15%",
      height: "15%",
      background: "linear-gradient(135deg, #1e3a8a, #2563eb, #60a5fa)",
    };
    switch (pos) {
      case "tl": return { ...base, top: 0, left: 0, transform: "rotate(-45deg)" };
      case "tr": return { ...base, top: 0, right: 0, transform: "rotate(45deg)" };
      case "bl": return { ...base, bottom: 0, left: 0, transform: "rotate(45deg)" };
      case "br": return { ...base, bottom: 0, right: 0, transform: "rotate(-45deg)" };
      default: return base;
    }
  };

  // Mobile detection
  const isMobile = window.innerWidth <= 768;

  // Adjust sizes for mobile
  const fontSizes = {
    header: isMobile ? "1.8rem" : "2.3rem",
    subHeader: isMobile ? "0.85rem" : "1rem",
    body: isMobile ? "0.8rem" : "0.9rem",
    name: isMobile ? "1.4rem" : "1.7rem",
    stars: isMobile ? "0.9rem" : "1.1rem",
    label: isMobile ? "0.85rem" : "1rem",
    issueDate: isMobile ? "0.65rem" : "0.75rem",
    seal: isMobile ? "5rem" : "6.5rem",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
          <button
            style={{ padding: "0.5rem 1rem", backgroundColor: "#16a34a", color: "white", fontWeight: 600, borderRadius: "0.5rem", cursor: "pointer", minWidth: 120, flex: "1 0 auto", fontSize: "0.9rem" }}
            onClick={downloadCertificate}
          >
            Download Certificate
          </button>
          <button
            style={{ padding: "0.5rem 1rem", backgroundColor: "#2563eb", color: "white", fontWeight: 600, borderRadius: "0.5rem", cursor: "pointer", minWidth: 120, flex: "1 0 auto", fontSize: "0.9rem" }}
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>

        {/* Certificate */}
        <div style={{ width: "100%", maxWidth: 1000, display: "flex", justifyContent: "center" }}>
          <div
            ref={certificateRef}
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "1rem",
              overflow: "hidden",
              paddingTop: isMobile ? "75%" : "65%", // responsive aspect ratio
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            }}
          >
            {/* Corners */}
            {["tl","tr","bl","br"].map(pos => <div key={pos} style={cornerStyle(pos)} />)}

            {/* Borders and content */}
            <div style={{ position: "absolute", inset: "2%", border: "3px solid #cbd5e1", borderRadius: "1rem" }}>
              <div style={{ position: "absolute", inset: "1%", border: "2px solid #2563eb", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                
                {/* Header */}
                <div style={{ textAlign: "center" }}>
                  <h1 style={{ fontSize: fontSizes.header, fontFamily: "serif", letterSpacing: "0.15rem", color: "#1e293b", margin: 0 }}>CERTIFICATE</h1>
                  <h2 style={{ fontSize: fontSizes.subHeader, color: "#475569", margin: "0.25rem 0" }}>OF ACHIEVEMENT</h2>
                </div>

                {/* Body */}
                <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
                  <p style={{ fontSize: fontSizes.body, color: "#475569", marginBottom: "0.3rem" }}>This certificate is proudly presented to</p>
                  <div style={{ fontSize: fontSizes.name, fontFamily: "cursive", color: "#1e293b", borderBottom: "2px solid #cbd5e1", display: "inline-block", padding: "0.25rem 0.5rem", margin: "0.25rem auto" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: fontSizes.stars }}>{renderStars()}</div>
                  <div style={{ fontSize: fontSizes.label, fontWeight: 600, color: "#2563eb", marginBottom: "0.5rem" }}>{label}</div>
                  <p style={{ fontSize: fontSizes.body, color: "#475569", lineHeight: 1.4, maxWidth: "85%", margin: "0.25rem auto" }}>
                    For successfully completing the <strong>{testName}.</strong> 
                  </p>

                  {/* Seal */}
                  <div style={{ position: "relative", width: fontSizes.seal, height: fontSizes.seal, margin: "1.25rem auto" }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #2563eb)", border: "4px solid #facc15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "80%", height: "80%", borderRadius: "50%", border: "2px dashed white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "white", fontWeight: "700", fontSize: "0.75rem" }}>SKILL</span>
                        <span style={{ color: "white", fontWeight: "700", fontSize: "0.75rem" }}>PROOF</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue date */}
                <div style={{ textAlign: "center", fontSize: fontSizes.issueDate, color: "#475569", marginTop: "0.5rem" }}>
                  Issued on: {new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}