import config from "../config/config.js"
import { usuariosDao } from "../model/daos/daosFactory.js"
import { isValidPassword } from '../utils/crypt.js'
import  jwt  from 'jsonwebtoken'

let instance = null

export class LoginServices {

    constructor () {
        this.usuariosDao = usuariosDao
    }

    static getInstance = () => {
		if (!instance) instance = new LoginServices;
		return instance;
	}


    getToken = async ( email , password ) => {
        try {
            const users = await usuariosDao.listarAll()
            const user = users.find( user => user.email === email )
            if(!user) return {message: "Credenciales Invalidas" , token: false}
            if(!isValidPassword(password, user.password)) return {message: "Credenciales Invalidas" , token: false}
            const token = jwt.sign({user: {id: user.id , email: user.email}}, config.SECRET_JWT)
            return {message: "Logueado correctamente" , token: token }

        } catch (error) {
            return Error(error)
        }
    }

}



