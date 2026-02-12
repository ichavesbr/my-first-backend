import { pool } from "../config/db.js"

export interface User {
  id: number
  name: string
  email: string
  password: string
  created_at?: Date
}

const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query("SELECT * FROM users")
  return rows as User[]
}

const getUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id])
  const users = rows as User[]
  return users[0] || null
}

const createUser = async (name: string, email: string, password: string): Promise<User> => {
  const [result]: any = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
    name,
    email,
    password,
  ])

  return { id: result.insertId, name, email, password }
}

const updateUser = async (id: number, name: string, email: string, password: string): Promise<User> => {
  await pool.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, password, id])
  return { id, name, email, password }
}

const deleteUser = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM users WHERE id = ?", [id])
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser }
