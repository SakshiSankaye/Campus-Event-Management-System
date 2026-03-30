import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from "../components/MainNavbar"
import {createEvent} from "../services/adminApi"

function CreateEvent(){

const navigate = useNavigate()

const [form,setForm]=useState({
title:"",
description:"",
date:"",
time:"",
location:"",
category:"",
maxParticipants:"",
image:null
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleImage = (e)=>{
setForm({...form,image:e.target.files[0]})
}

const submit = async(e)=>{
e.preventDefault()

// simple validation
if(!form.title || !form.date){
alert("Fill required fields")
return
}

await createEvent(form)

alert("Event Created")

navigate("/admin/events")
}

return(

<div className="flex bg-gray-100 min-h-screen">

<AdminSidebar/>

<div className="flex-1">

<AdminNavbar/>

<div className="p-8">

<h2 className="text-3xl font-bold mb-6">Create Event</h2>

<form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-2xl">

<input
name="title"
placeholder="Event Title"
className="border p-2 w-full"
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Description"
className="border p-2 w-full"
onChange={handleChange}
/>

<div className="grid grid-cols-2 gap-4">

<input
type="date"
name="date"
className="border p-2"
onChange={handleChange}
/>

<input
type="time"
name="time"
className="border p-2"
onChange={handleChange}
/>

</div>

<input
name="location"
placeholder="Location"
className="border p-2 w-full"
onChange={handleChange}
/>

<select
name="category"
className="border p-2 w-full"
onChange={handleChange}
>
<option value="">Select Category</option>
<option value="Technical">Technical</option>
<option value="Cultural">Cultural</option>
<option value="Sports">Sports</option>
</select>

<input
type="number"
name="maxParticipants"
placeholder="Max Participants"
className="border p-2 w-full"
onChange={handleChange}
/>

{/* 🔥 IMAGE UPLOAD */}
<input
type="file"
accept="image/*"
onChange={handleImage}
className="border p-2 w-full"
/>

<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded w-full">
Create Event
</button>

</form>

</div>

</div>

</div>

)

}

export default CreateEvent