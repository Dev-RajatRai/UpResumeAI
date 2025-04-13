import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEducation extends Document {
  user: mongoose.Types.ObjectId;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  grade?: string;
  description?: string;
  aiGenerated?: boolean;
  aiSummary?: string;
  keywordsUsed?: string[];
}

const educationSchema = new Schema<IEducation>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    isCurrent: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
    },
    description: {
      type: String,
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    aiSummary: {
      type: String,
    },
    keywordsUsed: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

educationSchema.index({ user: 1 });

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", educationSchema);

export default Education;
