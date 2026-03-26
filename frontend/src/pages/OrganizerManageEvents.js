import { useEffect,useState,useCallback } from "react"
import { useNavigate } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { getEvents,deleteEvent } from "../services/adminApi"

function OrganizerManageEvents(){

const [events,setEvents]=useState([])
const navigate = useNavigate()

// ✅ FIX: useCallback
const loadEvents = useCallback(async()=>{
const data = await getEvents()
setEvents(data)
},[])

// ✅ FIX: dependency added
useEffect(()=>{
loadEvents()
},[loadEvents])

const handleDelete = async(id)=>{

const confirmDelete = window.confirm("Are you sure you want to delete this event?")

if(confirmDelete){
await deleteEvent(id)
loadEvents()
}

}

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

{/* ✅ SIDEBAR */}
<OrganizerSidebar/>

{/* MAIN CONTENT */}
<div className="flex-1 p-8">

<h2 className="text-2xl font-bold mb-6">Manage Events</h2>

<div className="grid grid-cols-3 gap-6">

{events.length === 0 ? (
<p>No events found</p>
) : (

events.map(e=>(
<div key={e._id} className="bg-white p-4 rounded shadow">

<h3 className="font-bold text-lg">{e.title}</h3>
<p className="text-gray-600">{e.date}</p>

<div className="flex gap-3 mt-4">

<button
onClick={()=>navigate(`/organizer/edit-event/${e._id}`)}
className="bg-blue-500 text-white px-3 py-1 rounded"
>
Edit
</button>

<button
onClick={()=>handleDelete(e._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</div>

</div>
))

)}

</div>

</div>

</div>

</div>

)

}

export default OrganizerManageEvents