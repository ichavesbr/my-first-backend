import { Router } from "express"

const routerCookie = Router()

routerCookie.get("/set", (req, res) => {
  res.cookie("newUser", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
  res.send("te enviamos um cookie")
})

routerCookie.get("/read", (req, res) => {
  const cookies = req.cookies
  res.json(cookies)
})

export { routerCookie }
