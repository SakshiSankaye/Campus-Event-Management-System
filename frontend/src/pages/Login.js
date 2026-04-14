import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const u = res.data.user || {};

      const finalUser = {
        name:
          u.name ||
          u.fullname ||
          u.fullName ||
          u.username ||
          email.split("@")[0],

        email: u.email || email,
        role: u.role || "organizer"
      };

      localStorage.setItem(
        "user",
        JSON.stringify(finalUser)
      );

      if (finalUser.role === "student") {
        navigate("/student/dashboard");
      } else if (finalUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/organizer-dashboard");
      }

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Campus Event Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="auth-btn" onClick={login}>
          Login
        </button>

        <div className="auth-line">OR</div>

        <span
          onClick={() => navigate("/forgot-password")}
          className="auth-link"
        >
          Forgot Password?
        </span>

        <span
          onClick={() => navigate("/signup")}
          className="auth-link"
        >
          Don't have an account? Signup
        </span>

      </div>
    </div>
  );
}

export default Login;