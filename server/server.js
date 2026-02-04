const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => res.send("PAGINA INICIAL"))
app.post("/register", (req, res) => {
  const { user, password } = req.body
  console.log(user, password)
})
app.listen(1000, () => console.log("servidor iniciado"))
