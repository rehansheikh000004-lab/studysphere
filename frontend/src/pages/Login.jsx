import { useState, useContext } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/api/auth/login", { email, password });
      login(res.data.user, res.data.token);
      nav("/");
    } catch (err) {
      setErr(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="container center">
      <div className="card" style={{maxWidth:420}}>
        <h2>StudySphere — Login</h2>
        <div className="form">
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
          <button className="btn" onClick={submit}>Login</button>
          <p className="small" style={{color:"salmon"}}>{err}</p>
          <p className="small">New? <Link className="link" to="/signup">Create account</Link></p>
        </div>
      </div>
    </div>
  );
}
