import { persistance } from "../../utils/yargs.js"

export default class UsuarioDto {

    constructor(usuario) {
        this.id = usuario.id
        this.nombre = usuario.nombre
        this.direccion = usuario.direccion
        this.edad = usuario.edad
        this.email = usuario.email
        this.photo = usuario.photo
        this.phone = usuario.phone
        this.password = usuario.password
    }

    static asDto(usuarios) {
        if (Array.isArray(usuarios)) {
            return usuarios.map(usuario => new UsuarioDto(usuario))
        } else {
            return new UsuarioDto( usuarios )
        }
    }
}
