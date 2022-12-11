import { persistance } from "../../utils/yargs.js"


export default class ProductoDto {

    constructor( productos ) {

        this.price = productos.price
        this.title = productos.title
        this.thumbnail = productos.thumbnail
        this.id = productos.id

    }

    static asDto(productos) {
        if (Array.isArray(productos)) {
            return productos.map(producto => new ProductoDto(producto))
        } else {
            return new ProductoDto( productos )
        }
    }
}

