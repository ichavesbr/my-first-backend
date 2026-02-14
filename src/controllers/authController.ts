import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUserByEmail } from "../models/userModel.js"

const maxAge = 3 * 24 * 60 * 60 // valid for 3 days

const createToken = (id: number) => jwt.sign({ id }, "secret temporary", { expiresIn: maxAge })

const internalServerErrorMsg = (res: Response, error: any) => {
  console.error(error)
  res.status(500).json({ message: "Internal server error" })
}

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.send("❌❌❌❌   please insert email AND password    ❌❌❌❌")

    const user = await getUserByEmail(email)
    if (!user) return res.send("❌❌❌❌   EMAIL not registered    ❌❌❌❌")

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) return res.send("❌❌❌❌   PASSWORD is wrong    ❌❌❌❌")

    res.send("✅✅✅✅   user logged, welcome   ✅✅✅✅")
  } catch (error: any) {
    internalServerErrorMsg(res, error)
  }
}
export { loginHandler, createToken }
