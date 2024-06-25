import { chatDao, usuariosDao } from "../model/daos/daosFactory.js"


let instance = null

export class ChatsServices {
    constructor(){
        this.usuariosDao = usuariosDao
        this.chatDao = chatDao
    }

    static getInstance = () => {
		if (!instance) instance = new ChatsServices;
		return instance;
	}

    getUserName = async (user) => {
        return (await this.usuariosDao.listar(user))[0].nombre
    }

    getAllChat = async () => {
        return await this.chatDao.listarAll()
    }

    saveNewMessage = async (message) => {
        const email = (await this.usuariosDao.listar(message.user))[0].email
        const type = email === 'admin@admin.com'? 'system' : 'user'

        const mensaje = await this.chatDao.guardar({
            email: email,
            type: type,
            date: message.date,
            body: message.body
        })
        return mensaje
    }
}