import { Server } from "socket.io";
import { ChatsServices } from "../services/chat.js";

const chatServices = ChatsServices.getInstance()


export const chatWebsocket = (httpServer) => {

    const io = new Server(httpServer);

    io.on('connection', async socket => {
        console.log('Nuevo cliente conectado!')

        /* Envio los mensajes al cliente que se conectó */
        const chatArray = await chatServices.getAllChat()
        socket.emit('messages', chatArray)


        /* Escucho el nuevo mensaje de chat enviado por el cliente y se los propago a todos */
        socket.on('newMessage', async res =>{

            const message = await chatServices.saveNewMessage(res)
            chatArray.push(message)
            io.sockets.emit('messages', chatArray)
        })
    })

    return io
}





