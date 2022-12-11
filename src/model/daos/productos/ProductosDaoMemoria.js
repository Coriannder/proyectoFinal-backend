import ContenedorMemoria from "../../container/ContenedorMemoria.js";

let instance = null;

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor () {
        super('Productos')
    }

    static getInstance() {
		if (!instance) instance = new ProductosDaoMemoria;
		return instance;
	}
}

export default ProductosDaoMemoria

