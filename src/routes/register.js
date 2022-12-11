import { Router } from 'express'
import { RegisterController } from '../controller/register.js';
import { upload } from '../middleware/multer.js';



const register = Router();
const registerController = RegisterController.getInstance()

export class  RegisterRouter {

    static start(){

        register.get('/', registerController.render )
        register.post('/', upload.single('photo') , registerController.saveNewUser )

        return register

    }
}


