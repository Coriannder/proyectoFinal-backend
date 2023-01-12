
export default class OrdenesCompraDto {

    constructor( orden ) {

        this.total = orden.total
        this.productos = orden.productos
        this.user = orden.user
        this.id = orden.id

    }

    static asDto( ordenes ) {
        if (Array.isArray(ordenes)) {
            return ordenes.map( orden => new OrdenesCompraDto( orden ))
        } else {
            return new OrdenesCompraDto( ordenes )
        }
    }

}