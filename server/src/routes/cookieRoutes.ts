import { Router } from "express"

const cookieRouter = Router()

cookieRouter.get("/set", (req, res) => {
  res.cookie("newUser", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
  res.send("te enviamos um cookie")
})

cookieRouter.get("/read", (req, res) => {
  const cookies = req.cookies
  res.json(cookies)
})

export { cookieRouter }
