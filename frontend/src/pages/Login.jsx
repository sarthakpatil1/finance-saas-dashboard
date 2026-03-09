import { useState } from "react"
import API from "../services/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)

      const res = await API.post("/login", formData)

      localStorage.setItem("token", res.data.access_token)

      window.location.href = "/dashboard";

    } catch (err) {
      setMessage("Login failed")
    }
  }

  return (
    <div style={{padding: "40px"}}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Login</button>

      </form>

      <p>{message}</p>

    </div>
  )
}

export default Login