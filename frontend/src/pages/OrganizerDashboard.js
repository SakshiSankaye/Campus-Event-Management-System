import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { getEvents, deleteEvent } from "../services/adminApi"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"
function OrganizerDashboard(){

const [events,setEvents] = useState([])
const [search,setSearch] = useState("")
const navigate = useNavigate()

useEffect(()=>{
loadEvents()
},[])

const loadEvents = async ()=>{
const data = await getEvents()
setEvents(data)
}

// CALCULATIONS
const totalEvents = events.length

const upcomingEvents = events.filter(
e => new Date(e.date) > new Date()
)

const totalParticipants = events.reduce(
(sum,e)=> sum + (e.registeredUsers?.length || 0),0
)
const filteredEvents = events.filter(e =>
  e.title.toLowerCase().includes(search.toLowerCase())
)
// SAMPLE IMAGES
const images = [
"https://images.unsplash.com/photo-1523580494863-6f3031224c94",
"https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
"https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
]

// DELETE
const handleDelete = async(id)=>{
const confirmDelete = window.confirm("Delete this event?")
if(confirmDelete){
await deleteEvent(id)
loadEvents()
}
}
const getStatus = (date)=>{
  return new Date(date) > new Date() ? "Upcoming" : "Completed"
}
const chartData = events.map(e => ({
  name: e.title,
  participants: e.registeredUsers?.length || 0
}))
return(

<div className="bg-gray-100 min-h-screen">

<Header search={search} setSearch={setSearch}/>

<div className="flex">

<OrganizerSidebar/>

<div className="flex-1 p-8">

{/* 🔥 HEADER */}
<div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl mb-6 shadow-lg">
<h2 className="text-2xl font-bold">
Welcome Organizer 🚀
</h2>
<p>Manage your events, participants and performance</p>
</div>

{/* 🔥 STATS */}
<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow">
<h3>Total Events</h3>
<p className="text-3xl font-bold">{totalEvents}</p>
</div>

<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow">
<h3>Upcoming</h3>
<p className="text-3xl font-bold">{upcomingEvents.length}</p>
</div>

<div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow">
<h3>Participants</h3>
<p className="text-3xl font-bold">{totalParticipants}</p>
</div>

</div>

{/* 🔥 EVENT CARDS */}
<h3 className="text-xl font-bold mb-4">Your Events</h3>

<div className="grid grid-cols-3 gap-6 mb-8">

{events.length === 0 ? (
<p>No events created</p>
) : (

filteredEvents.map((event,index)=>{

return(

<div key={event._id} className="bg-white rounded-xl shadow overflow-hidden hover:scale-105 transition">

<img 
src={images[index % images.length]} 
className="h-40 w-full object-cover"
/>

<div className="p-4">

<h3 className="font-bold text-lg">{event.title}</h3>
<p className={
getStatus(event.date)==="Upcoming"
? "text-green-500"
: "text-gray-500"
}>
{getStatus(event.date)}
</p>
<p className="text-gray-500">{event.location}</p>

<div className="flex justify-between mt-4">

<button
onClick={()=>navigate(`/organizer/edit-event/${event._id}`)}
className="bg-blue-500 text-white px-3 py-1 rounded"
>
Edit
</button>

<button
onClick={()=>handleDelete(event._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</div>

</div>

</div>

)

})

)}

</div>

{/* 🔥 UPCOMING */}
<div className="bg-white p-6 rounded-xl shadow mb-6">

<h3 className="font-bold mb-4">Upcoming Events</h3>

{upcomingEvents.length === 0 ? (
<p>No upcoming events</p>
) : (
upcomingEvents.map(e=>(
<div key={e._id} className="border-b py-2">
📅 {e.title} - {e.date}
</div>
))
)}

</div>

{/* 🔥 PARTICIPANTS TABLE */}
<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-bold mb-4">Participants</h3>

<table className="w-full text-center">

<thead className="bg-gray-200">
<tr>
<th>Name</th>
<th>Event</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{events.flatMap(event =>
(event.registeredUsers || []).map((user,i)=>(
<tr key={i} className="border-t">
<td>{user.name}</td>
<td>{event.title}</td>
<td>{event.date}</td>
</tr>
))
)}

</tbody>

</table>

</div>
<div className="bg-white p-6 rounded-xl shadow mt-8">

<h3 className="font-bold mb-4">Event Participation</h3>

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="name"/>
    <YAxis/>
    <Tooltip/>
    <Bar dataKey="participants"/>
  </BarChart>
</ResponsiveContainer>

</div>
</div>

</div>

</div>

)

}

export default OrganizerDashboard