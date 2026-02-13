import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import { router } from "./routes/userRoutes.js"
import { routerCookie } from "./routes/cookiesRoute.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/users", router)
app.use("/api/cookies", routerCookie)
app.get("/", (req, res) => res.json({ message: "API is running" }))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
