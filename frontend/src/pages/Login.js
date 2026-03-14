import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "../styles/auth.css"

function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const login = async ()=>{

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
)

const role = res.data.user.role

if(role==="student") navigate("/StudentDashboard")
if(role==="organizer") navigate("/OrganizerDashboard")
if(role==="admin") navigate("/Admin/Dashboard")

}
catch(err){

alert("Invalid login")

}

}

return(

<div className="auth-container">

<div className="auth-card">

<h2>Campus Event Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="auth-btn" onClick={login}>
Login
</button>

<div className="auth-line">OR</div>

<span
className="auth-link"
onClick={()=>navigate("/signup")}
>
Don't have an account? Signup
</span>

</div>

</div>

)

}

export default Login