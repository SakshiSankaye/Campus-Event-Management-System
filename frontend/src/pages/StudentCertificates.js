import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CertificateCard from "../components/CertificateCard";
import "../styles/certificates.css";

function StudentCertificates() {

  const [search, setSearch] = useState("");

  // Dummy certificate data
  const certificates = [
    {
      title: "Hackathon Winner",
      event: "National Hackathon",
      date: "March 2025",
      category: "Technical",
      verified: true,
      file: "https://via.placeholder.com/300",
      link: "https://example.com"
    },
    {
      title: "Dance Competition",
      event: "Cultural Fest",
      date: "Feb 2025",
      category: "Cultural",
      verified: false,
      file: "https://via.placeholder.com/300"
    }
  ];

  const filtered = certificates.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="dashboard">


      <div className="main">

        <Header search={search} setSearch={setSearch} />

        <div className="content">

          <div className="page-title">My Certificates</div>

          {/* Grid */}
          <div className="cert-grid">

            {filtered.length > 0 ? (
              filtered.map((cert, index) => (
                <CertificateCard key={index} cert={cert} />
              ))
            ) : (
              <div className="empty-state">
                No certificates found
              </div>
            )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default StudentCertificates;