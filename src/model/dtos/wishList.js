
export default class WhishListDto {

    constructor(lista) {
        this.user = lista.user,
        this.productos = lista.productos,
        this.total = lista.total
    }

    static asDto(listas) {
        if (Array.isArray(listas)) {
            return listas.map(lista => new WhishListDto( lista ))
        } else {
            return new WhishListDto( listas )
        }
    }
}