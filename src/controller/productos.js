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
        if(req.isAuthenticated()){

            const products = await this.productosServices.obtenerProductos()
            res.json(products)
            //res.json('jelou')
        } else {
            res.redirect('/login' )
        }
    }


    addProduct = async (req, res) => {
        if(req.isAuthenticated()){

            await this.productosServices.guardarProducto( req.body.producto)

        } else {
            res.redirect('/login' )
        }
    }

    updateProduct = async (req , res) => {
        if ( req.isAuthenticated() ) {

            const idProduct = req.params.id
            const element = req.body.element

            res.json( await this.productosServices.actualizarProducto( idProduct , element ) )
        } else {
            res.redirect('/login' )
        }
    }

    deleteProduct = async (req, res ) => {
        if ( req.isAuthenticated() ) {

            const idProduct = req.params.id

            //res.json(idProduct)

            res.json( await this.productosServices.borrarProducto( idProduct ) )
        } else {
            res.redirect('/login' )
        }
    }

}

