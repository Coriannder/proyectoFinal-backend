import { Router } from 'express'
import { ProductosController } from '../controller/productos.js'
import { authentication } from '../middleware/auth.js'

const products = Router()
const productosController = ProductosController.getInstance()

export class RouterProductos{

    static start() {
        products.get('/' , productosController.getProducts)
        products.post('/add', authentication, productosController.addProduct)
        products.put('/update/:id', authentication, productosController.updateProduct)
        products.delete('/delete/:id', authentication, productosController.deleteProduct)
        return products
    }
}