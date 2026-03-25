import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

import AdminDashboard from "./pages/AdminDashboard"
import ManageUsers from "./pages/ManageUsers"
import ManageEvents from "./pages/ManageEvents"
import CreateEvent from "./pages/CreateEvent"
import EditEvent from "./pages/EditEvent"
import OrganizerDashboard from "./pages/OrganizerDashboard"
import OrganizerLayout from "./layouts/OrganizerLayout"

import StudentDashboard from "./pages/StudentDashboard"

function App(){

return(

<BrowserRouter>

<Routes>

{/* AUTH */}
<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

{/* STUDENT */}
<Route path="/student/dashboard" element={<StudentDashboard/>}/>

{/* ORGANIZER */}

{/* ADMIN */}
<Route path="/admin" element={<Navigate to="/admin/dashboard"/>}/>

<Route path="/admin/dashboard" element={<AdminDashboard/>}/>
<Route path="/admin/users" element={<ManageUsers/>}/>
<Route path="/admin/events" element={<ManageEvents/>}/>
<Route path="/admin/create-event" element={<CreateEvent/>}/>
<Route path="/admin/edit-event/:id" element={<EditEvent/>}/>
<Route path="/organizer/dashboard" element={<OrganizerDashboard/>}/>
<Route path="/organizer" element={<OrganizerLayout/>}></Route>
</Routes>

</BrowserRouter>

)

}

export default App