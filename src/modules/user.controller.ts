import { Request, Response } from "express"
import * as userService from "./user.service"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken, isPasswordCorrect } from "../utils/jwtUtils"
import { IUser } from "./user.interface"

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body

        if ([username, email, password].some((field) => field?.trim === "")) {
            throw new Error('All fields are required')
        }

        const existingUser = await userService.getUser({ email }, "username email")

        if (existingUser) {
            throw new Error('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userService.createUser({ username, email, password: hashedPassword })

        const createdUser = await userService.getUser({ email: user?.email }, "-password")

        return res.status(201).json({ data: createdUser })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body as IUser

        if ([email, password].some((field: string) => field?.trim() === "")) {
            throw new Error('Email and password are required')
        }

        const existingUser = await userService.getUser({ email }, "")
        
        if (!existingUser) {
            throw new Error('User not found')
        }
    
        const comparePassword = isPasswordCorrect(password, existingUser?.password)
        
        if (!comparePassword) {
            throw new Error('Password is incorrect')
        }

        const accessToken = generateAccessToken(existingUser)
        const refreshToken = generateRefreshToken(existingUser)

        const options = {
            httpOnly: true,
            secure: true,
        }

        const loggedInUser = await userService.getUser({ email }, '-password')

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json({ data: loggedInUser, accessToken, refreshToken })
    } catch (error: any) {
       throw new Error(error.message)
    }
}
