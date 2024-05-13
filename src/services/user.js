import { usuariosDao } from "../model/daos/daosFactory.js";

let instance = null

export class UserServices{
    constructor(){
        this.usuariosDao = usuariosDao
    }

    static getInstance = () => {
		if (!instance) instance = new UserServices;
		return instance;
	}

    getName = async (id) => {
        const user = await usuariosDao.listar(id)
        //if(!user) return {msg: "Usuario no encontrado"}
        return user.nombre
    }
}