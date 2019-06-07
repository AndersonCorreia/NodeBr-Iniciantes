const IDataBase = require("./../IDataBase.js")
const Sequelize = require('sequelize')

class Postgres extends IDataBase {
    constructor(connection, schema, queryComplete = false, queryAtribut = "name") {
        super()
        this._connection = connection
        this._schema = schema
        this._queryComplete = queryComplete// se a buscar deve retorna apenas quando é completamente identica a query
        this._queryAtribut = queryAtribut//nome do atributo procurado na busca no metodo read
    }
    async create(item) {
        const datavalues = await this._schema.create(item)
        return datavalues
    }
    async read(query, skip = 0, limit = 10) {
        var list
        if (this._queryComplete) {
            list = await this._schema.findAll({ where: query, raw: true })
        }
        else {
            list = await this._schema.findAll({ where: {}, raw: true })
            if (query[this._queryAtribut]) {
                list = list.filter((item) => {//mapear os itens que tem parte do nome procurado, não é case sensitive
                    if (item[this._queryAtribut].toLocaleLowerCase().includes(
                            query[this._queryAtribut].toLocaleLowerCase() )
                        ) {
                        return true
                    }
                    return false
                })
            }
        }
        var array = []
        limit = skip + limit
        for (let i = skip; i < limit && i < list.length ; i++) {
            array[i - skip] = list[i]
        }
        return array
    }
    async update(id, item, upsert = false) {
        const method = upsert ? "upsert" : "update" //upsert=tenta atualizar e se não existe faz o cadastro

        return await this._schema[method](item, { where: { id: id } })
    }
    async delete(id) {
        return await this._schema.destroy({ where: { id } })
    }
    async isConnected() {
        try {
            await this._connection.authenticade()
            return true
        }
        catch (error) {
            console.log("Ocorreu um erro : ", error)
            return false
        }
    }
    static async connect() {
        const connection = await new Sequelize(process.env.POSTGRES_URL, {
            quoteIdentifers: false, //não alterar as configurações padroes do banco
            logging: false,
            ssl: process.env.SSL_DB
        })
        try {
            await connection.authenticate()
            return connection
        }
        catch (error) {
            console.log("Ocorreu um erro : ", error)
            throw error
        }
    }
}
module.exports = Postgres