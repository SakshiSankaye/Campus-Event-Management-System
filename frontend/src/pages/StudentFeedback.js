import React, { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

/*
  Student Feedback Page
*/

function StudentFeedback(){

  const [rating, setRating] = useState(0);
  const [event, setEvent] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");

  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = () => {
    if(!event) return alert("Select event");

    const newFeedback = {
      event,
      rating,
      experience,
      message
    };

    setFeedbackList([...feedbackList, newFeedback]);

    // reset
    setEvent("");
    setRating(0);
    setExperience("");
    setMessage("");
  };

  return(

    <div className="dashboard">

      <StudentSidebar/>

      <div className="main">

        <Header/>

        <div className="content">

          {/* Title */}
          <div className="page-title">
            Event Feedback
          </div>

          {/* ===== FORM ===== */}
          <div className="feedback-box">

            {/* Event Select */}
            <select 
              value={event} 
              onChange={(e)=>setEvent(e.target.value)}
            >
              <option value="">Select Event</option>
              <option>Hackathon</option>
              <option>Seminar</option>
              <option>Tech Fest</option>
            </select>

            {/* Star Rating */}
            <div className="rating-box">
              {[1,2,3,4,5].map((star)=>(
                <span 
                  key={star}
                  className={star <= rating ? "star active" : "star"}
                  onClick={()=>setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Experience */}
            <select 
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
            >
              <option value="">Overall Experience</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>

            {/* Message */}
            <textarea
              placeholder="Write your feedback..."
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            />

            {/* Submit */}
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Feedback
            </button>

          </div>

          {/* ===== HISTORY ===== */}
          <div className="feedback-history">

            <h3>Previous Feedback</h3>

            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Rating</th>
                  <th>Experience</th>
                </tr>
              </thead>

              <tbody>
                {feedbackList.map((f, i)=>(
                  <tr key={i}>
                    <td>{f.event}</td>
                    <td>{"★".repeat(f.rating)}</td>
                    <td>{f.experience}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  )
}

export default StudentFeedback;