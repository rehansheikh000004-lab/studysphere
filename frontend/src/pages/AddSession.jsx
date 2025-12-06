import { useState, useContext, useEffect } from "react";
import client from "../api/axiosClient";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddSession(){
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState("");
  const nav = useNavigate();

  useEffect(()=>{
    (async ()=> {
      const res = await client.get(`/api/subjects/${user.id}`);
      setSubjects(res.data);
      if (res.data[0]) setSubjectId(res.data[0]._id);
    })();
  },[]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/api/sessions", { userId: user.id, subjectId, duration: Number(duration), notes });
      nav("/");
    } catch (err) { console.error(err); alert("Error"); }
  };

  return (
    <div className="container center">
      <div className="card" style={{maxWidth:520}}>
        <h2>Log Study Session</h2>
        <select value={subjectId} onChange={e=>setSubjectId(e.target.value)}>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
        </select>
        <input type="number" value={duration} onChange={e=>setDuration(e.target.value)} placeholder="Duration (minutes)" />
        <textarea placeholder="Notes (optional)" value={notes} onChange={e=>setNotes(e.target.value)} style={{minHeight:80}}/>
        <button className="btn" onClick={submit}>Save Session</button>
      </div>
    </div>
  );
}
