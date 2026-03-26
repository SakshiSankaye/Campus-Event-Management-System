import { useState } from "react"
import MainNavbar from "../components/MainNavbar"
import OrganizerSidebar from "../components/OrganizerSidebar"
import { QRCodeCanvas } from "qrcode.react"

function Feedback(){

const [formLink,setFormLink]=useState("")

return(

<div className="bg-gray-100 min-h-screen">

<MainNavbar/>

<div className="flex">

<OrganizerSidebar/>

<div className="flex-1 p-8">

<h2 className="text-2xl font-bold mb-6">Feedback</h2>

<input
placeholder="Paste Google Form Link"
onChange={(e)=>setFormLink(e.target.value)}
className="border p-2 w-full mb-4"
/>

{formLink && (
<div className="bg-white p-6 rounded shadow text-center">

<h3 className="mb-4 font-semibold">Scan to Give Feedback</h3>

{/* ✅ FIXED */}
<QRCodeCanvas value={formLink} size={200}/>

<a 
href={formLink} 
target="_blank" 
rel="noopener noreferrer"
className="text-blue-500 block mt-3"
>
Open Form
</a>

</div>
)}

</div>

</div>

</div>

)

}

export default Feedback