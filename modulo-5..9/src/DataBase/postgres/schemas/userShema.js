const Sequelize = require('sequelize')

async function getUserSchema(conection){
    
    const Users = conection.define("heroes", {
        id: {
            type: Sequelize.INTEGER,
            required: true , //não pode ser null
            primaryKey: true, // chave de buscar primaria
            autoIncrement: true //é incrementado automaticamente
        },
        Username: {
            type: Sequelize.STRING,
            unique: true,//não pode se repetir
            required: true , //não pode ser null
        },
        Password: {
            type: Sequelize.STRING,
            required : true
        }
    },{
        tableName: "TB_USERS",// nome da tabela existente no banco
        freezeTableName: false, //manter as configurações do banco existente
        timestamps: false
    })
    await Users.sync()//conectando ao banco
    return Users
}

module.exports = getUserSchema