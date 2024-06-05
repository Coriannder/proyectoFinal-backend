import { ordenesCompraDao, usuariosDao, carritosDao, productosDao } from "../model/daos/daosFactory.js"
import { sendMailNewCart } from "../utils/nodemailer.js"

let instance = null;
export class CartServices {

    constructor(){
        this.usuariosDao = usuariosDao
        this.ordenesCompraDao = ordenesCompraDao
        this.carritosDao = carritosDao
        this.productosDao = productosDao
    }

    static getInstance = () => {
		if (!instance) instance = new CartServices;
		return instance;
	}

    getCart = async ( userId ) => {
        const carritos = await this.carritosDao.listarAll()
        let miCarrito = carritos.find( carrito => carrito.user === userId )

        if ( !miCarrito ) {
            miCarrito = {}
            miCarrito.user = userId
            miCarrito.productos = []
            miCarrito.total = 0

            await this.carritosDao.guardar(miCarrito)
        }
        return miCarrito
    }

    addProduct = async ( userId , product ) => {

        const productos = await this.productosDao.listarAll()
        if(!productos) throw new Error('No se encontraron productos')

        const price = productos.find( producto => producto.id === product.id ).price
        const title = productos.find( producto => producto.id === product.id ).title
        if( !price || !title ) throw new Error('producto no encontrado')

        const miCarrito = await this.getCart(userId)
        miCarrito.total +=  Number(product.cantidad) * Number(price)

        const index = miCarrito.productos.findIndex(producto => producto.id === product.id) // Indice del producto
        index === -1 ?
            miCarrito.productos.push({ ...product , title: title , price: price })
            :
            miCarrito.productos[index].cantidad = Number(miCarrito.productos[index].cantidad) + Number( product.cantidad)

        return await this.carritosDao.actualizar(miCarrito.id , {user: miCarrito.user, productos: miCarrito.productos, total: miCarrito.total })
    }

    deleteProduct = async ( userId , ProductId) => {

        const miCarrito = await this.getCart(userId)

        if(!miCarrito) return false
        let index = miCarrito.productos.findIndex(producto => producto.id === ProductId) // indice del producto a eliminar
        if(index === -1) return false
        miCarrito.total -= miCarrito.productos[index].price * miCarrito.productos[index].cantidad // resto el precio del producto a eliminar
        miCarrito.productos.splice(index,1)            // Elimino el producto de miCarrito

        if(!miCarrito.productos){
            return await this.carritosDao.borrar(miCarrito.id) // si el carrito esta vacio lo elimino de carritos en DB
        }else{
            return await this.carritosDao.actualizar(miCarrito.id , { productos: miCarrito.productos , total: miCarrito.total } )   // Actualizo mi carrito en DB
        }
    }

    buy = async ( userId ) => {

        try {
            const usuario =  await this.usuariosDao.listar(userId)
            const miCarrito = await this.getCart(userId)
            if(!miCarrito) return false
            await ordenesCompraDao.guardar(miCarrito)
            sendMailNewCart(usuario.nombre , usuario.email , miCarrito)       // Envio mail al admin con la nueva compra
            await this.carritosDao.borrar(miCarrito.id)
            return true
        } catch (error) {
            console.log(new Error(error))
            return false
        }
    }
}








