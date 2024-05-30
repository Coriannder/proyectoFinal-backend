import { productosDao } from "../model/daos/daosFactory.js"


let instance = null;
export class ProductosServices {

    constructor(){
        this.productosDao = productosDao
    }

    static getInstance = () => {
		if (!instance) instance = new ProductosServices;
		return instance;
	}

    obtenerProductos = async ( id ) => {
        return id? await this.productosDao.listar(id) : await this.productosDao.listarAll()
    }

    guardarProducto = async ( product ) => {
        const isSaved = await this.productosDao.guardar(product)
        return isSaved
    }


    actualizarProducto = async (id, elemento) => {
        const isUpdated = await this.productosDao.actualizar(id , elemento)
        return isUpdated
    }

    borrarProducto = async ( id ) => {
        const isDeleted = await this.productosDao.borrar(id)
      return isDeleted
    }

}
