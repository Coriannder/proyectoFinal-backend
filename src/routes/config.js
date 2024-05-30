import { Router } from 'express'
import { ConfigController } from '../controller/config.js'
import { authentication } from '../middleware/auth.js'

const config = Router()
const configController = ConfigController.getInstance()

export class ConfigRouter{

    static start() {
        config.get('/' , authentication ,configController.getConfig)
        return config
    }
}