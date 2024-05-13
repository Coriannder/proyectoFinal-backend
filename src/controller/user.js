

let instance = null
export class UserController {
    constructor() {
        //this.loginServices = LoginServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new UserController;
		return instance;
	}

    getUserId = (req, res) => {
        console.log('req.user-----------' , req.user)
        res.send({id: req.user.id})
    }

}