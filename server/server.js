const express = require("express")
const { getUsers, createUser, getUsersByID, deleteUser } = require("./db")
const cors = require("cors")
const app = express()

app.use(express())
app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => res.send("PAGINA INICIAL"))

// MOSTRA USERS
app.get("/users", async (req, res) => {
  try {
    const users = await getUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// MOSTRA USER POR ID
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id
    const user = await getUsersByID(id)
    res.json(user)
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

app.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { user, password } = await getUsersByID(id)
    console.log(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETA USER
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const user = await deleteUser(id)
    res.json({ message: `user deleted ${user}` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(1000)

// TO DO -  02/07/2026

// 1. Criar function para editar user. Criar pagina com form para editar e salvar.
// 2. Validar do form (zod?)

// quando clicar no botao EDIT, abre nova pagina mostrando dados do user atual, ja com inputs inseridos e pronto pra editar e enviar
