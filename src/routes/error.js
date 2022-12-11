import { Router } from 'express'
import { ErrorController } from '../controller/error.js'

const error = Router()
const errorController = ErrorController.getInstance()

export class ErrorRouter{

    static start() {
        error.get('/' , errorController.getError)
        return error
    }
}

