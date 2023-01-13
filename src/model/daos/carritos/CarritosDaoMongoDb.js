import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

let instance = null;
class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('Carritos', {
            user: {type: String, required: true},
            productos: {type: Array, required: true},
            total: {type: Number, required: true},
        })
    }

    static getInstance() {
		if (!instance) instance = new CarritosDaoMongoDb;
		return instance;
	}
}

export default CarritosDaoMongoDb
