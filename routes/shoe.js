import express  from "express";
import { addShoe, getShoeById, getAllShoes, deleteShoe, updateShoe } from "../controllers/shoe.js";
import { authAdmin } from "../middlwares/auth.js";

const router = express.Router();

router.get("/", getAllShoes);
router.get("/:id", getShoeById);
router.delete("/:id",authAdmin, deleteShoe);
router.post("/",authAdmin, addShoe);
router.put("/:id",authAdmin, updateShoe);

export default router;