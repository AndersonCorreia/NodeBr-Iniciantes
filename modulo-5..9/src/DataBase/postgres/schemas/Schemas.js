const Sequelize = require('sequelize')

async function getHeroesSchema(conection){
    
    const Heroes = conection.define("heroes", {
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
    return Heroes
}

module.exports = { getHeroesSchema}