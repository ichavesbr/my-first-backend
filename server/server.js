const express = require("express")
const { getUsers, createUser } = require("./db")
const cors = require("cors")
const app = express()

app.use(express())
app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => res.send("PAGINA INICIAL"))

// MOSTRA USERS
app.get("/register", async (req, res) => {
  try {
    const users = await getUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// CRIA NOVO USER
app.post("/register", async (req, res) => {
  const { user, password } = req.body

  try {
    const newUser = await createUser(user, password)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(1000)
