import { Router } from 'express'
import { CartController} from '../controller/cart.js'
import { authentication } from '../middleware/auth.js'


const cart = Router()
const cartController =  CartController.getInstance()

export class RouterCart {

    static start() {
        cart.get('/' , authentication, cartController.getCart)
        cart.post('/addproduct', authentication, cartController.addProduct )
        cart.delete('/deleteproduct/:id', authentication, cartController.deleteProduct )
        cart.post('/buy', authentication, cartController.buyCart )
        return cart
    }
}
