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

        const route = req.session.route
        res.render('pages/error' , {
            message: req.session.message || 'Error',
            route: req.session.route || 'login'
        })
        req.session.destroy()
    }
}

