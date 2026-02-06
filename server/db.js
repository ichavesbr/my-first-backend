const mysql = require("mysql2/promise")

const connectDB = async () => {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cadastro",
  })
  return db
}

const getUsers = async () => {
  const db = await connectDB()
  const sql = "SELECT * FROM my_users"
  const [user] = await db.execute(sql)
  return user
}

const getUsersByID = async id => {
  const db = await connectDB()
  const sql = "SELECT * FROM my_users WHERE ID = ?"
  const [userByID] = await db.execute(sql, [id])
  return userByID
}

const createUser = async (user, password) => {
  const db = await connectDB()
  const sql = "INSERT INTO my_users (user, password) VALUES (?, ?)"
  const [result] = await db.execute(sql, [user, password])
  return { id: result.insertId, user, password }
}

const deleteUser = async id => {
  const db = await connectDB()
  const sql = "DELETE FROM my_users WHERE ID = ?"
  const [userByID] = await db.execute(sql, [id])
  return userByID
}

module.exports = { getUsers, createUser, getUsersByID, deleteUser }
