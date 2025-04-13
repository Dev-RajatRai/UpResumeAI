import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAchievement extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  aiGenerated?: boolean;
  keywordsUsed?: string[];
}

const achievementSchema = new Schema<IAchievement>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    keywordsUsed: [String], 
  },
  {
    timestamps: true,
  }
);

const Achievement: Model<IAchievement> =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", achievementSchema);

export default Achievement;
