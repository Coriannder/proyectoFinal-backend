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


    post = async ( email , password ) => {
        const users = await usuariosDao.listarAll()
        const userFound = users.find(user => user.email === email)

        if(userFound) return {message: 'El email ya se encuentra registrado' , register: false}

        const passwordHash = createHash(password)
        const isRegistered = await usuariosDao.guardar( { email: email , password: passwordHash })

        //if(!isRegistered.id) return {message: "Error de registro"}
        return {message: "Registro correcto" , register: isRegistered}
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
