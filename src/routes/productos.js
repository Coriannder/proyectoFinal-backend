import { Router } from 'express'
import { ProductosController } from '../controller/productos.js'

const products = Router()
const productosController = ProductosController.getInstance()

export class RouterProductos{

    static start() {

        products.get('/' , productosController.getProducts)
        products.post('/add' , productosController.addProduct)
        products.put('/update/:id' , productosController.updateProduct)
        products.delete('/delete/:id' , productosController.deleteProduct)
        

        return products
    }
}