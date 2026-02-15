import { Router } from "express"
import { loginHandler } from "../controllers/authController.js"

const loginRoute = Router()

loginRoute.get("/", (req, res) => res.send("Log in with your account"))
loginRoute.post("/", loginHandler)

export { loginRoute }
