
let instance = null

export class ErrorServices{

    static getInstance = () => {
		if (!instance) instance = new ErrorServices;
		return instance;
	}
}

