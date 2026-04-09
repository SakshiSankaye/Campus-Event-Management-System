import { useState } from "react"
import { useNavigate } from "react-router-dom"
import OrganizerSidebar from "../components/OrganizerSidebar"
import Header from "../components/Header"
import { createEvent } from "../services/adminApi"

function OrganizerCreateEvent(){

const navigate = useNavigate()

const [preview,setPreview] = useState(null)

const [form,setForm]=useState({
title:"",
description:"",
date:"",
time:"",
location:"",
category:"",
type:"Offline",
link:"",
maxParticipants:"",
deadline:"",
tags:"",
image:null
})

// HANDLE INPUT
const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

// IMAGE
const handleImage = (e)=>{
const file = e.target.files[0]
setForm({...form,image:file})

if(file){
setPreview(URL.createObjectURL(file))
}
}

// SUBMIT
const submit = async(e)=>{
e.preventDefault()

if(!form.title || !form.date){
alert("Please fill required fields")
return
}

const formData = new FormData()

for(let key in form){
formData.append(key, form[key])
}

await createEvent(formData)

alert("Event Created Successfully 🚀")
navigate("/organizer/manage-events")
}
return(

<div className="flex bg-gray-100 min-h-screen">

<OrganizerSidebar/>

<div className="flex-1">

<Header/>


<div className="p-8">

<h2 className="text-3xl font-bold mb-6">Create Event</h2>

<form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-lg space-y-6 max-w-4xl">

{/* 🔥 BASIC INFO */}
<div>
<h3 className="text-xl font-semibold mb-3">Basic Information</h3>

<input
name="title"
placeholder="Event Title"
className="border p-2 w-full mb-3"
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Event Description"
className="border p-2 w-full"
rows="3"
onChange={handleChange}
/>

</div>

{/* 🔥 DATE & TIME */}
<div>
<h3 className="text-xl font-semibold mb-3">Schedule</h3>

<div className="grid grid-cols-3 gap-4">

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

<input
type="date"
name="deadline"
className="border p-2"
placeholder="Registration Deadline"
onChange={handleChange}
/>

</div>

</div>

{/* 🔥 LOCATION / MODE */}
<div>
<h3 className="text-xl font-semibold mb-3">Location & Mode</h3>

<div className="grid grid-cols-2 gap-4">

<select
name="type"
className="border p-2"
onChange={handleChange}
>
<option value="Offline">Offline</option>
<option value="Online">Online</option>
</select>

<input
name="location"
placeholder="Location / Venue"
className="border p-2"
onChange={handleChange}
/>

</div>

{/* ONLINE LINK */}
{form.type === "Online" && (
<input
name="link"
placeholder="Meeting Link (Google Meet / Zoom)"
className="border p-2 w-full mt-3"
onChange={handleChange}
/>
)}

</div>

{/* 🔥 CATEGORY & TAGS */}
<div>
<h3 className="text-xl font-semibold mb-3">Category</h3>

<div className="grid grid-cols-2 gap-4">

<select
name="category"
className="border p-2"
onChange={handleChange}
>
<option value="">Select Category</option>
<option value="Technical">Technical</option>
<option value="Cultural">Cultural</option>
<option value="Sports">Sports</option>
<option value="Workshop">Workshop</option>
<option value="Seminar">Seminar</option>
</select>

<input
name="tags"
placeholder="Tags (AI, Coding, Dance)"
className="border p-2"
onChange={handleChange}
/>

</div>

</div>

{/* 🔥 PARTICIPANTS */}
<div>
<h3 className="text-xl font-semibold mb-3">Participants</h3>

<input
type="number"
name="maxParticipants"
placeholder="Max Participants"
className="border p-2 w-full"
onChange={handleChange}
/>

</div>

{/* 🔥 IMAGE UPLOAD */}
<div>
<h3 className="text-xl font-semibold mb-3">Event Poster</h3>

<input
type="file"
accept="image/*"
onChange={handleImage}
className="border p-2 w-full"
/>

{/* PREVIEW */}
{preview && (
<img
src={preview}
alt="preview"
className="mt-4 w-full h-48 object-cover rounded"
/>
)}

</div>

{/* 🔥 SUBMIT */}
<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded w-full text-lg">
Create Event 🚀
</button>

</form>

</div>

</div>

</div>

)

}

export default OrganizerCreateEvent