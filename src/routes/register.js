import { Router } from 'express'
import { RegisterController } from '../controller/register.js';
//import passport from 'passport';


const register = Router();
const registerController = RegisterController.getInstance()

export class  RegisterRouter {

    static start(){
        register.post('/', registerController.post )
        return register
    }
}


