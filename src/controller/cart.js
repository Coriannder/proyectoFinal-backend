

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
        const userId = req.userId
        const cart = await this.cartServices.getCart(userId)
        res.json(cart)
    }

    addProduct = async ( req, res ) => {
        const userId = req.userId
        const producto = req.body.producto
        const isAdded = await this.cartServices.addProduct( userId , producto)
        res.send(isAdded)
    }


    deleteProduct = async ( req, res ) => { // por params mando el id del producto que deseo eliminar
        const userId = req.userId
        const productId = req.params.id
        const isDeleted = await this.cartServices.deleteProduct( userId , productId )
        res.send(isDeleted)
    }

    buyCart = async ( req , res ) => {
        const userId = req.userId
        const isBuyed = await this.cartServices.buy( userId )
        res.send(isBuyed)
    }
}