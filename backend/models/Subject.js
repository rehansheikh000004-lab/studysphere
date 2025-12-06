import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title:  { type: String, required: true },
  color:  { type: String, default: "#6a5af9" }
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
