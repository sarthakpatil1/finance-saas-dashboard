import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try{

      await axios.post(
        "http://127.0.0.1:8000/register",
        { email, password }
      );

      alert("Registration successful");

      navigate("/");

    }catch(err){

      alert("Registration failed");

    }

  };

  return (
    <div className="auth-page">

      <h1>Register</h1>

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

      <button onClick={handleRegister}>Register</button>

    </div>
  );
}

export default Register;