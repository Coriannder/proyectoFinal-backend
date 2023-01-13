import ContenedorMemoria from "../../container/ContenedorMemoria.js";

let instance = null;

class OrdenesCompraDaoMemoria extends ContenedorMemoria {

    constructor () {
        super('OrdenesCompra')
    }

    static getInstance() {
		if (!instance) instance = new OrdenesCompraDaoMemoria;
		return instance;
	}
}

export default OrdenesCompraDaoMemoria
