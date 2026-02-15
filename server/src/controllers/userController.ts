import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Request, Response } from "express"
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from "../models/userModel.js"

const internalServerErrorMsg = (res: Response, error: unknown) => {
  console.error(error)
  res.status(500).json({ message: "Internal server error" })
}

const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()

    res.json(users)
  } catch (error: unknown) {
    internalServerErrorMsg(res, error)
  }
}

const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const user = await getUserById(id)

    if (!user) return res.status(404).json({ message: "User not found" })

    res.json(user)
  } catch (error: unknown) {
    internalServerErrorMsg(res, error)
  }
}

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" })

    const newUser = await createUser(name, email, hashedPassword)

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined")

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 3 * 24 * 60 * 60 })
    res.status(201).json({ user: newUser.id })
  } catch (error: unknown) {
    internalServerErrorMsg(res, error)
  }
}

const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await getUserById(id)

    if (!user) return res.status(404).json({ message: "User not found" })

    const editedUser = await updateUser(id, name, email, hashedPassword)

    res.json(editedUser)
  } catch (error: unknown) {
    internalServerErrorMsg(res, error)
  }
}

const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const user = await getUserById(id)

    if (!user) return res.status(404).json({ message: "User not found" })

    await deleteUser(id)

    res.status(204).send()
  } catch (error: unknown) {
    internalServerErrorMsg(res, error)
  }
}

const getUserByEmailHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const user = await getUserByEmail(email)

    if (!user) return res.status(404).json({ message: "User not found" })

    res.json(user)
  } catch (error: unknown) {
    internalServerErrorMsg(res, error)
  }
}

export {
  getUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByEmailHandler,
}
