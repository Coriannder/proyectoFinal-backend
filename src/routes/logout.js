import { Router } from 'express'
import { LogoutController } from '../controller/logout.js'




const logout = Router();
const logoutController = LogoutController.getInstance()

export class LogoutRouter {

    static start = () => {

        logout.get('/' ,  logoutController.renderLogout)

        return logout
    }
}



