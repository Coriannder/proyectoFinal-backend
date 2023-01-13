
export default class OrdenCompraDto {

    constructor( orden ) {
        this.id = orden.id
        this.total = orden.total
        this.productos = orden.productos
        this.user = orden.user
    }

    static asDto( ordenes ) {
        if (Array.isArray(ordenes)) {
            return ordenes.map( orden => new OrdenCompraDto( orden ))
        } else {
            return new OrdenCompraDto( ordenes )
        }
    }
}