import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// Create study session
router.post("/", async (req, res) => {
  try {
    const { userId, subjectId, minutes } = req.body;

    if (!userId || !subjectId || !minutes)
      return res.status(400).json({ message: "Missing fields" });

    const session = await Session.create({
      userId,
      subjectId,
      minutes
    });

    res.json(session);

  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get sessions for user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;   // ✅ FIXED
    const sessions = await Session.find({ userId }).sort({ createdAt: -1 });
    res.json(sessions);

  } catch (err) {
    console.error("Get sessions error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
