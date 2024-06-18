import * as dotenv from 'dotenv'
dotenv.config()
import { NODE_ENV , PERSISTANCE , PORT , SESSIONTIME } from '../utils/yargs.js'

let persistance
let port
let node_env

if(NODE_ENV === 'production'){
    persistance = 'mongo'
    port = 8083
    node_env = NODE_ENV
} else {
    persistance = PERSISTANCE
    port = PORT
}

export default {
    NODE_ENV: node_env || process.env.NODE_ENV,
    PERSISTANCE: persistance || process.env.PERSISTANCE,
    PORT: port || process.env.PORT,
    URL_MONGO: process.env.URL_MONGO,
    SECRET_SESSION_MONGO: process.env.SECRET_SESSION_MONGO,
    USER_MAILADMIN: process.env.USER_MAILADMIN,
    PASS_MAILADMIN: process.env.PASS_MAILADMIN,
    SESSIONTIME: Number(SESSIONTIME || process.env.SESSIONTIME)*60000,
    SECRET_JWT: process.env.SECRET_JWT
}