import React, { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header({ search, setSearch }) {

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();   // ✅ FIX ADDED

  return (

    <div className="header">

      {/* Search */}
      <input
        className="search"
        placeholder="Search events..."
        value={search || ""}
        onChange={(e) => {
          if (setSearch) {
            setSearch(e.target.value);
          }
        }}
      />

      {/* Icons */}
      <div className="icons">

        {/* 🔔 Notification */}
        <div className="icon-box">
          <FaBell onClick={() => {
            setShowNotif(!showNotif);
            setShowProfile(false);
          }}/>

          {showNotif && (
            <div className="dropdown">
              <p>🎉 New event: Hackathon</p>
              <p>📢 Seminar updated</p>
              <p>🏆 Certificate added</p>
            </div>
          )}
        </div>

        {/* 👤 Profile */}
        <div className="icon-box">
          <FaUser onClick={() => {
            setShowProfile(!showProfile);
            setShowNotif(false);
          }}/>

          {showProfile && (
            <div className="dropdown">
              <p onClick={()=>navigate("/student-profile")}>My Profile</p>
              <p onClick={()=>navigate("/student-settings")}>Settings</p>
              <p style={{color:"red"}} onClick={()=>{
                localStorage.clear();
                navigate("/");
              }}>
                Logout
              </p>
            </div>
          )}
        </div>

      </div>

    </div>

  );
}

export default Header;