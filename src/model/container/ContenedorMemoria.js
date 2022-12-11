import Dto from "../dtos/index.js";



class ContenedorMemoria {

    constructor(nombreCollection) {
        this.elementos = []
        this.dto = new Dto(nombreCollection)
    }

    async listar(id) {
        const elem = this.dto.transform(this.elementos.find(elem => elem.id == id))
        return elem || false;
    }

    async listarAll() {
        return this.dto.transform([...this.elementos])
    }

    async guardar(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return this.dto.transform(newElem)
    }

    async actualizar(elem) {
        const newElem = { ...elem, id: Number(elem.id) }
        const index = this.elementos.findIndex(p => p.id == elem.id)
        if (index == -1) {
            return false
        } else {
            this.elementos[index] = newElem
            return this.dto.transform(newElem)
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