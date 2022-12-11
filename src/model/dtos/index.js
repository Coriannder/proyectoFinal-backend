import UsuarioDto from "./usuarioDto.js"
import ProductoDto from "./productoDto.js"
import CarritoDto from "./carritoDto.js"


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

            default: return 'error'
        }

        /* if(objectAsDto.length === 1) {
            return objectAsDto[0]
        } else{ */
            return objectAsDto
        /* } */

    }
}



/* import UsuarioDto from './usuarioDto.js'

export let asDto

switch ( 'Usuarios' ) {

    case 'Usuarios':

        const { default: UsuarioDto } = await import ('./usuarioDto.js')
        asDto = UsuarioDto.asDto()

        break
} */
