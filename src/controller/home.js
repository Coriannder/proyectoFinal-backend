//import passport from "passport";
import { HomeServices } from "../services/home.js"
import { ProductosServices } from "../services/productos.js"
import { UserServices } from "../services/user.js"
//import { authenticateToken } from "../middleware/auth.js";

let instance = null

export class HomeController {

    constructor() {
        this.homeServices = HomeServices.getInstance()
        this.productosServices = ProductosServices.getInstance()
        this.userServices = UserServices.getInstance()
    }

    static getInstance = () => {
		if (!instance) instance = new HomeController;
		return instance;
	}

    getHome = async (req, res) => {
        const { id } = req.query
   
        const productos = await this.productosServices.obtenerProductos()
        const userName = await this.userServices.getName(id)

        if(!id || !userName) return res.redirect('/login')
        return  res.render('pages/home' , { productos, nombre: userName , active: 'home'} )
    }
}
