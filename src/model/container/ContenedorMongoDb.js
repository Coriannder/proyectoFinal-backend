import mongoose from 'mongoose'
import transformMongoObject from '../../utils/objectUtils.js'
import { urlMongo } from '../../config/config.js'
import { logger } from '../../utils/logger.js'
import Dto from '../dtos/index.js'




await  mongoose.connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => logger.info('Base de datos MONGO conectada'))
.catch(err => logger.error("Base de datos MONGO no conectada"))


class ContenedorMongoDb {
    constructor (nombreCollection, squema) {
        this.collection = mongoose.model(nombreCollection, squema)
        this.dto = new Dto(nombreCollection)
    }

    async listar(id) {
        try {
            const res = await this.collection.find({_id: id})

            return  this.dto.transform(transformMongoObject(res))
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async listarAll() {
        try {
            const res = await this.collection.find({})
            if(res.length == 0){
                return res
            }else{
                return  this.dto.transform(transformMongoObject(res))
            }
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async guardar(elemento) {
        try {
            const res = await this.collection.create(elemento)
            return  this.dto.transform(transformMongoObject(res))
        } catch (error) {
            logger.error(error )
            return false
        }
    }

    async actualizar(id, elemento) {
        try {
            const res = await this.collection.updateOne({_id: id} , { $set: elemento })
            return res.acknowledged
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async borrar(id) {
        try {
            const res = await   this.collection.deleteOne({_id: id})
            return res.acknowledged
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async borrarTodo() {
        try {
            const res = await   this.collection.deleteMany()
            return res.acknowledged
        } catch (error) {
            logger.error(error)
            return false
        }
    }
}

export default ContenedorMongoDb
