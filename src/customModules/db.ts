import mongoose from "mongoose";
import Logger from "../utils/logger";

export const connectDB = async () => {
    try {
        const host = await mongoose.connect(process.env.MONGO_URI || '')
        Logger.info(`Database connected on port: ${host.connection.port}`)
    } catch (error) {
        Logger.error(error)
        process.exit(1);
    }
}
