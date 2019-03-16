/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 14/03/2019
*/
const { readFileSync, writeFileSync } = require("fs")


class DataBase {

    constructor() {
        this.NameArchive = "herois.json"
    }

    async getData() {
        const Archive = await readFileSync(this.NameArchive)
        return await JSON.parse(Archive.toString())
    }

    async writeData(newData) {
        await writeFileSync(this.NameArchive, JSON.stringify(newData))
    }

    async toRegister(hero) {
        const id = hero.id//<10 ? hero.id: Date.now()
        const heroId = { ...hero, id }

        const data = await this.getData()
        const indice = data.findIndex((item) => item.id == hero.id)
        if (!(indice == -1)) {//só cadastra novos herois, ao seja id diferentes
            throw Error(" já existe um heroi com este ID")
        }
        data.push(heroId)
        await this.writeData(data)
    }

    async list(idOrName) {
        const data = await this.getData()
        const list = data.filter(
            (item => idOrName ? (item.id == parseInt(idOrName) || item.name == idOrName) : true))
    }

    async remove(id, Name) {
        if (!(id || Name)) {
            this.writeData([])
            return
        }
        const data = await this.getData()
        const indice = data.findIndex((item) => item.id == parseInt(id) || item.name == Name)
        if (indice == -1) {
            throw Error("o heroi não existe")
        }
        const rm = data.splice(indice, 1)
        await this.writeData(data)
        return rm
    }
    async actualize(actualize, idOrName) {
        const data = await this.getData()
        const indice = data.findIndex((item) => item.id == idOrName || item.name == idOrName)
        if (indice == -1) {
            throw Error("o heroi não existe")
        }
        const heroid = data[indice]
        actualize = { ...heroid,// abaixo atualiza apenas as novas informações
            power : actualize.power!=undefined ? actualize.power : heroid.power ,
            name  : actualize.name!=undefined ? actualize.name : heroid.name,
            id    : actualize.id!=undefined ? actualize.id : heroid.id
        }
        data.splice(indice, 1, actualize)
        await this.writeData(data)
        return actualize
    }
}

module.exports = new DataBase()