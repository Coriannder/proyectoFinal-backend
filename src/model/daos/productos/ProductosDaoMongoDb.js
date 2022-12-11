import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

let instance = null;

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('Productos', {
            price: {type: Number, required: true},
            title: {type: String, required: true},
            thumbnail: {type: String, required: true}
        })
    }

    static getInstance() {
		if (!instance) instance = new ProductosDaoMongoDb;
		return instance;
	}
}

export default ProductosDaoMongoDb