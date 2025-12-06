import React from "react";

export default function SubjectCard({ subject }){
  return (
    <div className="subject-card" style={{borderLeft:`6px solid ${subject.color || '#6a5af9'}`}}>
      <div>
        <div style={{fontWeight:700}}>{subject.title}</div>
        <div className="small">Created {new Date(subject.createdAt).toLocaleDateString()}</div>
      </div>
      <div>
        <button className="btn">Open</button>
      </div>
    </div>
  );
}
