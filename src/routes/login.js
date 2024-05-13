import { Router } from 'express'
import { LoginController } from '../controller/login.js'
import { usuariosDao } from '../model/daos/daosFactory.js';


const login = Router();
const loginController = LoginController.getInstance()

export class LoginRouter {

    static start() {

        login.get('/' ,  loginController.getLogin)
        login.get('/error' ,  loginController.getLoginError)
        login.post('/' , loginController.postLogin)

        login.get('/guardar' , async (req, res) => {
            const resul = await usuariosDao.guardar()
            console.log('res----------------' , resul)
            res.json(resul)
        })


         /* login.get('/auth' , authenticate , (req, res )=>{
            console.log('req-----------------------' , req.body)
            res.json('/home')
        } ) */


        return login
    }
}




