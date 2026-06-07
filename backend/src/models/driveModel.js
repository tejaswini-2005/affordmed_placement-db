import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    driveId: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true },
    companyId: { 
        type: String, 
        required: true, 
        trim: true },
    role: { 
        type: String, 
        required: true, 
        trim: true },
    driveDate: { 
        type: Date, 
        required: true },
    packageLpa: { 
        type: Number, 
        required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Drive", driveSchema);