import { Router } from "express"
import { loginHandler } from "../controllers/authController.js"

const loginRouter = Router()

loginRouter.get("/", (req, res) => res.send("Log in with your account"))
loginRouter.post("/", loginHandler)

export { loginRouter }
