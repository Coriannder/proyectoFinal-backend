import config from "../config/config.js"

let instance = null

export class ConfigServices {
    constructor(){}

    static getInstance = () => {
		if (!instance) instance = new ConfigServices;
		return instance;
	}

    getData = () => {
        return {
            NODE_ENV: config.NODE_ENV,
            PERSISTANCE: config.PERSISTANCE,
            PORT: config.PORT,
            URL_MONGO: config.URL_MONGO,
            USER_MAILADMIN: config.USER_MAILADMIN,
        }
    }
}
