import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISkill extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: "technical" | "soft" | "language" | "other";
  yearsOfExperience: number;
  aiSuggested?: boolean;
}

const skillSchema = new Schema<ISkill>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
    },
    category: {
      type: String,
      enum: ["technical", "soft", "language", "other"],
    },
     yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },
    aiSuggested: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
