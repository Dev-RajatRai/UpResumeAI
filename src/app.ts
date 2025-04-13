import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import workExperienceRoutes from "./routes/workExperience.routes";
import educationRoutes from "./routes/education.routes";
import projectRoutes from "./routes/project.routes";
import { IUser } from "./models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("UpResumeAI API is running...");
});

app.use("/api/v1/experience", workExperienceRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/projects", projectRoutes);

export default app;
