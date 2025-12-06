import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import client from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import SessionCard from "../components/SessionCard";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(()=>{
    if (!user) return nav("/login");
    (async ()=>{
      try {
        const [sRes, sessRes, sumRes] = await Promise.all([
          client.get(`/api/subjects/${user.id}`),
          client.get(`/api/sessions/${user.id}`),
          client.get(`/api/sessions/summary/${user.id}`)
        ]);
        setSubjects(sRes.data);
        setSessions(sessRes.data);
        setSummary(sumRes.data);
      } catch (err) { console.error(err); }
    })();
  },[user]);

  const labels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const weekly = labels.map(l => (summary?.week?.[l] || 0));

  return (
    <div className="container">
      <div className="topbar">
        <div className="logo">
          <div className="mark"></div>
          <div>
            <div style={{fontWeight:800}}>StudySphere</div>
            <div className="small">Glassmorphism Planner</div>
          </div>
        </div>
        <div>
          <button className="btn" onClick={()=>nav("/add-session")}>Add Session</button>
          <button className="btn" style={{marginLeft:8}} onClick={()=>nav("/add-subject")}>New Subject</button>
          <button style={{marginLeft:12}} onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card">
            <h3>Your Subjects</h3>
            <div className="subject-list">
              {subjects.length === 0 ? <p className="small">No subjects yet</p> :
                subjects.map(sub => <SubjectCard key={sub._id} subject={sub} />)
              }
            </div>
          </div>

          <div style={{height:20}}/>

          <div className="card">
            <h3>Recent Sessions</h3>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {sessions.slice(0,6).map(s => <SessionCard key={s._id} session={s} />)}
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Weekly Study (minutes)</h3>
            <Bar data={{ labels, datasets:[{ label:"Minutes", data: weekly, backgroundColor: "rgba(123,97,255,0.9)" }] }} />
          </div>

          <div style={{height:12}}/>

          <div className="card">
            <h3>Quick Tips</h3>
            <p className="small">Keep sessions 25–60 minutes. Track notes. Aim for consistency.</p>
          </div>
        </aside>
      </div>

      <div className="footer">Made with ❤️ — StudySphere</div>
    </div>
  );
}
