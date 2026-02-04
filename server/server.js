const express = require("express")
const cors = require("cors")
const app = express()

app.use(express())
app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => res.send("PAGINA INICIAL"))
app.get("/register", (req, res) => res.send("PAGINA DE REGISTRO"))

app.post("/register", (req, res) => {
  const { user, password } = req.body
  res.json(` ${user} - ${password}`)
})

app.listen(1000, () => console.log("servidor iniciado"))
