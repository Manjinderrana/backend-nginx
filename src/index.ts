import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv"
import Logger from "./utils/logger";
import { connectDB } from "./customModules/db";
import router from "./routes/user.route";
dotenv.config()

const app = express()

app.use(cors({ origin: "*" }))

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: "Backend Working" })
})

app.get('/health', (_req: Request, res: Response) => {
    res.json({ message: "this is node backend application" })
})

app.use(router)

const port = process.env.PORT || 8002

connectDB()
    .then(() => {
        app.listen(port, () => {
            Logger.info(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        Logger.error(error, "Error connecting to database")
    })
