import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Users,
  Bell,
  Search,
} from "lucide-react";
import "../styles/dashboard.css";

export default function OrganizerCreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    venue: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {
  try {
    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.startDate,   // required by schema
      createdBy: "Organizer"
    };

    await axios.post("http://localhost:5000/api/events", eventData);

    alert("Event Created Successfully!");
    navigate("/organizer-dashboard");

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed to create event");
  }
};

  return (
    <div className="ce-page">

      {/* Sidebar */}
      <aside className="ce-sidebar">
        <div>
          <div className="ce-logo">
            <div className="ce-logo-icon">✦</div>
            <div>
              <h3>EVENT HUB</h3>
              <p>PREMIUM CONCIERGE</p>
            </div>
          </div>

          <div
            className="ce-menu-item"
            onClick={() => navigate("/organizer-dashboard")}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </div>

          <div className="ce-menu-item active">
            <PlusCircle size={16} />
            Create Event
          </div>

          <div
            className="ce-menu-item"
            onClick={() => navigate("/organizer-manage-events")}
          >
            <CalendarDays size={16} />
            Manage Events
          </div>

          <div
            className="ce-menu-item"
            onClick={() => navigate("/participants")}
          >
            <Users size={16} />
            Participants
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ce-main">

        {/* Topbar */}
        <div className="ce-topbar">
          <h2>Create Event</h2>

          <div className="ce-top-right">
            <div className="ce-search">
              <Search size={14} />
              <input placeholder="Search resources..." />
            </div>

            <Bell size={16} />
            <div className="ce-avatar"></div>
          </div>
        </div>

        {/* Content */}
        <div className="ce-grid">

          {/* Left */}
          <div className="ce-left">

            <div className="ce-card">
              <h3>Event Identity</h3>
              <p>Define the core personality and details of your occasion.</p>

              <label>EVENT TITLE</label>
              <input
                name="title"
                placeholder="e.g. Annual Architecture Symposium 2024"
                onChange={handleChange}
              />

              <div className="ce-two">
                <div>
                  <label>CATEGORY</label>
                  <input
                    name="category"
                    placeholder="Exhibition"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>VENUE</label>
                  <input
                    name="venue"
                    placeholder="Search location..."
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>DESCRIPTION</label>
              <textarea
                name="description"
                placeholder="Elaborate on the event's objectives, target audience, and key highlights..."
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="ce-card">
              <h3>Timeline</h3>
              <p>Schedule the windows for your event sessions.</p>

              <div className="ce-two">
                <div>
                  <label>START DATE & TIME</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>END DATE & TIME</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="ce-right">

            <div className="ce-card small">
              <h4>VISUAL IDENTITY</h4>

              <div className="upload-box">
                Upload Event Image
              </div>

              <div className="preview-box">
                No image selected
              </div>
            </div>

            <div className="launch-card">
              <h3>Ready to Launch?</h3>
              <p>
                Ensure all mandatory details are filled to enable live registration.
              </p>

              <button onClick={handleSubmit}>
                Create Event
              </button>

              <button className="draft-btn">
                Save as Draft
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}