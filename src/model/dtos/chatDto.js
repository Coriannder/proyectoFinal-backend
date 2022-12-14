
export default class ChatDto {

    constructor( message ) {

        this.id = message.id
        this.email = message.email
        this.type = message.type
        this.date = message.date
        this.body = message.body

    }

    static asDto( messages ) {
        if (Array.isArray(messages)) {
            return messages.map( message => new ChatDto( message ))
        } else {
            return new ChatDto( messages )
        }
    }

}