import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Certificate from "./Certificate";

const DownloadCertificate = () => {
  const userName = "Ayush Mishra";
  const testName = "Backend Development Test";
  const date = new Date().toLocaleDateString();

  const downloadPDF = async () => {
    const cert = document.getElementById("certificate");

    const canvas = await html2canvas(cert, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
    pdf.save(`${userName}-Certificate.pdf`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Certificate
        name={userName}
        testName={testName}
        date={date}
      />

      <button
        onClick={downloadPDF}
        style={{
          marginTop: "30px",
          padding: "14px 40px",
          fontSize: "18px",
          borderRadius: "8px",
          border: "none",
          background: "#b08d57",
          color: "white",
          cursor: "pointer",
        }}
      >
        Download Certificate (PDF)
      </button>
    </div>
  );
};

export default DownloadCertificate;
