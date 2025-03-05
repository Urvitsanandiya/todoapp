import { User } from "../models/authModel.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("user not found get");
  }
};

export const postUser = async (req, res) => {
  try {
    const { text } = req.body;
    const adduser = new User({ text, completed: false });
    await adduser.save();
    res.status(201).json(adduser);
  } catch (error) {
    res.status(500).json("user not found get");
  }
};

export const putUser = async (req, res) => {
  try {
    const updateuser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateuser);
  } catch (error) {
    res.status(500).json("user not found get");
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("delate  user successful");
  } catch (error) {
    res.status(500).json("user not found get");
  }
};
