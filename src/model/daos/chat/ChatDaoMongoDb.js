import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

let instance = null;

class ChatDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('Chats', {
            email: {type: String, required: true},
            type: {type: String, required: true},
            date: {type: String, required: true},
            body: {type: String}
        })
    }

    static getInstance() {
		if (!instance) instance = new ChatDaoMongoDb;
		return instance;
	}
}

export default ChatDaoMongoDb