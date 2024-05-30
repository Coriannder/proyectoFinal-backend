import { Router } from 'express'
import { LoginController } from '../controller/login.js'
import { usuariosDao } from '../model/daos/daosFactory.js';


const login = Router();
const loginController = LoginController.getInstance()

export class LoginRouter {

    static start() {
        login.post('/' , loginController.postLogin)
        return login
    }
}




