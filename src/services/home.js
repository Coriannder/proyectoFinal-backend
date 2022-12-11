import { usuariosDao , productosDao } from "../model/daos/daosFactory.js"


let instance = null

export class HomeServices {
    constructor(){
        this.usuariosDao = usuariosDao
        this.productosDao = productosDao
    }

    static getInstance = () => {
		if (!instance) instance = new HomeServices;
		return instance;
	}

    getUserNameAndProducts = async (user) => {

        const nombre = (await this.usuariosDao.listar(user))[0].nombre
        global.productos = await this.productosDao.listarAll()

        return {
            nombre: nombre ,
            productos: global.productos ,
        }
    }
}




