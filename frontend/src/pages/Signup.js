import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/auth.css"

function Signup(){

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("student")

  const signup = async () => {

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password, role }
      )

      alert(res.data.message)

      navigate("/")

    }
    catch(err){

      console.log(err.response?.data)

      alert(err.response?.data?.message || "Signup failed")

    }

  }

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >

          <option value="student">Student</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>

        </select>

        <button className="auth-btn" onClick={signup}>
          Signup
        </button>

        <div className="auth-line">OR</div>

        <span
          className="auth-link"
          onClick={()=>navigate("/")}
        >
          Already have an account? Login
        </span>

      </div>

    </div>

  )

}

export default Signup