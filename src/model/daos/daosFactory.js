import { persistance } from '../../utils/yargs.js'

let productosDao
let carritosDao = ''
let mensajesDao
let usuariosDao

switch ( persistance ) {

    case 'mongo':

        const {default: ProductosDaoMongoDb} = await import ('./productos/ProductosDaoMongoDb.js')
        productosDao = ProductosDaoMongoDb.getInstance()


        const { default: CarritosDaoMongoDb } = await import ('./carritos/CarritosDaoMongoDb.js')
        carritosDao = CarritosDaoMongoDb.getInstance()

        /* const { default: MensajesDaoMongoDb } = await import ('./mensajes/MensajesDaoMongoDb.js')
        mensajesDao = new MensajesDaoMongoDb() */

        const { default: UsuariosDaoMongoDb } = await import ('./usuarios/UsuariosDaoMongoDb.js')
        usuariosDao = UsuariosDaoMongoDb.getInstance()

        break

    case 'memoria':

        const {default: ProductosDaoMemoria} = await import ('./productos/ProductosDaoMemoria.js')
        productosDao = ProductosDaoMemoria.getInstance()

        const { default: CarritosDaoMemoria } = await import ('./carritos/CarritosDaoMemoria.js')
        carritosDao = CarritosDaoMemoria.getInstance()

        /* const { default: MensajesDaoMongoDb } = await import ('./mensajes/MensajesDaoMongoDb.js')
        mensajesDao = new MensajesDaoMongoDb() */

        const { default: UsuariosDaoMemoria } = await import ('./usuarios/UsuariosDaoMemoria.js')
        usuariosDao = UsuariosDaoMemoria.getInstance()

        break
}

export {productosDao, carritosDao, mensajesDao, usuariosDao }

