const IDataBase = require("./IDataBase.js")
const Sequelize = require('sequelize')

class Postgres extends IDataBase {
    constructor() {
        super()
        this._connecte()
    }
    create(item) {
        throw new NotImplementedException()
    }
    read(query) {
        throw new NotImplementedException()
    }
    update(id, item) {
        throw new NotImplementedException()
    }
    delete(id) {
        throw new NotImplementedException()
    }
    _connecte(){
        this._driver = new Sequelize("heroes","andersonstrife", "minhasenha",{ 
            host: "localhost",
            dialect:"postgres", // especificando o banco de dados
            quoteIdentifers: false, //não alterar as configurações padroes do banco
            operatorsAliases: false // deixar de mostrar uns avisos e erros
        })
        this.defineModel()
    }
}
module.exports = Postgres