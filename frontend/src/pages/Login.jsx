import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(
        "http://127.0.0.1:8000/login",
        formData,
        {
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          }
        }
      );

      localStorage.setItem("token", res.data.access_token);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);
      alert("Login failed");

    }

  };

  return (
    <div className="auth-page">

      <h1>Login</h1>

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

      <button onClick={handleLogin}>Login</button>

      <p>
        New user? <Link to="/register">Create account</Link>
      </p>

    </div>
  );
}

export default Login;