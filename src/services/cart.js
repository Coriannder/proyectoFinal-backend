import { carritosDao, usuariosDao } from "../model/daos/daosFactory.js"
import { sendMailNewCart } from "../utils/nodemailer.js"

let instance = null;
let carritos = []    // aqui se guardan los carritos que esten generando los usuarios

export class CartServices {

    constructor(){
        this.usuariosDao = usuariosDao
    }

    static getInstance = () => {
		if (!instance) instance = new CartServices;
		return instance;
	}

    getCart = async ( user ) => {

        return {
            nombre : (await this.usuariosDao.listar(user))[0].nombre ,
            carrito : carritos.find(carrito => carrito.user === user),
        }

    }

    addProduct = async ( user , product ) => {

        const price = global.productos.find( producto => producto.id === product.id ).price
        const title = global.productos.find( producto => producto.id === product.id ).title
        let miCarrito = carritos.find(carrito => carrito.user === user)

        if ( !miCarrito ) {
            miCarrito = {}
            miCarrito.user = user
            miCarrito.productos = []
            miCarrito.total = 0
        }

        miCarrito.total +=  Number(product.cantidad) * price
        miCarrito.productos.push({ ...product , title: title , price: price })

        const index = carritos.findIndex(carrito => carrito.user === user)
        if (index == -1) {
            carritos.push(miCarrito)
        } else {
            carritos[index] = miCarrito
        }
    }

    deleteProduct = async  ( user , idProduct) => {

        let miCarrito = carritos.find(carrito => carrito.user === user)
        let index = miCarrito.productos.findIndex(producto => producto.id === idProduct) // indice del producto a eliminar

        miCarrito.total -= miCarrito.productos[index].price * miCarrito.productos[index].cantidad // resto el precio del producto a eliminar
        miCarrito.productos.splice(index,1)            // Elimino el producto del array miCarrito.productos
        index = carritos.findIndex(carrito => carrito.user === user)  // indice de miCarrito
        carritos[index] = miCarrito             // Actualizo carritos

    }

    buyCart = async ( user ) => {

        const usuario =  (await this.usuariosDao.listar(user))[0]
        console.log('usuario' , usuario.nombre)
        let miCarrito = carritos.find(carrito => carrito.user === user)
        const guardar = await carritosDao.guardar(miCarrito)
        sendMailNewCart(usuario.nombre , usuario.email , miCarrito)       // Envio mail al admin con la nueva compra
        const index = carritos.findIndex(carrito => carrito.user === user) // Indice de miCarrito
        carritos.splice(index,1)    // Elimino el carrito completo porque ya se realizo la compra

    }
}








