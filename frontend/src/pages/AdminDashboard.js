import {useEffect,useState} from "react"
import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from "../components/MainNavbar"
import {getStats} from "../services/adminApi"

import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts"

function AdminDashboard(){

const [stats,setStats]=useState({
users:0,
events:0,
registrations:0
})

useEffect(()=>{
loadStats()
},[])

const loadStats = async()=>{
const data = await getStats()
setStats(data)
}

const chartData = [
{name:"Users",value:stats.users},
{name:"Events",value:stats.events},
{name:"Registrations",value:stats.registrations}
]

return(

<div className="flex bg-gray-100 min-h-screen">

<AdminSidebar/>

<div className="flex-1">

<AdminNavbar/>

<div className="p-8">

<h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

{/* 🔥 STATS */}
<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
<h3 className="text-lg">Total Users</h3>
<p className="text-3xl font-bold">{stats.users}</p>
</div>

<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
<h3 className="text-lg">Total Events</h3>
<p className="text-3xl font-bold">{stats.events}</p>
</div>

<div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
<h3 className="text-lg">Registrations</h3>
<p className="text-3xl font-bold">{stats.registrations}</p>
</div>

</div>

{/* 🔥 CHART */}
<div className="bg-white p-6 rounded-xl shadow-lg">

<h3 className="text-xl font-semibold mb-4">Analytics</h3>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={chartData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="value"/>
</BarChart>
</ResponsiveContainer>

</div>

</div>

</div>

</div>

)

}

export default AdminDashboard