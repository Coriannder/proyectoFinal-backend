import { ConfigServices } from '../services/config.js'

let instance = null

export class ConfigController{

    constructor() {
        this.configServices = ConfigServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new ConfigController;
		return instance;
	}

    getConfig = (req, res ) => {
        const data = this.configServices.getData()
        res.json(data)
    }
}