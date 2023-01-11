

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

    getCart = async (req, res ) => {
        if(req.isAuthenticated()){

            const user = req.session.passport.user
            let miCarrito = await this.cartServices.getCart(user)

            res.render('pages/cart', {
                ...miCarrito ,
                active: 'cart'
            })
        } else {
            res.redirect('/login' )
        }
    }

    addProduct = async (req, res) => {
        if(req.isAuthenticated()){

            const user = req.session.passport.user
            const producto = req.body.producto

            await this.cartServices.addProduct( user , producto)

        } else {
            res.redirect('/login' )
        }
    }

    deleteProduct = async (req, res ) => { // por params mando el id del producto que deseo eliminar
        if ( req.isAuthenticated() ) {

            const user = req.session.passport.user
            const idProduct = req.params.id

            await this.cartServices.deleteProduct( user , idProduct )

            res.redirect('/cart' )
        } else {
            res.redirect('/login' )
        }
    }

    buyCart = async ( req , res ) => {
        if ( req.isAuthenticated() ) {

            const user = req.session.passport.user
            await this.cartServices.buyCart( user )

            res.redirect('/cart' )

        } else {
            res.redirect('/login' )
        }
    }
}

