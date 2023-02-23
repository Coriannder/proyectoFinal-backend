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
        const productos = id? await this.productosDao.listar(id) : await this.productosDao.listarAll()
        return productos

    }

    guardarProducto = async ( product ) => {
        return await this.productosDao.guardar(product)
    }


    actualizarProducto = async (id, elemento) => {
        return await this.productosDao.actualizar(id , elemento)
    }

    borrarProducto = async ( id ) => {
        return await this.productosDao.borrar(id)
    }

}
