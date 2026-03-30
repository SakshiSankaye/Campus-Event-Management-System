import React, { useEffect, useState } from "react"
import Student_Sidebar from "../components/StudentSidebar"
import Header from "../components/Header"
import "../styles/dashboard.css"
import axios from "axios"

function StudentDashboard(){

const user = JSON.parse(localStorage.getItem("user"))

const [events,setEvents] = useState([])

// LOAD EVENTS
useEffect(()=>{
loadEvents()
},[])

const loadEvents = async()=>{
try{
const res = await axios.get("http://localhost:5000/api/events")
setEvents(res.data)
}catch(err){
console.log(err)
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
"https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
]

// CALCULATIONS
const totalEvents = events.length
const registeredCount = events.filter(e => 
(e.registeredUsers || []).some(u=>u.email === user?.email)
).length

const upcoming = events.filter(e => new Date(e.date) > new Date())

return(

<div className="dashboard">

<Student_Sidebar/>

<div className="main">

<Header/>

<div className="content">

{/* 🔥 WELCOME */}
<div className="welcome-box">
Welcome {user?.name} 👋
</div>

{/* 🔥 STATS */}
<div className="stats">

<div className="card blue">
<h3>Total Events</h3>
<p>{totalEvents}</p>
</div>

<div className="card green">
<h3>Registered</h3>
<p>{registeredCount}</p>
</div>

<div className="card purple">
<h3>Upcoming</h3>
<p>{upcoming.length}</p>
</div>

</div>

{/* 🔥 EVENTS GRID */}
<div className="event-grid">

{events.map((event, index) => {

const isRegistered = (event.registeredUsers || []).some(
u => u.email === user?.email
)

return(

<div key={index} className="event-card">

<img 
src={images[index % images.length]} 
alt="event"
className="event-img"
/>

<div className="event-content">

<h3>{event.title}</h3>
<p>📅 {event.date}</p>
<p>📍 {event.location}</p>

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

{/* 🔥 REGISTERED EVENTS */}
<div className="registered-section">

<h3>My Registered Events</h3>

<table className="table">

<thead>
<tr>
<th>Event</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{events
.filter(e=> 
(e.registeredUsers || []).some(u=>u.email === user?.email)
)
.map(e=>(
<tr key={e._id}>

<td>{e.title}</td>
<td>{e.date}</td>
<td className="status">Registered</td>

<td>
<button className="view-btn">View</button>
</td>

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

export default StudentDashboard