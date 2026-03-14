import {useEffect,useState} from "react"
import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from "../components/AdminNavbar"
import {getUsers} from "../services/adminApi"

function ManageUsers(){

const [users,setUsers]=useState([])

useEffect(()=>{
loadUsers()
},[])

const loadUsers = async()=>{
const data = await getUsers()
setUsers(data)
}

return(

<div className="flex">

<AdminSidebar/>

<div className="flex-1">

<AdminNavbar/>

<div className="p-8">

<h2 className="text-xl font-bold mb-4">
Users
</h2>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th>Name</th>
<th>Email</th>

</tr>

</thead>

<tbody>

{users.map(user=>(
<tr key={user._id}>

<td>{user.name}</td>
<td>{user.email}</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default ManageUsers