import passport from 'passport'
import { Strategy as JwtStrategy , ExtractJwt } from 'passport-jwt'
import config from '../config/config.js';
import { usuariosDao } from '../model/daos/daosFactory.js';


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.SECRET_JWT;

passport.use( new JwtStrategy( opts, async ( token,  done) => {
    try {

        const tokenExpiration = token.exp + config.SESSIONTIME
        const currentDateTime = Date.now();
        if (currentDateTime > tokenExpiration) return done(null, false, { message: 'Token expirado' });
        const userDto = await usuariosDao.listar( token.user.id )
        if(!userDto) done(null, false)
        done(null, token.user)
    } catch (err) {
        done(err)
    }
}))


export const authentication = (req, res, next) => {

    passport.authenticate('jwt' , {session: false } , (err, user, info) => {
    if (err) {
        return res.status(401).send(err)
    }
    if (!user) {
        return res.status(401).send(info);
    }
    req.userId = user.id
    next()
    })(req, res, next);
}

