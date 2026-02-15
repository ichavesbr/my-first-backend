import { Router } from "express"
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from "../controllers/userController.js"

const router = Router()

router.get("/", getUsersHandler)
router.get("/:id", getUserByIdHandler)
router.post("/", createUserHandler)
router.put("/:id", updateUserHandler)
router.delete("/:id", deleteUserHandler)

export { router }
