import Dto from "../dtos/index.js";
class ContenedorMemoria {

    constructor(nombreCollection) {
        this.elementos = []
        this.dto = new Dto(nombreCollection)
    }

    async listar(id) {
        const elem = this.dto.transform(this.elementos.find(elem => elem.id == id))
        return [elem] || false;
    }

    async listarAll() {
        return this.dto.transform([...this.elementos])
    }

    async guardar(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = '1'
        } else {
            newId = (Number(this.elementos[this.elementos.length - 1].id) + 1).toString()
        }

        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return this.dto.transform(newElem)
    }

    async actualizar(id , elemento) {
        const index = this.elementos.findIndex(p => p.id == id)
        if (index == -1) {
            return false
        } else {

            const keys = Object.keys(elemento)
            for( let i = 0 ; i < keys.length ; i++ ){
                (this.elementos[index])[keys[i]] = elemento[keys[i]]
            }
            return true
        }
    }

    async borrar(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            return false
        } else {
            return this.dto.transform(this.elementos.splice(index, 1))
        }
    }

    async borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria