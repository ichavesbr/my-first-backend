import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Request, Response } from "express"
import { getUserByEmail } from "../models/userModel.js"

const maxAge = 3 * 24 * 60 * 60 // valid for 3 days

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send("Please insert email AND password")

    const user = await getUserByEmail(email)
    if (!user) return res.status(404).send("Email not registered")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).send("Password is wrong")

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined")
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    return res.status(200).json({ message: "User logged successfully", token })
  } catch (error: unknown) {
    console.error("Internal Server Error:", error)
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export { loginHandler }
