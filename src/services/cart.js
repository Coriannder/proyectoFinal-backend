import { ordenesCompraDao, usuariosDao, carritosDao } from "../model/daos/daosFactory.js"
import { sendMailNewCart } from "../utils/nodemailer.js"

let instance = null;
//global.carritos = []    // aqui se guardan los carritos que esten generando los usuarios

export class CartServices {

    constructor(){
        this.usuariosDao = usuariosDao
        this.ordenesCompraDao = ordenesCompraDao
        this.carritosDao = carritosDao
    }

    static getInstance = () => {
		if (!instance) instance = new CartServices;
		return instance;
	}

    getCart = async ( user ) => {

        const carritos = await this.carritosDao.listarAll() /* global.carritos.find(carrito => carrito.user === user) */
        const miCarrito = carritos.find( carrito => carrito.user === user )
        console.log("getCart", miCarrito)

        return {
            nombre : (await this.usuariosDao.listar(user))[0].nombre ,
            carrito : miCarrito //global.carritos.find(carrito => carrito.user === user),
        }

    }

    addProduct = async ( user , product ) => {

        const price = global.productos.find( producto => producto.id === product.id ).price
        const title = global.productos.find( producto => producto.id === product.id ).title

        //et miCarrito = global.carritos.find(carrito => carrito.user === user)

        const miCarrito = await this.getCart(user).carrito

        /* const carritos = await this.carritosDao.listarAll()
        const miCarrito = carritos.find( carrito => carrito.user === user ) */

        if ( !miCarrito ) {
            //miCarrito = {}
            miCarrito.user = user
            miCarrito.productos = []
            miCarrito.total = 0
            miCarrito = await this.carritosDao.guardar(miCarrito)
            console.log('miCArrito guardado' , miCarrito)
        }

        miCarrito.total +=  Number(product.cantidad) * price
        miCarrito.productos.push({ ...product , title: title , price: price })

/*         const index = carritos.findIndex(carrito => carrito.user === user)
        console.log('indexCarrito addProduct:' , index )
        if (index == -1) {
            carritos.push(miCarrito)
        } else {
            carritos[index] = miCarrito
        } */

        this.carritosDao.actualizar(miCarrito.id)
    }

    deleteProduct = async ( user , idProduct) => {

        let miCarrito = await this.getCart(user).carrito //global.carritos.find(carrito => carrito.user === user)
        let index = miCarrito.productos.findIndex(producto => producto.id === idProduct) // indice del producto a eliminar

        miCarrito.total -= miCarrito.productos[indeclsx].price * miCarrito.productos[index].cantidad // resto el precio del producto a eliminar
        miCarrito.productos.splice(index,1)            // Elimino el producto del array miCarrito.productos

        /* index = global.carritos.findIndex(carrito => carrito.user === user)  // indice de miCarrito */

        if(!miCarrito.productos){
            /* global.carritos.splice(index,1)               // si el carrito esta vacio lo elimino de carritos */
            await this.carritosDao.borrar(miCarrito.id)
        }else{
            await this.carritosDao.actualizar(miCarrito.id)             // Actualizo carritos
        }
    }

    buyCart = async ( user ) => {

        const usuario =  (await this.usuariosDao.listar(user))[0]
        let miCarrito = this.getCart(user).carrito //global.carritos.find(carrito => carrito.user === user)
        const guardar = await ordenesCompraDao.guardar(miCarrito)
        sendMailNewCart(usuario.nombre , usuario.email , miCarrito)       // Envio mail al admin con la nueva compra
        await this.carritosDao.borrar(miCarrito.id)        // Elimino el carrito completo porque ya se realizo la compra

        /* const index = global.carritos.findIndex(carrito => carrito.user === user) // Indice de miCarrito
        global.carritos.splice(index,1)    // Elimino el carrito completo porque ya se realizo la compra */

    }
}








