import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();

app.use("/interviews", interviewRoutes);
app.use("/analytics", analyticsRoutes);

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", syncRoutes);
app.use("/students", studentRoutes);
app.use("/companies", companyRoutes);
app.use("/drives", driveRoutes);
app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;