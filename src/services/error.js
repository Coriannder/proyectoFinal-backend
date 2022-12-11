
import fs from 'fs'
let instance = null

export class ErrorServices{

    static getInstance = () => {
		if (!instance) instance = new ErrorServices;
		return instance;
	}

    deleteFile = ( route , fileName ) => {
        if(route == 'register') {
            fs.unlinkSync('public/uploads/' + fileName)
        }
    }
}

