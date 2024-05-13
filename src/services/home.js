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

    getUserNameAndProducts = async (id) => {

        const nombre = await this.usuariosDao.listar(id)
        global.filterChat = (await this.usuariosDao.listar(id)).email
        global.productos = await this.productosDao.listarAll()

        return {
            nombre: nombre.nombre ,
            products: global.productos ,
        }
    }
}




