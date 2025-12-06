import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import subjectsRoutes from "./routes/subjects.js";
import sessionsRoutes from "./routes/sessions.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/sessions", sessionsRoutes);

app.get("/", (req, res) => res.send("StudySphere backend running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
