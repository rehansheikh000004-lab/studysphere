import React from "react";

export default function SessionCard({ session }){
  return (
    <div className="subject-card">
      <div>
        <div style={{fontWeight:700}}>{session.duration} min</div>
        <div className="small">{new Date(session.date).toLocaleString()}</div>
      </div>
      <div className="small">{session.notes ? session.notes.slice(0,40) + (session.notes.length>40?'...':'') : 'No notes'}</div>
    </div>
  );
}
