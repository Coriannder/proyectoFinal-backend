import ContenedorMemoria from "../../container/ContenedorMemoria.js";

let instance = null;

class UsuariosDaoMemoria extends ContenedorMemoria {

    constructor () {
        super('Usuarios')
    }

    static getInstance() {
		if (!instance) instance = new UsuariosDaoMemoria;
		return instance;
	}
}

export default UsuariosDaoMemoria