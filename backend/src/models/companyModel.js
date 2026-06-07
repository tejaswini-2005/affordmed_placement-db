import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyId: { 
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
    location: { 
        type: String, 
        required: true, 
        min: 0, 
        max: 10
    }        
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);