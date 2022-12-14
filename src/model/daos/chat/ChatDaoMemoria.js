import ContenedorMemoria from "../../container/ContenedorMemoria.js";

let instance = null;

class ChatDaoMemoria extends ContenedorMemoria {
    constructor () {
        super('Chats')
    }

    static getInstance() {
		if (!instance) instance = new ChatDaoMemoria;
		return instance;
	}
}

export default ChatDaoMemoria