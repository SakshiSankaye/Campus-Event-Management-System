import React, { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function StudentSettings(){

  const [name, setName] = useState("Tanishka Kadam");
  const [email, setEmail] = useState("tanishka@email.com");

  const handleSave = () => {
    alert("Settings saved (dummy)");
  };

  return(

    <div className="dashboard">

      <StudentSidebar/>

      <div className="main">

        <Header/>

        <div className="content">

          <div className="page-title">Settings</div>

          <div className="settings-card">

            <label>Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>

            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <button onClick={handleSave}>Save Changes</button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default StudentSettings;