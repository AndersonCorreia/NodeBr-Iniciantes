class NotImplementedException extends Error{
    constructor(){
        super("Metodo não implementado")
    }
}

class IDataBase {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    }

    async create(item){
        const { datavalues } = await this._heroes.create(item)
        return datavalues
    }
    async read(query){
        return await this._heroes.findall({where: query , raw: true})
    }
    async update(id,item){
        await this._heroes.update( item,{ where:{id: id} })
        return true
    }
    async delete(id){
        const query = id ? {id} : {}
        return await this._heroes.destroy({ where: query})
    }
    async isConnected(){
        try{
            await driver.authenticade()
            return true
        }
        catch(error){
            console.log("Ocorreu um erro : ", error)
            return false
        }
    }

    async defineModel(){//criar o modelo da tabela
        this._heroes = driver.define("herois", {
            id: {
                type: Sequelize.INTEGER,
                required: true , //não pode ser null
                primaryKey: true, // chave de buscar primaria
                autoIncrement: true //é incrementado automaticamente
            },
            nome: {
                type: Sequelize.STRING,
                required : true
            },
            poder: {
                type : Sequelize.STRING,
                required : true
            }
        },{
            tableName: "TB_HEROES",// nome da tabela existente no banco
            freezeTableName: false, //manter as configurações do banco existente
            timestamps: false
        })
    
        await Heroes.sync()//conectando ao banco
    }

}
module.exports = IDataBase