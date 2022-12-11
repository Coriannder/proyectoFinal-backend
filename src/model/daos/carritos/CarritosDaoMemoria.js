import ContenedorMemoria from "../../container/ContenedorMemoria.js";

let instance = null;

class CarritosDaoMemoria extends ContenedorMemoria {

    constructor () {
        super('carritos')
    }

    static getInstance() {
		if (!instance) instance = new CarritosDaoMemoria;
		return instance;
	}
}

export default CarritosDaoMemoria
