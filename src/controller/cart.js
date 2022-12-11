
import { carritosDao, usuariosDao } from "../model/daos/daosFactory.js"
import { CartServices } from "../services/cart.js"
import { sendMailNewCart } from "../utils/nodemailer.js"
import { sendMessageNewCart } from "../utils/twilio.js"

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
            //res.send(miCarrito)
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

/* export const getCartController = async (req, res ) => {
    if(req.isAuthenticated()){
        const nombre = (await usuariosDao.listar(req.session.passport.user)).nombre
        let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)

        res.render('pages/cart', {
            nombre: nombre,
            carrito: miCarrito,
            active: 'cart'
        })
    } else {
        res.redirect('/login' )
    }
} */









/* 
import { carritosDao, usuariosDao } from "../model/daos/daosFactory.js"
import { sendMailNewCart } from "../utils/nodemailer.js"
import { sendMessageNewCart } from "../utils/twilio.js"


let carritos = []  // aqui se guardan los carritos que esten generando los usuarios

export class CartController {
    constructor(){
    }

    getCartController = async (req, res ) => {
        if(req.isAuthenticated()){
            const nombre = (await usuariosDao.listar(req.session.passport.user)).nombre
            let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
            res.render('pages/cart', {
                nombre: nombre,
                carrito: miCarrito,
                active: 'cart'
            })
        } else {
            res.redirect('/login' )
        }
    }

    postCartAddProductController =  (req, res) => {
        if(req.isAuthenticated()){

            const price = global.productos.find(producto => producto.id === req.body.producto.id).price
            const title = global.productos.find(producto => producto.id === req.body.producto.id).title
            let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
            if ( !miCarrito ) {
                miCarrito = {}
                miCarrito.user = req.session.passport.user
                miCarrito.productos = []
                miCarrito.total = 0
            }

            miCarrito.total +=  Number(req.body.producto.cantidad) * price
            miCarrito.productos.push({ ...req.body.producto , title: title , price: price })

            const index = carritos.findIndex(carrito => carrito.user === req.session.passport.user)
            if (index == -1) {
                carritos.push(miCarrito)
            } else {
                carritos[index] = miCarrito
            }

        } else {
            res.redirect('/login' )
        }
    }

    deleteCartProductController = async (req, res ) => { // por params mando el id del producto que deseo eliminar
        if ( req.isAuthenticated() ) {

            let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
            let index = miCarrito.productos.findIndex(producto => producto.id === req.params.id) // indice del producto a eliminar

            miCarrito.total -= miCarrito.productos[index].price * miCarrito.productos[index].cantidad // resto el precio del producto a eliminar
            miCarrito.productos.splice(index,1)            // Elimino el producto del array miCarrito.productos
            index = carritos.findIndex(carrito => carrito.user === req.session.passport.user)  // indice de miCarrito
            carritos[index] = miCarrito             // Actualizo carritos

            res.redirect('/cart' )
        } else {
            res.redirect('/login' )
        }
    }

    postCartBuyController = async ( req , res ) => {
        if ( req.isAuthenticated() ) {
    
            const usuario =  await usuariosDao.listar(req.session.passport.user)
            let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
    
            const guardar = await carritosDao.guardar(miCarrito)
    
            sendMailNewCart(usuario.nombre , usuario.email , miCarrito)       // Envio mail al admin con la nueva compra
            //sendMessageNewCart(usuario.nombre , usuario.email , miCarrito)    // Envio whatsapp al admin con la nuevq compra
    
            const index = carritos.findIndex(carrito => carrito.user === req.session.passport.user) // Indice de miCarrito
            carritos.splice(index,1)    // Elimino el carrito completo porque ya se realizo la compra
    
            res.redirect('/cart' )
    
        } else {
            res.redirect('/login' )
        }
    }

}

export const getCartController = async (req, res ) => {
    if(req.isAuthenticated()){
        const nombre = (await usuariosDao.listar(req.session.passport.user)).nombre
        let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
        res.render('pages/cart', {
            nombre: nombre,
            carrito: miCarrito,
            active: 'cart'
        })
    } else {
        res.redirect('/login' )
    }
} */
