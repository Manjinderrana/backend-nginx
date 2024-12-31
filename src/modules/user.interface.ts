import { ObjectId } from "mongoose";

export interface IUser {
    _id: string | ObjectId;
    username : string;
    email : string;
    password: string;
    refreshToken? : string
}