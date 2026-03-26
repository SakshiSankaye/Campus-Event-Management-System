import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";

function StudentSidebar(){

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

return(

<div className="sidebar">

  <div className="logo-box">
    <div className="logo-content">
      <FaBook className="logo-icon"/>
      <h3 className="logo-text">Student Dashboard</h3>
    </div>
  </div>

 <ul className="menu">

  <li onClick={()=>navigate("/student/dashboard")}>Dashboard</li>
  <li onClick={()=>navigate("/student-browse-events")}>Browse Events</li>
  <li onClick={()=>navigate("/student-my-events")}>My Events</li>
  <li onClick={()=>navigate("/student-certificates")}>Certificates</li>
  <li onClick={()=>navigate("/student-feedback")}>Feedback</li>
  <li onClick={handleLogout}>Logout</li>

</ul>

</div>

)

}

export default StudentSidebar;