import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    interviewId: { type: String, required: true, unique: true, trim: true },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true
    },

    interviewer: { type: String, required: true, trim: true },
    round: { type: String, required: true, trim: true },
    scheduledAt: { type: Date, required: true },

    result: {
      type: String,
      enum: ["pending", "pass", "fail"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);