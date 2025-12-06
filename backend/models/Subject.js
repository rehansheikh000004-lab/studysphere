import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

// Create subject
router.post("/", async (req, res) => {
  try {
    const { userId, title, color } = req.body;

    if (!userId || !title)
      return res.status(400).json({ message: "Missing fields" });

    const subject = await Subject.create({ userId, title, color });
    res.json(subject);

  } catch (err) {
    console.error("Create subject error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get subjects
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;  // ✅ FIXED

    const subjects = await Subject.find({ userId }).sort({ createdAt: -1 });
    res.json(subjects);

  } catch (err) {
    console.error("Get subjects error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
