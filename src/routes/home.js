import { Router } from 'express'
import { HomeController } from '../controller/home.js'


const home = Router()
const homeController = HomeController.getInstance()

export class HomeRouter{

    static start = () => {
        home.get('/' , homeController.getHome)

        return home
    }
}

