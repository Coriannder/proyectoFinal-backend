import { Router } from 'express'
import { LoginController } from '../controller/login.js'
import { authenticate } from '../middleware/passport.js';



const login = Router();
const loginController = LoginController.getInstance()

export class LoginRouter {

    static start() {

        login.get('/' ,  loginController.getLogin)
        login.post('/' , loginController.postLogin, authenticate )

        return login
    }
}




