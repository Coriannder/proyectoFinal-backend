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

        //const {message , route } = req.body

        res.send(req.body)

        //const route = req.session.route
        /* res.render('pages/error' , {
            message: message,
            route: route
        }) */
        //req.session.destroy()
    }
}

