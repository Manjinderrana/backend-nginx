import { Router } from "express"
import { createUser } from "../modules/user.controller"

const router = Router()

router.post('/signup', createUser)

export default router