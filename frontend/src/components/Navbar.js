import { Link, useNavigate } from "react-router-dom"

function Navbar(){

const navigate = useNavigate()

const logout = ()=>{
localStorage.removeItem("token")
navigate("/login")
}

return(

<div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-4 shadow-md">

<h1 className="text-xl font-bold">
Campus Events
</h1>

<div className="space-x-6">

<Link to="/student" className="hover:text-gray-200">
Events
</Link>

<Link to="/organizer" className="hover:text-gray-200">
Organizer
</Link>

<Link to="/admin" className="hover:text-gray-200">
Admin
</Link>

<button
onClick={logout}
className="bg-red-500 px-3 py-1 rounded"
>
Logout
</button>

</div>

</div>

)

}

export default Navbar