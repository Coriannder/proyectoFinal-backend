let instance = null

export class LogoutController {

    static getInstance = () => {
		if (!instance) instance = new LogoutController;
		return instance;
	}

    renderLogout = ( req , res ) => {
        res.render('pages/logout', { nombre : req.session.nombre})
        req.session.destroy()
    }
}



