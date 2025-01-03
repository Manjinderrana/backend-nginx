import mongoose from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new mongoose.Schema<IUser>({
   username: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   refreshToken: {
    type: String,
    required: false
   }
}
,{timestamps: true})

const User = mongoose.model<IUser>('User', userSchema)

export default User