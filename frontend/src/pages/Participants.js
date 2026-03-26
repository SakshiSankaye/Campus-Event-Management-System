import { useEffect,useState } from "react"
import MainNavbar from "../components/MainNavbar"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { getEvents } from "../services/adminApi"

function Participants(){

const [events,setEvents]=useState([])

useEffect(()=>{
loadEvents()
},[])

const loadEvents = async()=>{
const data = await getEvents()
setEvents(data)
}

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

<OrganizerSidebar/>

<div className="flex-1 p-8">

<h2 className="text-2xl font-bold mb-6">Participants</h2>

<table className="w-full border bg-white">

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
<tr key={i} className="text-center border-t">
<td>{user.name}</td>
<td>{event.title}</td>
<td>{event.date}</td>
</tr>
))
)}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Participants