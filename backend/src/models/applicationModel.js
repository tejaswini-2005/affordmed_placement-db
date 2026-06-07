import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, trim: true },
    driveId: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "selected"],
      default: "applied"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);