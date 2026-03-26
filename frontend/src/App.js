import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

import AdminDashboard from "./pages/AdminDashboard"
import ManageUsers from "./pages/ManageUsers"
import ManageEvents from "./pages/ManageEvents"
import CreateEvent from "./pages/CreateEvent"
import EditEvent from "./pages/EditEvent"
import OrganizerDashboard from "./pages/OrganizerDashboard"
import OrganizerCreateEvent from "./pages/OrganizerCreateEvent"
import OrganizerManageEvents from "./pages/OrganizerManageEvents"
import OrganizerEditEvent from "./pages/OrganizerEditEvent"
import Participants from "./pages/Participants"
import Attendance from "./pages/Attendance"
import Feedback from "./pages/Feedback"
import StudentDashboard from "./pages/StudentDashboard"
import StudentBrowseEvent from "./pages/StudentBrowseEvent";
import StudentMyEvents from "./pages/StudentMyEvents";
import StudentCertificates from "./pages/StudentCertificates";
import StudentFeedback from "./pages/StudentFeedback";

function App(){

return(

<BrowserRouter>

<Routes>

{/* AUTH */}
<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

{/* STUDENT */}
<Route path="/student/dashboard" element={<StudentDashboard/>}/>
<Route path="/student-browse-events" element={<StudentBrowseEvent />} />
<Route path="/student-my-events" element={<StudentMyEvents />} />
<Route path="/student-certificates" element={<StudentCertificates />} />
<Route path="/student-feedback" element={<StudentFeedback />} />

{/* ORGANIZER */}

{/* ADMIN */}
<Route path="/admin" element={<Navigate to="/admin/dashboard"/>}/>

<Route path="/admin/dashboard" element={<AdminDashboard/>}/>
<Route path="/admin/users" element={<ManageUsers/>}/>
<Route path="/admin/events" element={<ManageEvents/>}/>
<Route path="/admin/create-event" element={<CreateEvent/>}/>
<Route path="/admin/edit-event/:id" element={<EditEvent/>}/>
<Route path="/organizer/dashboard" element={<OrganizerDashboard/>}/>
<Route path="/organizer/create-event" element={<OrganizerCreateEvent/>}/>
<Route path="/organizer/manage-events" element={<OrganizerManageEvents/>}/>
<Route path="/organizer/edit-event/:id" element={<OrganizerEditEvent/>}/>
<Route path="/organizer/participants" element={<Participants/>}/>
<Route path="/organizer/attendance" element={<Attendance/>}/>
<Route path="/organizer/feedback" element={<Feedback/>}/>
</Routes>

</BrowserRouter>

)

}

export default App