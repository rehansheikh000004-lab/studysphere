import { useState, useContext } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddSubject(){
  const [title,setTitle] = useState("");
  const [color,setColor] = useState("#6a5af9");
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/api/subjects", { userId: user.id, title, color });
      nav("/");
    } catch (err) { console.error(err); alert("Error"); }
  };

  return (
    <div className="container center">
      <div className="card" style={{maxWidth:520}}>
        <h2>New Subject</h2>
        <input placeholder="Subject title" value={title} onChange={e=>setTitle(e.target.value)} />
        <div style={{display:'flex', gap:10, marginTop:8}}>
          <input type="color" value={color} onChange={e=>setColor(e.target.value)} style={{width:60,height:40,borderRadius:8,border:'none',padding:0}} />
          <button className="btn" onClick={submit}>Create</button>
        </div>
      </div>
    </div>
  );
}
