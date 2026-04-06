import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "../styles/auth.css"

function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")   // ✅ FIX
const [showPassword,setShowPassword] = useState(false)

const login = async ()=>{

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
)

localStorage.setItem("user", JSON.stringify(res.data.user))

const role = res.data.user.role

if(role==="student") navigate("/student/dashboard")
if(role==="organizer") navigate("/organizer/dashboard")
if(role==="admin") navigate("/admin/dashboard")

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

{/* 🔥 PASSWORD FIELD */}
<div className="password-field">
<input
type={showPassword ? "text" : "password"}
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<span onClick={()=>setShowPassword(!showPassword)}>
{showPassword ? "🙈" : "👁️"}
</span>
</div>

<button className="auth-btn" onClick={login}>
Login
</button>

<div className="auth-line">OR</div>

<span onClick={()=>navigate("/forgot-password")} className="auth-link">
Forgot Password?
</span>

<span onClick={()=>navigate("/signup")} className="auth-link">
Don't have an account? Signup
</span>

</div>
</div>

)

}

export default Login