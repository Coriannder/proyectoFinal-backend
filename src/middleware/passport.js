import passport from 'passport'
import { usuariosDao } from '../model/daos/daosFactory.js'
import  { Strategy as LocalStrategy } from 'passport-local'
import { isValidPassword } from '../utils/crypt.js'


passport.use('login' , new LocalStrategy( async ( username , password , done) => {

    const users = await usuariosDao.listarAll()
    if(!users) return done( Error('error'))
    const user = users.find(user => user.email === username)
    if(!user) return done(null , false)
    if(!isValidPassword(password , user.password)) return done(null, false)
    return done(null, user.id)

}))

passport.serializeUser(( user, done ) => {
    done(null, user)
})

passport.deserializeUser( async (id, done) => {
    done(null, await usuariosDao.listar(id))
})

export const authenticate = passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/error'
})