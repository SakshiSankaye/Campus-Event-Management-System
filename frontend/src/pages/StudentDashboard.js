import Navbar from "../components/AdminNavbar"

const events = [

{
title:"AI Workshop",
date:"12 June 2026",
desc:"Learn Artificial Intelligence basics"
},

{
title:"Hackathon",
date:"18 June 2026",
desc:"24 hour coding competition"
},

{
title:"Cultural Fest",
date:"25 June 2026",
desc:"Dance, music and fun activities"
}

]

function StudentDashboard(){

return(

<div className="min-h-screen bg-gray-100">

<Navbar/>

<div className="p-8">

<h2 className="text-2xl font-bold mb-6">
Upcoming Events
</h2>

<div className="grid md:grid-cols-3 gap-6">

{events.map((event,index)=>(

<div
key={index}
className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
>

<h3 className="text-xl font-bold">
{event.title}
</h3>

<p className="text-gray-600 mt-2">
{event.desc}
</p>

<p className="text-sm mt-2 text-gray-500">
📅 {event.date}
</p>

<button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
Register
</button>

</div>

))}

</div>

</div>

</div>

)

}

export default StudentDashboard