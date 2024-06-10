import { ErrorServices } from "../services/error.js"

let instance = null

export class ErrorController{

    constructor() {
        this.errorServices = ErrorServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new ErrorController;
		return instance;
	}

    getError = (req, res ) => {
        res.render('pages/error' , {
            message: req.session.message || 'Error de credenciales',
            route: req.session.route || 'login'
        })
        req.session.destroy()
    }
}

