
let instance = null
export class LoginController {
    constructor() {
    }

    static getInstance = () => {
		if (!instance) instance = new LoginController;
		return instance;
	}

    getLogin = (req, res) => {
        res.render('pages/login')
    }
}



