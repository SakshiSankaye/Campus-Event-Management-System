import {BrowserRouter,Routes,Route} from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

<Route path="/student" element={<h1>Student Dashboard</h1>}/>
<Route path="/organizer" element={<h1>Organizer Dashboard</h1>}/>
<Route path="/admin" element={<h1>Admin Dashboard</h1>}/>

</Routes>

</BrowserRouter>

)

}

export default App