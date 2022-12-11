import { usuariosDao } from "../model/daos/daosFactory.js"
import { isValidPassword } from '../utils/crypt.js'

let instance = null

export class LoginServices {

    constructor () {
        this.usuariosDao = usuariosDao
    }

    static getInstance = () => {
		if (!instance) instance = new LoginServices;
		return instance;
	}

    autenticar = async ( email , password ) => {
        const usuarios = []
        let mensaje
        usuarios.push( await usuariosDao.listarAll() )
        const user = usuarios.find( usuario => usuario.email == email )

        if( !user) {
            mensaje = 'Usario no encontrado'
        }else{

            if(!isValidPassword(password , user.password)) {
                mensaje = 'Password incorrecto'
            }}
        const ruta = 'login'
        return {
            message: mensaje ,
            route: ruta
        }
    }
}



