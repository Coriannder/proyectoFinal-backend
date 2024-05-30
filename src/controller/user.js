

let instance = null
export class UserController {
    constructor() {
    }

    static getInstance = () => {
		if (!instance) instance = new UserController;
		return instance;
	}

    getUserId = (req, res) => {
        res.send({id: req.user.id})
    }

}