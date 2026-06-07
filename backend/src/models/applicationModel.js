import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true, trim: true },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    drive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
      required: true
    },

    currentRound: {
      type: String,
      default: "applied"
    },

    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "selected", "withdrawn"],
      default: "applied"
    },

    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);