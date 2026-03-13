import Navbar from "../components/Navbar"

function AdminDashboard(){

return(

<div className="min-h-screen bg-gray-100">

<Navbar/>

<div className="p-8">

<h2 className="text-2xl font-bold mb-6">
Admin Dashboard
</h2>

<div className="grid md:grid-cols-3 gap-6 mb-8">

<div className="bg-blue-500 text-white p-6 rounded-xl">
<h3>Total Users</h3>
<p className="text-2xl font-bold">120</p>
</div>

<div className="bg-green-500 text-white p-6 rounded-xl">
<h3>Total Events</h3>
<p className="text-2xl font-bold">15</p>
</div>

<div className="bg-purple-500 text-white p-6 rounded-xl">
<h3>Registrations</h3>
<p className="text-2xl font-bold">340</p>
</div>

</div>

</div>

</div>

)

}

export default AdminDashboard