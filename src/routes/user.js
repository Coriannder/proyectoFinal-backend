import { Router } from 'express'
import { UserController } from '../controller/user.js'
import { authentication } from '../middleware/auth.js'

const user = Router()
const userController = UserController.getInstance()

export class RouterUser {

    static start() {
        user.get('/id' , authentication , userController.getUserId)
        return user
    }
}