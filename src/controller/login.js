
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
    
    postLogin = async (req, res) => {
        const { email , password } = req.body
        const token = await this.loginServices.getToken( email , password )
        return res.json(token)
    }
}



