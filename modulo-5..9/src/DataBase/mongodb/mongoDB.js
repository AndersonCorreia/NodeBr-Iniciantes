const IDataBase = require("./../IDataBase.js")
const mongoose = require("mongoose")

const STATUS = ["disconectado", "conectado", "conectando", "disconectando"]

class MongoDB extends IDataBase {
    constructor(conection , Schema) {
        super()
        this._schema = Schema
        this._conection = conection
    }
    async create(item) {
        return await this._schema.create(item)
    }
    async read(item, skip = 10, limit = 10) {
        return this._schema.find(item).skip(skip).limit(10)
    }
    async update(id, item) {
        return await this._schema.updateOne({ _id: id }, { $set: item })//returna um objeto com o campo 
        // nModified que diz a quantidade de itens atualizados, no caso desse metodo 0 ou 1
    }
    async delete(id) {
        return await this._schema.deleteOne({ _id: id })//returna um objeto com o campo 
        // nModified que diz a quantidade de itens atualizados, no caso desse metodo 0 ou 1
    }
    async isConnected() {
        if (STATUS[this._conection.readyState] == "conectado") {
            return true
        }
        if (STATUS[this._conection.readyState] == "conectando") {
            return await setTimeout(() => {
                if (STATUS[this._conection.readyState] == "conectado") {
                    return true
                }
                return false
            }, 1000) // espera um segundo e testa se conectou ou não
        }
        return false
    }
    static async connect() {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true},
        function(error) {
            if(!error) return
             console.log(" falha na conexão! \n", error)
             throw error
         })
         mongoose.connection.once("open", () => console.log( "conexão estabelecida com sucesso"))
         return mongoose.connection
    }
}

module.exports = MongoDB