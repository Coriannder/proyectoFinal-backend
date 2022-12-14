import { ChatsServices } from "../services/chat.js";

let instance = null

export class ChatController {

    constructor(){
        this.chatServices = ChatsServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new ChatController;
		return instance;
	}

    renderChat = async ( req , res ) => {

        const user = req.session.passport.user
        const nombre = await this.chatServices.getUserName(user)

        res.render('pages/chat', {
            user: user,
            nombre : nombre,
            active: 'chat'
        })
    }
}