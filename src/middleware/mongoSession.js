
import MongoStore from 'connect-mongo'
import config from '../config/config.js'

export const mongoSession = {
    // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    store: MongoStore.create(
        {
            mongoUrl: config.URL_MONGO,
            mongoOptions: { useNewUrlParser: true , useUnifiedTopology: true}
        }),
    secret: config.SECRET_SESSION_MONGO,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: config.SESSIONTIME
    }
}