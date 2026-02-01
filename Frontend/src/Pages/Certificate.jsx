import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import skillSign from "../skillproof.png";

export default function Certificate() {
  const navigate = useNavigate();
  const location = useLocation();
  const certificateRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const certificateType = location.state?.type || "webdev";
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

  // ================= FINAL OPTIMIZED DOWNLOAD =================
  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2.2, // sharpness
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.85); // size control

    const pdf = new jsPDF("portrait", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
    pdf.save("certificate.pdf");
  };

  return (
    <>
      <Navbar />

      <style>{`
        .certificate-wrapper {
          display: flex;
          justify-content: center;
          padding: 20px;
          background: #0f172a;
          overflow-x: auto;
        }

        .certificate-a4 {
          width: 794px;
          height: 1123px;
          background: white;
          border-radius: 24px;
          border: 10px solid #f59e0b;
          padding: 48px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
  .certificate-a4 {
    transform: scale(0.48);
    transform-origin: top center;
    margin-top: 60px;
  }
}


        .subtitle {
          letter-spacing: 4px;
          color: #d97706;
          font-weight: bold;
          font-size: 14px;
        }

        .title {
          font-size: 36px;
          font-weight: 800;
          margin-top: 8px;
        }

        .name {
          font-size: 32px;
          font-weight: 700;
          margin-top: 160px;
        }

        .test {
          font-size: 26px;
          font-weight: 700;
          color: #1d4ed8;
          margin-top: 10px;
        }

        .signature-box {
          text-align: right;
          margin-top: 40px;
        }

        .signature-box img {
          width: 140px;
        }

        .footer-btns {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding-bottom: 30px;
          background: #0f172a;
        }

        .btn {
          padding: 14px 22px;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        .btn-download {
          background: #16a34a;
        }

        .btn-home {
          background: #2563eb;
        }
      `}</style>

      <div className="footer-btns">
        <button className="btn btn-download" onClick={downloadCertificate}>
          Download Certificate
        </button>
        <button className="btn btn-home" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>

      <div className="certificate-wrapper">
        <div ref={certificateRef} className="certificate-a4">
          <div>
            <div className="subtitle">SKILL PROOF</div>
            <div className="title">Certificate of Excellence</div>

            <p style={{ marginTop: "18px", letterSpacing: "3px" }}>
              THIS IS PROUDLY PRESENTED TO
            </p>

            <div className="name">
              {user?.name || "Student Name"}
            </div>

            <div style={{ fontSize: "26px", marginTop: "8px" }}>
              {renderStars()}
            </div>

            <p style={{ fontWeight: "600" }}>{label}</p>

            <p style={{ marginTop: "22px", fontSize: "18px" }}>
              For successfully completing the
            </p>

            <div className="test">{testName}</div>
          </div>

          <div className="signature-box">
            <img src={skillSign} alt="Skill Proof Signature" />
            <div style={{ fontWeight: "bold" }}>Skill Proof</div>
            <div style={{ fontSize: "12px" }}>Authorized Signature</div>
            <div style={{ fontSize: "12px" }}>
              Issued on: {new Date().toDateString()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
