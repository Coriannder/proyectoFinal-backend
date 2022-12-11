import { Router } from 'express'
import { LogoutController } from '../controller/logout.js'
//import { authenticate } from '../middleware/passport.js';



const logout = Router();
const logoutController = LogoutController.getInstance()

export class LogoutRouter {

    static start = () => {

        logout.get('/' ,  logoutController.renderLogout)

        return logout
    }
}



