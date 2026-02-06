const mysql = require("mysql2/promise")

const connectDB = async () => {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cadastro",
  })
  console.log("banco de dados mysql conectado")
  return db
}

const getUsers = async () => {
  const db = await connectDB()
  const sql = "SELECT * FROM my_users"
  const [user] = await db.execute(sql)
  return user
}

const createUser = async (user, password) => {
  const db = await connectDB()
  const sql = "INSERT INTO my_users (user, password) VALUES (?, ?)"
  const [result] = await db.execute(sql, [user, password])
  return { id: result.insertId, user, password }
}

// MOSTRAR USER INDIVIDUALMENTE POR ID NA URL /1 /2 /3 etc

// module.exports = connectDB
module.exports = { getUsers, createUser }
