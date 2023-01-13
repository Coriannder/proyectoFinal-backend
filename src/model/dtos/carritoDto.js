
export default class CarritoDto {

    constructor(carrito) {
        this.id = carrito.id
        this.user = carrito.user,
        this.productos = carrito.productos,
        this.total = carrito.total
    }

    static asDto(carritos) {
        if (Array.isArray(carritos)) {
            return carritos.map(carrito => new CarritoDto( carrito ))
        } else {
            return new CarritoDto( carritos )
        }
    }
}