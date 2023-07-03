import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authorize } from "../middlewares/authorization";

const router = Router();

router.get("/", authorize(["admin"]), getUsers);
router.post("/", authorize(["admin"]), createUser);
router.get("/:id", authorize(["admin", "seller", "buyer"]), getUser);
router.put("/:id", authorize(["admin", "seller"]), updateUser);
router.delete("/:id", authorize(["admin"]), deleteUser);

export default router;
