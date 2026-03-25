import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from "../components/MainNavbar"

import {getEvents,deleteEvent} from "../services/adminApi"

function ManageEvents(){

const [events,setEvents]=useState([])

useEffect(()=>{
loadEvents()
},[])

const loadEvents = async()=>{
const data = await getEvents()
setEvents(data)
}

const handleDelete = async(id)=>{
await deleteEvent(id)
loadEvents()
}

return(

<div className="flex">

<AdminSidebar/>

<div className="flex-1">

<AdminNavbar/>

<div className="p-8">

<h2 className="text-xl font-bold mb-4">
Events
</h2>

<table className="w-full border">

<thead className="bg-gray-200">

<tr>
<th>Title</th>
<th>Date</th>
<th>Location</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{events.map(event=>(

<tr key={event._id}>

<td>{event.title}</td>
<td>{event.date}</td>
<td>{event.location}</td>

<td className="flex gap-3">

<Link
to={`/admin/edit-event/${event._id}`}
className="bg-blue-500 text-white px-3 py-1 rounded"
>
Edit
</Link>

<button
onClick={()=>handleDelete(event._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default ManageEvents