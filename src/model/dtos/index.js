import UsuarioDto from "./usuarioDto.js"
import ProductoDto from "./productoDto.js"
import CarritoDto from "./carritoDto.js"
import ChatDto from "./chatDto.js"


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

            case 'carritos':
                objectAsDto = CarritoDto.asDto(object)
                break

            case 'Productos':
                objectAsDto = ProductoDto.asDto(object)
                break

            case 'Chats':
                objectAsDto = ChatDto.asDto(object)
                break

            default: return 'error'
        }

        return objectAsDto

    }
}

