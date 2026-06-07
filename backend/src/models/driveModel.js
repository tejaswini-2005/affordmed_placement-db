import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    driveId: { type: String, required: true, unique: true, trim: true },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    title: { type: String, required: true, trim: true },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true
    },

    location: { type: String, required: true, trim: true },

    registrationDeadline: {
      type: Date,
      required: true
    },

    rounds: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: ["open", "closed", "completed", "cancelled"],
      default: "open"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Drive", driveSchema);