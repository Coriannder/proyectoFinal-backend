
import { LoginServices } from "../services/login.js";


let instance = null
export class LoginController {
    constructor() {
        this.loginServices = LoginServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new LoginController;
		return instance;
	}

    getLogin = (req, res) => {
        res.render('pages/login', {invalidCredentials: false})
    }

    getLoginError= (req, res) => {
        res.render('pages/login', {invalidCredentials: true})
    }

    postLogin = async (req, res) => {
        const { email , password } = req.body
        const token = await this.loginServices.getToken( email , password )
        return res.json(token)
    }
}



