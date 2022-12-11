import { Router } from 'express'
import { CartController} from '../controller/cart.js'



const cart = Router()
const cartController =  CartController.getInstance()

export class RouterCart {

    static start() {
        cart.get('/' , cartController.getCart)
        cart.post('/addProduct' , cartController.addProduct )
        cart.delete('/deleteProduct/:id' , cartController.deleteProduct )
        cart.post('/buy' , cartController.buyCart )
        return cart
    }
}
