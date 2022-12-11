import { persistance } from "../../utils/yargs.js"

export default class CarritoDto {

    constructor( carrito ) {

        this.total = carrito.total
        this.productos = carrito.productos
        this.user = carrito.user
        this.id = carrito.id

    }

    static asDto( carritos ) {
        if (Array.isArray(carritos)) {
            return carritos.map( carrito => new CarritoDto( carrito ))
        } else {
            return new CarritoDto( carritos )
        }
    }

}