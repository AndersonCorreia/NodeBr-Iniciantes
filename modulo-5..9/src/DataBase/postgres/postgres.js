const IDataBase = require("./../IDataBase.js")
const Sequelize = require('sequelize')

class Postgres extends IDataBase {
    constructor(connection , schema) {
        super()
        this._connection = connection
        this._schema = schema
    }
    async create(item){
        const { datavalues } = await this._schema.create(item)
        return datavalues
    }
    async read(query, skip =0 , limit=10){
        return await this._schema.findall({where: query , raw: true}).skip(skip).limit(limit)
    }
    async update(id,item){
        await this._schema.update( item,{ where:{id: id} })
        return true
    }
    async delete(id){
        return await this._schema.destroy({ where: {id} })
    }
    async isConnected(){
        try{
            await this._connection.authenticade()
            return true
        }
        catch(error){
            console.log("Ocorreu um erro : ", error)
            return false
        }
    }
    static connect(){
        const connection = new Sequelize(process.env.POSTGRES_URL,{
            quoteIdentifers: false, //não alterar as configurações padroes do banco
            operatorsAliases: false, // deixar de mostrar uns avisos e erros
            logging: false,
            ssl: process.env.SSL_DB
        })
        return connection
    }
}
module.exports = Postgres