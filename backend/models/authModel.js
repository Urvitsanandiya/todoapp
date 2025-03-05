import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model("User", authSchema);
