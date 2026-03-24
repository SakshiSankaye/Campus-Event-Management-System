import {useEffect,useState} from "react"
import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from "../components/MainNavbar"
import {getStats} from "../services/adminApi"

import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid} from "recharts"

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

<h2 className="text-2xl font-bold mb-6">
Dashboard
</h2>

<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-blue-500 text-white p-6 rounded">
Users {stats.users}
</div>

<div className="bg-green-500 text-white p-6 rounded">
Events {stats.events}
</div>

<div className="bg-purple-500 text-white p-6 rounded">
Registrations {stats.registrations}
</div>

</div>

<BarChart width={500} height={300} data={chartData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="value" fill="#8884d8"/>
</BarChart>

</div>

</div>

</div>

)

}

export default AdminDashboard