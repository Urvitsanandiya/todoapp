import express from "express";
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from "../controllers/authController.js";

export const router = express.Router();

router.get("/", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);
