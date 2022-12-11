
import { LoginServices } from "../services/login.js"


let instance = null
export class LoginController {
    constructor() {
        this.loginServices = LoginServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new LoginController;
		return instance;
	}

    postLogin = async (req, res, next) => {

        const email = req.body.username
        const password = req.body.password

        const response = this.loginServices.autenticar( email , password)

        req.session.message = response.message
        req.session.route = response.route

        next();
    }

    getLogin = (req, res) => {
        res.render('pages/login')
    }
}



