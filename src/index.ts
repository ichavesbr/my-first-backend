import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.get("/", (req, res) => res.json({ message: "API is running" }))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
