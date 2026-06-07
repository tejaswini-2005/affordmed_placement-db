import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", syncRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;