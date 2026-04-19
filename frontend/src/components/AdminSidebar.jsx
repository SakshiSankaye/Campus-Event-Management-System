import {Link} from "react-router-dom"

function AdminSidebar(){

return(

<div className="w-64 h-screen bg-gray-900 text-white flex flex-col">

<div className="p-6 text-2xl font-bold border-b border-gray-700">
Admin Panel
</div>

<nav className="flex flex-col gap-4 p-6">

<Link to="/admin/dashboard">Dashboard</Link>

<Link to="/admin/users">Users</Link>

<Link to="/admin/events">Events</Link>

<Link to="/admin/create-event">Create Event</Link>

</nav>

</div>

)

}

export default AdminSidebar