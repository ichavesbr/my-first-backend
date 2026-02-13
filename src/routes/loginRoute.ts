import { Router } from "express"
import bcrypt from "bcrypt"
import { getUserByEmail } from "../models/userModel.js"

const loginRoute = Router()

loginRoute.get("/", (req, res) => res.send("Faca seu login"))

loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)
  const auth = bcrypt.compare(password, user?.password)
  // TA DANDO ERRO AQUI TA ACEITANDO LOGIN MESMO COM SENHA ERRADA
  // com email errado da erro como esperado

  if (user) {
    console.log("user vindo do login post", user)
    if (auth) {
      res.send("usuário logado com sucesso")
      return user
    }
    throw Error("incorrect password")
  }
  throw Error("incorrect email")
})

export { loginRoute }
