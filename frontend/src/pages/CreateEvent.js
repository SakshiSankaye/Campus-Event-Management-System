import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from "../components/MainNavbar"
import {createEvent} from "../services/adminApi"

function CreateEvent(){

const navigate = useNavigate()

const [title,setTitle]=useState("")
const [date,setDate]=useState("")
const [location,setLocation]=useState("")

const submit = async(e)=>{

e.preventDefault()

await createEvent({
title,
date,
location
})

navigate("/admin/events")

}

return(

<div className="flex">

<AdminSidebar/>

<div className="flex-1">

<AdminNavbar/>

<div className="p-8">

<h2 className="text-xl font-bold mb-4">
Create Event
</h2>

<form onSubmit={submit} className="space-y-4">

<input
placeholder="Title"
className="border p-2 w-full"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
type="date"
className="border p-2 w-full"
onChange={(e)=>setDate(e.target.value)}
/>

<input
placeholder="Location"
className="border p-2 w-full"
onChange={(e)=>setLocation(e.target.value)}
/>

<button className="bg-blue-500 text-white px-6 py-2 rounded">
Create
</button>

</form>

</div>

</div>

</div>

)

}

export default CreateEvent