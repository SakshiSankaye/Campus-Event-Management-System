import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { createEvent } from "../services/adminApi"

function OrganizerCreateEvent(){

const navigate = useNavigate()

const [title,setTitle]=useState("")
const [date,setDate]=useState("")
const [location,setLocation]=useState("")

const submit = async(e)=>{
e.preventDefault()

// ✅ VALIDATION
if(!title || !date || !location){
alert("Please fill all fields")
return
}

await createEvent({title,date,location})

// ✅ SUCCESS MESSAGE
alert("Event Created Successfully")

navigate("/organizer/manage-events")
}

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

{/* ✅ SIDEBAR */}
<OrganizerSidebar/>

{/* MAIN CONTENT */}
<div className="flex-1 p-8">

<h2 className="text-2xl font-bold mb-6">Create Event</h2>

<form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow max-w-lg">

<input
placeholder="Event Title"
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 w-full"
/>

<input
type="date"
onChange={(e)=>setDate(e.target.value)}
className="border p-2 w-full"
/>

<input
placeholder="Location"
onChange={(e)=>setLocation(e.target.value)}
className="border p-2 w-full"
/>

<button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
Create Event
</button>

</form>

</div>

</div>

</div>

)

}

export default OrganizerCreateEvent