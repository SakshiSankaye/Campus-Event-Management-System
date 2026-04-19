import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/studentProfile.css";

function StudentProfile() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const name =
    user.name ||
    user.email?.split("@")[0] ||
    "Student";

  const email =
    user.email || "student@email.com";

  return (
    <div className="sp-page">

      {/* Sidebar */}
      <aside className="sp-sidebar">
        <h2>Student Panel</h2>

        <div
          className="sp-link"
          onClick={() =>
            navigate("/student/dashboard")
          }
        >
          Dashboard
        </div>

        <div
          className="sp-link"
          onClick={() =>
            navigate("/student-browse-events")
          }
        >
          Browse Events
        </div>

        <div
          className="sp-link"
          onClick={() =>
            navigate("/student-my-events")
          }
        >
          My Events
        </div>

        <div className="sp-link active">
          Profile
        </div>
      </aside>

      {/* Main */}
      <main className="sp-main">
        <h1>My Profile</h1>

        <div className="profile-card">
          <div className="profile-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <h2>{name}</h2>
          <p>{email}</p>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default StudentProfile;