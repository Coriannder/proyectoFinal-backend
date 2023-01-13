import config from '../../config/config.js'

let productosDao
let ordenesCompraDao = ''
let chatDao
let usuariosDao
let carritosDao

switch ( config.PERSISTANCE ) {

    case 'mongo':

        const {default: ProductosDaoMongoDb} = await import ('./productos/ProductosDaoMongoDb.js')
        productosDao = ProductosDaoMongoDb.getInstance()

        const { default: OrdenesCompraDaoMongoDb } = await import ('./ordenesCompra/ordenesCompraDaoMongoDb.js')
        ordenesCompraDao = OrdenesCompraDaoMongoDb.getInstance()

        const { default: ChatDaoMongoDb } = await import ('./chat/ChatDaoMongoDb.js')
        chatDao = ChatDaoMongoDb.getInstance()

        const { default: UsuariosDaoMongoDb } = await import ('./usuarios/UsuariosDaoMongoDb.js')
        usuariosDao = UsuariosDaoMongoDb.getInstance()

        const { default: CarritosDaoMongoDb } = await import ('./carritos/CarritosDaoMongoDB.js')
        carritosDao = CarritosDaoMongoDb.getInstance()

        break

    case 'memoria':

        const {default: ProductosDaoMemoria} = await import ('./productos/ProductosDaoMemoria.js')
        productosDao = ProductosDaoMemoria.getInstance()

        const { default: OrdenesCompraDaoMemoria } = await import ('./ordenesCompra/ordenesCompraDaoMemoria.js')
        ordenesCompraDao = OrdenesCompraDaoMemoria.getInstance()

        const { default: ChatDaoMemoria } = await import ('./chat/ChatDaoMemoria.js')
        chatDao = ChatDaoMemoria.getInstance()

        const { default: UsuariosDaoMemoria } = await import ('./usuarios/UsuariosDaoMemoria.js')
        usuariosDao = UsuariosDaoMemoria.getInstance()

        const { default: CarritosDaoMemoria } = await import ('./carritos/CarritosDaoMemoria.js')
        carritosDao = CarritosDaoMemoria.getInstance()

        break
}

export { productosDao, ordenesCompraDao, chatDao, usuariosDao, carritosDao }

