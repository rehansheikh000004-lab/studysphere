import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId:    { type: String, required: true },
  subjectId: { type: String, required: true },
  duration:  { type: Number, required: true }, // minutes
  notes:     { type: String },
  date:      { type: Date, default: () => new Date() }
}, { timestamps: true });

export default mongoose.models.Session || mongoose.model("Session", sessionSchema);
