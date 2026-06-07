import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    skills: {
      type: [String],
      default: []
    },
    graduationYear: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);