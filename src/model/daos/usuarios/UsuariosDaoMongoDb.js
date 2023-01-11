import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

let instance = null;
class UsuariosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('Usuarios', {
            nombre: {type: String, required: true},
            direccion: {type: String, required: true},
            edad: {type: Number, required: true},
            email: {type: String, required: true, index: { unique: true }},
            password: {type: String, required: true },
            phone: {type: Number, required: true}
        })
    }

    static getInstance() {
		if (!instance) instance = new UsuariosDaoMongoDb;
		return instance;
	}
}

export default UsuariosDaoMongoDb