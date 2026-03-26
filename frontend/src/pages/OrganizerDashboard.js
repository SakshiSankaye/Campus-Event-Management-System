import { useEffect, useState } from "react"
import MainNavbar from "../components/MainNavbar"
import { getEvents } from "../services/adminApi"
import OrganizerSidebar from "../components/OrganizerSidebar"

function OrganizerDashboard(){

const [events,setEvents] = useState([])

useEffect(()=>{
loadEvents()
},[])

const loadEvents = async ()=>{
const data = await getEvents()
setEvents(data)
}

// Summary
const totalEvents = events.length
const upcomingEvents = events.filter(e => new Date(e.date) > new Date())
const totalParticipants = events.reduce(
  (sum,e)=> sum + (e.registeredUsers?.length || 0),0
)

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

{/* ✅ REUSABLE SIDEBAR */}
<OrganizerSidebar/>

{/* MAIN CONTENT */}
<div className="flex-1 p-8">

<div className="bg-white p-4 rounded shadow mb-6 text-center font-semibold">
Welcome, Event Organizer! Manage and monitor all your campus events here.
</div>

{/* SUMMARY */}
<div className="grid grid-cols-3 gap-6 mb-6">

<div className="bg-blue-500 text-white p-6 rounded shadow">
<h3>Total Events</h3>
<p className="text-3xl">{totalEvents}</p>
</div>

<div className="bg-green-500 text-white p-6 rounded shadow">
<h3>Upcoming Events</h3>
<p className="text-3xl">{upcomingEvents.length}</p>
</div>

<div className="bg-purple-500 text-white p-6 rounded shadow">
<h3>Participants</h3>
<p className="text-3xl">{totalParticipants}</p>
</div>

</div>

{/* UPCOMING EVENTS */}
<div className="bg-white p-6 rounded shadow mb-6">

<h3 className="font-bold mb-4">Upcoming Events</h3>

{upcomingEvents.length === 0 ? (
<p>No upcoming events</p>
) : (
upcomingEvents.map(e=>(
<div key={e._id} className="border-b py-2">
{e.title} - {e.date}
</div>
))
)}

</div>

{/* PARTICIPANTS */}
<div className="bg-white p-6 rounded shadow">

<h3 className="font-bold mb-4">Participant List</h3>

<table className="w-full border">

<thead className="bg-gray-200">
<tr>
<th>Name</th>
<th>Event</th>
<th>Date</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{events.flatMap(event =>
(event.registeredUsers || []).map((user,i)=>(
<tr key={i} className="text-center border-t">
<td>{user.name || "Student"}</td>
<td>{event.title}</td>
<td>{event.date}</td>
<td className="text-green-600">Registered</td>
</tr>
))
)}

</tbody>

</table>

</div>

</div>

</div>

</div>

)

}

export default OrganizerDashboard