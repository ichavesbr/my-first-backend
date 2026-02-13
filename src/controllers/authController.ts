import jwt from "jsonwebtoken"

const maxAge = 3 * 24 * 60 * 60 // valid for 3 days

const createToken = (id: number) => {
  return jwt.sign({ id }, "secret temporary", { expiresIn: maxAge })
}

export { createToken }
