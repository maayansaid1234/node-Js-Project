import express from "express";
import { addUser, getAllUsers, login } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/login", login);


export default router;