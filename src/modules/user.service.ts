import { IUser } from "./user.interface";
import User from "./user.model";

export const createUser  = async (data: Partial<IUser>) => {
    return await User.create(data)
}

export const getUser  = async (data: Partial<IUser>, projection: string) => {
    return await User.findOne(data, projection)
}
