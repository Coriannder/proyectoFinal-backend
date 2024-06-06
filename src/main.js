import express from 'express'
import { Server as HttpServer }  from 'http'
//import session from 'express-session'
import passport from 'passport'
import config from './config/config.js'
import { LoginRouter } from './routes/login.js'
import {  RegisterRouter } from './routes/register.js'
import { RouterCart } from './routes/cart.js'
import { ConfigRouter } from './routes/config.js'
import { RouterProductos } from './routes/products.js'
import cluster from 'cluster'
import { cpus } from 'os'
import { logger } from './utils/logger.js'
import { mode } from './utils/yargs.js'
import { LogoutRouter } from './routes/logout.js'
import { chatWebsocket } from './utils/chat.js'
//import cors from 'cors'
import { productosDao  } from './model/daos/daosFactory.js'
import { createManyProducts } from './mocks/productosMocks.js'

console.log('config.PERSISTANCE' , config.PERSISTANCE)

// Mockeo 5 productos para trabajar en memoria
if( config.PERSISTANCE === 'memoria') createManyProducts(5).forEach(async elem => { const pp = await productosDao.guardar(elem)})

const app = express()

const httpServer = new HttpServer(app)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
//if(config.NODE_ENV == 'development')
//app.use(cors())

/* app.use(cors({
    // Permitir todas las solicitudes de origen
    origin: '*',
    // Permitir el encabezado Authorization
    allowedHeaders: 'Authorization',
})); */


//------------------Configuracion EJS--------------------//
app.set('views', './views')
app.set('view engine', 'ejs')

//-----------------Session-------------------------------//
//app.use(session(mongoSession))

//-----------------Passport------------------------------//


app.use(passport.initialize())
//app.use(passport.session())

//------------------------------RUTAS---------------------//
app.use( '/login', LoginRouter.start() )
app.use( '/logout', LogoutRouter.start())
app.use( '/register', RegisterRouter.start() )
app.use( '/cart', RouterCart.start() )
app.use( '/config', ConfigRouter.start())
app.use( '/products',  RouterProductos.start())

app.get('*' , (req, res) => {
    res.status(404).send('REQUEST NOT FOUND')
})

//-------------------------WEBSOCKET----------------------------//
const io = chatWebsocket(httpServer)

//--------------------------Modo CLUSTER------------------------//

const numCPUs = cpus().length;

if( mode === 'cluster' ){
    if (cluster.isPrimary) {
        logger.info(`Primary ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.info(`worker ${worker.process.pid} died`);
            cluster.fork();
            logger.info(`worker ${worker.process.pid} is running`);
        });

    } else {
//------------------Configuracion Server---------------------------------//

        const server = httpServer.listen(process.env.PORT, ()=>{
            logger.info(`Servidor escuchando en el puerto ${server.address().port}`, `numero de cpus ${numCPUs}`)
        })
        server.on(`error`, error => logger.fatal(`Error en servidor: ${error}`))
    }

} else {

    //------------------Configuracion Server---------------------------------//

    const server = httpServer.listen(config.PORT, () => {
        try {
            logger.info(`Servidor escuchando en el puerto ${server.address().port}`, `numero de cpus ${numCPUs}`)
        } catch (error) {
            logger.fatal('Error en servidor' , error)
        }
    })
    server.on(`error`, error => logger.fatal(`Error en servidor: ${error}`))

}