import express from 'express'
import { Server as HttpServer }  from 'http'
import session from 'express-session'
import { mongoSession } from './middleware/mongoSession.js'
import passport from 'passport'
import { port } from './config/config.js'
import { LoginRouter } from './routes/login.js'
import {  RegisterRouter } from './routes/register.js'
import { ErrorRouter } from './routes/error.js'
import { HomeRouter } from './routes/home.js'
import { RouterCart } from './routes/cart.js'
import cluster from 'cluster'
import { cpus } from 'os'
import { logger } from './utils/logger.js'
import { mode } from './utils/yargs.js'
import { LogoutRouter } from './routes/logout.js'


const app = express()
const httpServer = new HttpServer(app)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


//------------------Configuracion EJS--------------------//
app.set('views', './views')
app.set('view engine', 'ejs')


//-----------------Session-------------------------------//
app.use(session(mongoSession))

//-----------------Passport------------------------------//
app.use(passport.initialize())
app.use(passport.session())

//------------------------------RUTAS---------------------//
app.use( '/login', LoginRouter.start() )
app.use( '/logout' , LogoutRouter.start())
app.use( '/register' , RegisterRouter.start() )
app.use( '/error' , ErrorRouter.start() )
app.use( '/home' , HomeRouter.start() )
app.use( '/cart' , RouterCart.start() )
app.get('*', (req, res) => {
    res.redirect('/login')
})


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

        const server = httpServer.listen(port, ()=>{
            logger.info(`Servidor escuchando en el puerto ${server.address().port}`, `numero de cpus ${numCPUs}`)
        })
        server.on(`error`, error => logger.fatal(`Error en servidor: ${error}`))
    }

} else {

    //------------------Configuracion Server---------------------------------//

    const server = httpServer.listen(port, () => {
        try {
            logger.info(`Servidor escuchando en el puerto ${server.address().port}`, `numero de cpus ${numCPUs}`)
        } catch (error) {
            logger.fatal('Error en servidor' , error)
        }
    })
    server.on(`error`, error => logger.fatal(`Error en servidor: ${error}`))

}