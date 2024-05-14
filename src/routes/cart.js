import { Router } from 'express'
import { CartController} from '../controller/cart.js'
import { authentication } from '../middleware/auth.js'



const cart = Router()
const cartController =  CartController.getInstance()

export class RouterCart {

    static start() {
        cart.get('/' , cartController.getCart)
        cart.post('/add', cartController.addProduct )
        cart.delete('/delete/:id', cartController.deleteProduct )
        cart.post('/buy' , cartController.buyCart )
        cart.post('/buy', cartController.buyCart )
        return cart
    }
}
