import { Router } from 'express'
import { RegisterController } from '../controller/register.js';


const register = Router();
const registerController = RegisterController.getInstance()

export class  RegisterRouter {

    static start(){

        register.get('/', registerController.render )
        register.post('/', registerController.saveNewUser )

        return register

    }
}


