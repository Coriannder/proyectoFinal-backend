import config from '../config/config.js'

let instance = null

export class ConfigController{

    constructor() {
        this.config = {

            NODE_ENV: config.NODE_ENV,
            PERSISTANCE: config.PERSISTANCE,
            PORT: config.PORT,
            URL_MONGO: config.URL_MONGO,
            USER_MAILADMIN: config.USER_MAILADMIN,
        }
    }

    static getInstance = () => {
		if (!instance) instance = new ConfigController;
		return instance;
	}

    getConfig = (req, res ) => {
        if(req.isAuthenticated()){
            res.json(this.config)
        } else {
            res.redirect('/login' )
        }
    }
}