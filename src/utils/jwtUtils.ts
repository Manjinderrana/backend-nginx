import { IUser } from "../modules/user.interface"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const generateAccessToken = (user: IUser) => {
    try {
        return jwt.sign({ userId: user?._id, email: user?.email }, process.env.ACCESS_SECRET_KEY || '', { expiresIn: '10m' })
    } catch (error) {
        throw error
    }
}

export const generateRefreshToken = (user: IUser) => {
    try {
        return jwt.sign({ userId: user?._id }, process.env.REFRESH_SECRET_KEY || '', { expiresIn: '10h' })
    } catch (error) {
        throw error
    }
}

export const isPasswordCorrect = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw  error
    }
}
