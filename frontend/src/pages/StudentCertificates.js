import React from "react";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

/*
  Professional Certificate Page
*/

function StudentCertificates(){

  const certificates = [
    {
      title: "Hackathon Winner",
      file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "pdf",
      verified: true
    },
    {
      title: "Seminar Participation",
      file: "https://picsum.photos/300/200",
      type: "image",
      verified: true
    }
  ];

  return(

    <div className="dashboard">

      <StudentSidebar/>

      <div className="main">

        <Header/>

        <div className="content">

          {/* Title */}
          <div className="page-title">
            My Certificates
          </div>

          {/* Horizontal Preview */}
          <div className="cert-preview-row">
            {certificates.map((cert, index) => (
              <div className="preview-item" key={index}>
                {cert.type === "pdf" ? "📄" : "🖼️"}
              </div>
            ))}
          </div>

          {/* Certificate Grid */}
          <div className="cert-grid">

            {certificates.map((cert, index) => (

              <div className="cert-card" key={index}>

                {/* Preview */}
                {cert.type === "pdf" ? (
                  <div className="pdf-box">📄 PDF Certificate</div>
                ) : (
                  <img src={cert.file} alt="certificate" />
                )}

                {/* Title */}
                <p className="cert-title">{cert.title}</p>

                {/* Status */}
                {cert.verified && (
                  <span className="cert-badge">✔ Verified</span>
                )}

                {/* Actions */}
                <div className="cert-actions">

                  <a href={cert.file} target="_blank" rel="noreferrer">
                    View
                  </a>

                  <a href={cert.file} download>
                    Download
                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )
}

export default StudentCertificates;