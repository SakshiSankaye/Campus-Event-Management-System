import { useState } from "react"
import MainNavbar from "../components/MainNavbar"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { QRCodeCanvas } from "qrcode.react"
function Attendance(){

const [link,setLink]=useState("")

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

<OrganizerSidebar/>

<div className="flex-1 p-8">

<h2 className="text-2xl font-bold mb-6">Attendance</h2>

<input
placeholder="Enter Attendance Link (Google Form / URL)"
onChange={(e)=>setLink(e.target.value)}
className="border p-2 w-full mb-4"
/>

{link && (
<div className="bg-white p-6 rounded shadow text-center">

<h3 className="mb-4 font-semibold">Scan for Attendance</h3>

<QRCodeCanvas value={link} size={200}/>
<p className="mt-4 text-blue-500">{link}</p>

</div>
)}

</div>

</div>

</div>

)

}

export default Attendance