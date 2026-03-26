import { useState,useEffect,useCallback } from "react"
import { useParams,useNavigate } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { getEvents,updateEvent } from "../services/adminApi"

function OrganizerEditEvent(){

const {id} = useParams()
const navigate = useNavigate()

const [title,setTitle]=useState("")
const [date,setDate]=useState("")
const [location,setLocation]=useState("")

// ✅ FIX: useCallback
const loadEvent = useCallback(async ()=>{

const events = await getEvents()
const event = events.find(e=>e._id===id)

if(event){
setTitle(event.title)
setDate(event.date)
setLocation(event.location)
}

},[id])

// ✅ FIX: dependency added
useEffect(()=>{
loadEvent()
},[loadEvent])

const submit = async(e)=>{
e.preventDefault()

await updateEvent(id,{title,date,location})

navigate("/organizer/manage-events")
}

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

<OrganizerSidebar/>

<div className="flex-1 p-8">

<h2 className="text-2xl font-bold mb-4">Edit Event</h2>

<form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow">

<input value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2 w-full"/>

<input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="border p-2 w-full"/>

<input value={location} onChange={(e)=>setLocation(e.target.value)} className="border p-2 w-full"/>

<button className="bg-green-500 text-white px-4 py-2 rounded">
Update Event
</button>

</form>

</div>

</div>

</div>

)

}

export default OrganizerEditEvent