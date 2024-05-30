import { response } from "express";
import { ProductosServices } from "../services/productos.js"


let instance = null;

export class ProductosController {

    constructor(){
        this.productosServices = ProductosServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new ProductosController;
		return instance;
	}

    getProducts = async (req, res ) => {
            const products = await this.productosServices.obtenerProductos()
            res.json(products)
    }

    addProduct = async (req, res) => {
        const producto = req.body
        const isSaved = await this.productosServices.guardarProducto( producto )
        res.send( isSaved )
    }

    updateProduct = async (req , res) => {
        const idProduct = req.params.id
        const element = req.body
        const isUpdated = await this.productosServices.actualizarProducto( idProduct , element )
        res.send( isUpdated )
    }

    deleteProduct = async (req, res ) => {
            const idProduct = req.params.id
            const isDeleted = await this.productosServices.borrarProducto( idProduct )
            res.send( isDeleted )
    }

}

