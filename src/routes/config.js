import { Router } from 'express'
import { ConfigController } from '../controller/config.js'

const config = Router()
const configController = ConfigController.getInstance()

export class ConfigRouter{

    static start() {
        config.get('/' , configController.getConfig)
        return config
    }
}