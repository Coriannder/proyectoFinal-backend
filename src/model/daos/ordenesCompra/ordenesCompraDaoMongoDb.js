import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

let instance = null;
class OrdenesCompraDaoMongoDb extends ContenedorMongoDb {

    constructor () {
        super('OrdenesCompra', {
            total: { type: Number , required: true },
            productos: { type: [], required: true },
            user: {type: String, required: true}
        })
    }

    static getInstance() {
		if (!instance) instance = new OrdenesCompraDaoMongoDb;
		return instance;
	}
}

export default OrdenesCompraDaoMongoDb