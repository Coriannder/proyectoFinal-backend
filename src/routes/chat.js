import { Router } from 'express'
import { ChatController } from '../controller/chat.js'

const chat = Router()
const chatController = ChatController.getInstance()

export class RouterChat{

    static start() {
        chat.get('/' , chatController.renderChat)
        return chat
    }
}