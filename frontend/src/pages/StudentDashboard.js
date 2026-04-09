import React, { useEffect, useState } from "react"
import Student_Sidebar from "../components/StudentSidebar"
import Header from "../components/Header"
import "../styles/dashboard.css"
import axios from "axios"

function StudentDashboard(){

const user = JSON.parse(localStorage.getItem("user"))

// ✅ STATES
const [events,setEvents] = useState([])
const [search,setSearch] = useState("")
const [loading,setLoading] = useState(true)

// LOAD EVENTS
useEffect(()=>{
loadEvents()
},[])

const loadEvents = async()=>{
try{
setLoading(true)
const res = await axios.get("http://localhost:5000/api/events")
setEvents(res.data)
setLoading(false)
}catch(err){
console.log(err)
setLoading(false)
}
}

// REGISTER EVENT
const registerEvent = async(id)=>{
try{
await axios.post(`http://localhost:5000/api/events/${id}/register`,{
name:user?.name,
email:user?.email
})
alert("Registered Successfully")
loadEvents()
}catch(err){
console.log(err)
}
}

// SAMPLE IMAGES
const images = [
"https://images.unsplash.com/photo-1523580494863-6f3031224c94",
"https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
"https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
"https://images.unsplash.com/photo-1519389950473-47ba0277781c"
]

// CALCULATIONS
const totalEvents = events.length

const registeredCount = events.filter(e => 
(e.registeredUsers || []).some(u=>u.email === user?.email)
).length

const upcoming = events.filter(e => new Date(e.date) > new Date())

// ✅ SEARCH FILTER
const filteredEvents = events.filter(e =>
e.title?.toLowerCase().includes(search.toLowerCase())
)

// STATUS
const getStatus = (date)=>{
return new Date(date) > new Date() ? "Upcoming" : "Live"
}

return(

<div className="dashboard">

<Student_Sidebar/>

<div className="main">

{/* ✅ HEADER WITH SEARCH */}
<Header search={search} setSearch={setSearch}/>

<div className="content">

{/* HEADER */}
<h2 className="dash-title">Dashboard</h2>
<p className="dash-sub">Welcome back, {user?.name} 👋</p>

{/* STATS */}
<div className="stats-modern">

<div className="stat-box blue">
<h2>{registeredCount}</h2>
<p>Registered Events</p>
</div>

<div className="stat-box purple">
<h2>{totalEvents}</h2>
<p>Available Events</p>
</div>

<div className="stat-box orange">
<h2>{upcoming.length}</h2>
<p>Upcoming Events</p>
</div>

<div className="stat-box green">
<h2>{registeredCount * 2}</h2>
<p>Certificates</p>
</div>

</div>

{/* EVENTS */}
<div className="section-title">
<h3>Events</h3>
<span>View All</span>
</div>

{/* ✅ LOADING */}
{loading ? (
<div className="event-grid">
{[1,2,3].map(i=>(
<div key={i} className="skeleton"></div>
))}
</div>
) : filteredEvents.length === 0 ? (

/* ✅ EMPTY STATE */
<div style={{textAlign:"center", marginTop:"20px"}}>
<h3>No events found 😔</h3>
<p>Try searching something else</p>
</div>

) : (

<div className="event-grid">

{filteredEvents.slice(0,6).map((event,index)=>{

const isRegistered = (event.registeredUsers || []).some(
u => u.email === user?.email
)

return(

<div key={index} className="event-card-modern">

<img 
src={images[index % images.length]} 
className="event-img"
/>

<div className="event-body">

<span className="tag">
{["Tech","Design","Business"][index % 3]}
</span>

{/* ✅ STATUS */}
<span className={`status ${getStatus(event.date)}`}>
{getStatus(event.date)}
</span>

<h4>{event.title}</h4>

<p>📅 {event.date}</p>
<p>📍 {event.location}</p>

<p style={{fontSize:"12px", color:"#999"}}>
{Math.max(1, Math.ceil((new Date(event.date)-new Date())/(1000*60*60*24)))} days left
</p>

<button
onClick={()=>registerEvent(event._id)}
disabled={isRegistered}
className={isRegistered ? "btn-disabled" : "btn-primary"}
>
{isRegistered ? "Registered" : "Register"}
</button>

</div>

</div>

)

})}

</div>
)}

{/* BOTTOM SECTION */}
<div className="bottom-section">

<div className="activity-box">
<h3>Recent Activity</h3>
<ul>
<li>✔ Registered for Hackathon</li>
<li>🏆 Earned certificate</li>
<li>📌 Bookmarked event</li>
</ul>
</div>

<div className="recommend-box">
<h3>Recommended For You</h3>
<p>AI & Machine Learning Workshop</p>
<button className="explore-btn">Explore More</button>
</div>

</div>

</div>

</div>

</div>

)

}

export default StudentDashboard