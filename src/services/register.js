import { usuariosDao } from "../model/daos/daosFactory.js"
import { createHash } from "../utils/crypt.js"
import { sendMailNewUser } from "../utils/nodemailer.js"


let instance = null

export class RegisterServices {

    constructor() {
        this.usuariosDao = usuariosDao
    }

    static getInstance = () => {
		if (!instance) instance = new RegisterServices;
		return instance;
	}

    saveNewUser = async ( newUser ) => {
       
            let response = {}
            const usuarios = await usuariosDao.listarAll()
            newUser.password = createHash(newUser.password)
            if(usuarios.find(usuario => usuario.email == newUser.email)){
                response.message ="Este email ya se encuentra registrado, prueba con otro"
                response.route = 'register'
                response.error = true
            } else {
                const userSaved = await usuariosDao.guardar( newUser )
                if(!userSaved){
                    response.message ="Error de registro"
                    response.route = 'register'
                    response.error = true
                }else{
                    sendMailNewUser( newUser )
                }
            }

            return response
    }
}
