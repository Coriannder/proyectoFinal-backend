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

    post = async ( req , res ) => {
        const {email , password } = req.body
        const result = await this.registerServices.post( email, password )
        res.json(result)
    }
}