

import { CartServices } from "../services/cart.js"


let instance = null;

export class CartController {

    constructor(){
        this.cartServices = CartServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new CartController;
		return instance;
	}

    getCart = async ( req, res ) => {
        const userId = req.user.id
        return await this.services.getCart(userId)
    }

    addProduct = async ( req, res ) => {
        const userId = req.user.id
        const producto = req.body.producto
        return await this.cartServices.addProduct( userId , producto)
    }


    deleteProduct = async ( req, res ) => { // por params mando el id del producto que deseo eliminar
        const userId = req.user.id
        const ProductId = req.params.id
        return await this.cartServices.deleteProduct( userId , ProductId )
    }

    buyCart = async ( req , res ) => {
        const userId = req.user.id
        return await this.cartServices.buyCart( userId )
    }
}

