import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AdminDashboard from "./pages/AdminDashboard"
import ManageUsers from "./pages/ManageUsers"
import ManageEvents from "./pages/ManageEvents"
import CreateEvent from "./pages/CreateEvent"
import EditEvent from "./pages/EditEvent"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

<Route path="/student" element={<h1>Student Dashboard</h1>}/>
<Route path="/organizer" element={<h1>Organizer Dashboard</h1>}/>

<Route path="/admin" element={<Navigate to="/admin/dashboard"/>}/>

<Route path="/admin/dashboard" element={<AdminDashboard/>}/>
<Route path="/admin/users" element={<ManageUsers/>}/>
<Route path="/admin/events" element={<ManageEvents/>}/>
<Route path="/admin/create-event" element={<CreateEvent/>}/>
<Route path="/admin/edit-event/:id" element={<EditEvent/>}/>
</Routes>

</BrowserRouter>

)

}

export default App