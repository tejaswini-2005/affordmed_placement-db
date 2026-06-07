import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    package: { type: Number, required: true },
    eligibleDepartments: { type: [String], required: true },
    minimumCgpa: { type: Number, required: true, min: 0, max: 10 },
    driveDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["open", "closed", "upcoming", "completed"],
      default: "open"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);