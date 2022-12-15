import config from '../../config/config.js'

let productosDao
let carritosDao = ''
let chatDao
let usuariosDao

switch ( config.PERSISTANCE ) {

    case 'mongo':

        const {default: ProductosDaoMongoDb} = await import ('./productos/ProductosDaoMongoDb.js')
        productosDao = ProductosDaoMongoDb.getInstance()


        const { default: CarritosDaoMongoDb } = await import ('./carritos/CarritosDaoMongoDb.js')
        carritosDao = CarritosDaoMongoDb.getInstance()

        const { default: ChatDaoMongoDb } = await import ('./chat/ChatDaoMongoDb.js')
        chatDao = ChatDaoMongoDb.getInstance()

        const { default: UsuariosDaoMongoDb } = await import ('./usuarios/UsuariosDaoMongoDb.js')
        usuariosDao = UsuariosDaoMongoDb.getInstance()

        break

    case 'memoria':

        const {default: ProductosDaoMemoria} = await import ('./productos/ProductosDaoMemoria.js')
        productosDao = ProductosDaoMemoria.getInstance()

        const { default: CarritosDaoMemoria } = await import ('./carritos/CarritosDaoMemoria.js')
        carritosDao = CarritosDaoMemoria.getInstance()

        const { default: ChatDaoMemoria } = await import ('./chat/ChatDaoMemoria.js')
        chatDao = ChatDaoMemoria.getInstance()

        const { default: UsuariosDaoMemoria } = await import ('./usuarios/UsuariosDaoMemoria.js')
        usuariosDao = UsuariosDaoMemoria.getInstance()

        break
}

export { productosDao, carritosDao, chatDao, usuariosDao }

