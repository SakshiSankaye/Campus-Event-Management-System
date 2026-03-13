import {Link} from "react-router-dom"

function Sidebar(){

return(

<div className="w-60 bg-black text-white h-screen p-6">

<h2 className="text-xl font-bold mb-6">
Admin Panel
</h2>

<ul className="space-y-3">

<li><Link to="/admin">Dashboard</Link></li>
<li><Link to="/admin/events">Events</Link></li>
<li><Link to="/admin/users">Users</Link></li>

</ul>

</div>

)

}

export default Sidebar