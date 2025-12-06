import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// create session
router.post("/", async (req, res) => {
  try {
    const { userId, subjectId, duration, notes, date } = req.body;
    if (!userId || !subjectId || typeof duration !== "number") return res.status(400).json({ message: "Missing fields" });
    const session = await Session.create({ userId, subjectId, duration, notes, date: date ? new Date(date) : new Date() });
    res.json(session);
  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// get sessions by user (optionally subject)
router.get("/:userId", async (req, res) => {
  try {
    const { subjectId } = req.query;
    const query = { userId: req.params.userId };
    if (subjectId) query.subjectId = subjectId;
    const sessions = await Session.find(query).sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    console.error("Get sessions error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// weekly summary (simple grouping)
router.get("/summary/:userId", async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.params.userId });
    const week = { Sun:0, Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0 };
    sessions.forEach(s => {
      const d = new Date(s.date);
      const day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
      week[day] += s.duration;
    });
    res.json({ week });
  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
