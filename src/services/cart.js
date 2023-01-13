import { ordenesCompraDao, usuariosDao, carritosDao } from "../model/daos/daosFactory.js"
import { sendMailNewCart } from "../utils/nodemailer.js"

let instance = null;
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

        const carritos = await this.carritosDao.listarAll()
        let miCarrito = carritos.find( carrito => carrito.user === user )

        if ( !miCarrito ) {
            miCarrito = {}
            miCarrito.user = user
            miCarrito.productos = []
            miCarrito.total = 0
            miCarrito = await this.carritosDao.guardar(miCarrito)
        }

        return {
            nombre : (await this.usuariosDao.listar(user))[0].nombre ,
            carrito : miCarrito //global.carritos.find(carrito => carrito.user === user),
        }

    }

    addProduct = async ( user , product ) => {

        const price = global.productos.find( producto => producto.id === product.id ).price
        const title = global.productos.find( producto => producto.id === product.id ).title

        const miCarrito = (await this.getCart(user)).carrito
        miCarrito.total +=  Number(product.cantidad) * price

        const index = miCarrito.productos.findIndex(producto => producto.id === product.id) // Indice del producto

        index === -1 ?
            miCarrito.productos.push({ ...product , title: title , price: price })
            :
            miCarrito.productos[index].cantidad = Number(miCarrito.productos[index].cantidad) + Number( product.cantidad)

        await this.carritosDao.actualizar(miCarrito.id , {user: miCarrito.user, productos: miCarrito.productos, total: miCarrito.total})

    }



    deleteProduct = async ( user , idProduct) => {

        const miCarrito = (await this.getCart(user)).carrito
        let index = miCarrito.productos.findIndex(producto => producto.id === idProduct) // indice del producto a eliminar

        miCarrito.total -= miCarrito.productos[index].price * miCarrito.productos[index].cantidad // resto el precio del producto a eliminar
        miCarrito.productos.splice(index,1)            // Elimino el producto de miCarrito

        if(!miCarrito.productos){
            await this.carritosDao.borrar(miCarrito.id) // si el carrito esta vacio lo elimino de carritos en DB
        }else{
            await this.carritosDao.actualizar(miCarrito.id , { productos: miCarrito.productos , total: miCarrito.total } )   // Actualizo mi carrito en DB
        }
    }

    buyCart = async ( user ) => {

        const usuario =  (await this.usuariosDao.listar(user))[0]
        const miCarrito = (await this.getCart(user)).carrito
        await ordenesCompraDao.guardar(miCarrito)
        sendMailNewCart(usuario.nombre , usuario.email , miCarrito)       // Envio mail al admin con la nueva compra
        await this.carritosDao.borrar(miCarrito.id)        // Elimino el carrito completo porque ya se realizo la compra
    }
}








