import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

let instance = null;
class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor () {
        super('carritos', {
            total: { type: Number , required: true },
            productos: { type: [], required: true },
            user: {type: String, required: true}
        })
    }

    static getInstance() {
		if (!instance) instance = new CarritosDaoMongoDb;
		return instance;
	}
}

export default CarritosDaoMongoDb