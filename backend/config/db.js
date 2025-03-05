import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.error("mongodb error", error);
  }
};
