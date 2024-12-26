import { Request, Response } from "express"
import * as userService from "./user.service"
import Logger from "../utils/logger"
import bcrypt from "bcrypt"

export const createUser =  async (req: Request, res: Response): Promise<any> => {
 try {
    const { username, email, password } = req.body

    if ([username, email, password].some((field)=> field?.trim === "")) {
        Logger.error('All fields are required')
    }

    const existingUser = await userService.getUser({email},"username email")

    if (existingUser) {
        Logger.error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userService.createUser({username, email, password: hashedPassword})
    
    const createdUser = await userService.getUser({email: user?.email}, "-password")

    Logger.info(createdUser)

    return res.status(201).json({data: createdUser})
 } catch (error) {
    Logger.error(error)
 }
}
