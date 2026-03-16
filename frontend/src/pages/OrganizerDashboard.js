import Navbar from "../components/AdminNavbar"

function OrganizerDashboard(){

return(

<div className="min-h-screen bg-gray-100">

<Navbar/>

<div className="p-8">

<h2 className="text-2xl font-bold mb-6">
Organizer Panel
</h2>

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="text-lg font-bold">
Create Event
</h3>
<p className="text-gray-600">
Add new campus events.
</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="text-lg font-bold">
Manage Registrations
</h3>
<p className="text-gray-600">
View student registrations.
</p>
</div>

</div>

</div>

</div>

)

}

export default OrganizerDashboard