import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  startDate?: Date;
  endDate?: Date;
  isTeamProject?: boolean;
  role?: string;
  aiGenerated?: boolean;
  aiSummary?: string;
  keywordsUsed?: string[];
}

const projectSchema = new Schema<IProject>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
      },
    ],
    liveUrl: String,
    githubUrl: String,
    startDate: Date,
    endDate: Date,
    isTeamProject: {
      type: Boolean,
      default: false,
    },
    role: String,
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    aiSummary: String,
    keywordsUsed: [String],
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
