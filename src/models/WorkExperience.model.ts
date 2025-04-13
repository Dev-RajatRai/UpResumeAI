import mongoose, { Document, Model, Schema } from "mongoose";

export interface IWorkExperience extends Document {
  user: mongoose.Types.ObjectId;
  jobTitle: string;
  companyName: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  description?: string;
  aiGenerated?: boolean;
  keywordsUsed?: string[];
  aiSummary?: string;
  matchedJobScore?: number;
}

const workExperienceSchema = new Schema<IWorkExperience>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    keywordsUsed: [
      {
        type: String,
      },
    ],
    aiSummary: {
      type: String,
    },
    matchedJobScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for faster user-specific queries
workExperienceSchema.index({ user: 1 });

const WorkExperience: Model<IWorkExperience> =
  mongoose.models.WorkExperience ||
  mongoose.model<IWorkExperience>("WorkExperience", workExperienceSchema);

export default WorkExperience;
