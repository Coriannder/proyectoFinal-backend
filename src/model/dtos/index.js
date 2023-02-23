import UsuarioDto from "./usuarioDto.js"
import ProductoDto from "./productoDto.js"
import CarritoDto from "./carritoDto.js"
import ChatDto from "./chatDto.js"
import OrdenCompraDto from "./ordenCompraDto.js"


export default class Dto {

    constructor( typeDto ){
        this.typeDto = typeDto
    }


    transform = (object) => {

        let objectAsDto

        switch(this.typeDto) {
            case 'Usuarios':
                objectAsDto = UsuarioDto.asDto(object)
                break

            case 'Carritos':
                objectAsDto = CarritoDto.asDto(object)
                break

            case 'Productos':
                objectAsDto = ProductoDto.asDto(object)
                break

            case 'Chats':
                objectAsDto = ChatDto.asDto(object)
                break

            case 'OrdenesCompra':
                objectAsDto = OrdenCompraDto.asDto(object)
                break

            default: return ''
        }

        return objectAsDto

    }
}

