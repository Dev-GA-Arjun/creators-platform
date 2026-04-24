import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js"
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/users/',userRoutes)

app.get('/api/health', (req,res) => {
    res.status(200).json({
        message: "Server Running Successfully!",
        timestamp: new Date()
    })
})

app.listen(PORT, () => {
    console.log(`Server Running Successfully at http://localhost:${PORT}`)
})