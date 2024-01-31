import express  from "express";
import { addOrder, deleteOrder,getAllOrders, getAllOrdersByUser, updateOrder } from "../controllers/order.js";
import { auth, authAdmin } from "../middlwares/auth.js";

const router = express.Router();
router.get("/all",authAdmin, getAllOrders);
router.get("/",auth, getAllOrdersByUser);
router.delete("/:id",auth, deleteOrder);
router.post("/",auth, addOrder);
router.put("/:id",authAdmin, updateOrder);

export default router;