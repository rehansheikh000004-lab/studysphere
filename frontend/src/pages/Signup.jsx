import { useState } from "react";
import client from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/api/auth/signup", { username, email, password });
      nav("/login");
    } catch (err) {
      setErr(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="container center">
      <div className="card" style={{maxWidth:420}}>
        <h2>Create account</h2>
        <div className="form">
          <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
          <button className="btn" onClick={submit}>Signup</button>
          <p className="small" style={{color:"salmon"}}>{err}</p>
        </div>
      </div>
    </div>
  );
}
