import { RegisterServices } from "../services/register.js"

let instance = null
export class RegisterController {

    constructor () {
        this.registerServices = RegisterServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new RegisterController;
		return instance;
	}

    saveNewUser = async ( req , res  ) => {

        const newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            edad: req.body.edad,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.telefono
        }
        console.log('req.body' , req.body)
        const response = await this.registerServices.saveNewUser( newUser )
        console.log('response register' , response)

        if(response.error){
            req.session.message = response.message
            req.session.route = response.route
            res.redirect('/error')

        }else{
            res.redirect('/login')
        }
    }

    render = ( req, res ) => {
        res.render('pages/register')
    }
}