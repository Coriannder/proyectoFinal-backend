import { HomeServices } from "../services/home.js"

let instance = null

export class HomeController {

    constructor() {
        this.homeServices = HomeServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new HomeController;
		return instance;
	}

    getHome = async (req, res) => {
        if(req.isAuthenticated()){

            console.log('req.user' , req.user)

            console.log('req.session',req.session)

            const user = req.session.passport.user
            const products = await this.homeServices.getUserNameAndProducts(user)

            res.render('pages/home', {
                ...products,
                active: 'home' //pestana activa de NAVBAR
            })
        } else {
            res.redirect('/login' )
        }
    }
}



