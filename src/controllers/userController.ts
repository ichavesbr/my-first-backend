import type { Request, Response } from "express"
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../models/userModel.js"

const internalServerErrorMsg = (res: Response, error: any) => {
  console.error(error)
  res.status(500).json({ message: "Internal server error" })
}

const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()

    res.json(users)
  } catch (error: any) {
    internalServerErrorMsg(res, error)
  }
}

const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const user = await getUserById(id)

    if (!user) return res.status(404).json({ message: "User not found" })

    res.json(user)
  } catch (error: any) {
    internalServerErrorMsg(res, error)
  }
}

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" })

    const newUser = await createUser(name, email, password)

    res.status(201).json(newUser)
  } catch (error: any) {
    internalServerErrorMsg(res, error)
  }
}

const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { name, email, password } = req.body
    const existing = await getUserById(id)

    if (!existing) return res.status(404).json({ message: "User not found" })

    const updated = await updateUser(id, name ?? existing.name, email ?? existing.email, password ?? existing.password)

    res.json(updated)
  } catch (error: any) {
    internalServerErrorMsg(res, error)
  }
}

const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const existing = await getUserById(id)

    if (!existing) return res.status(404).json({ message: "User not found" })

    await deleteUser(id)

    res.status(204).send()
  } catch (error: any) {
    internalServerErrorMsg(res, error)
  }
}

export { getUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler }
