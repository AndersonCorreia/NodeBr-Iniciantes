// npm install sequelize pg-hstore pg

const Sequelize = require('sequelize')
const drive = new Sequelize("heroes","andersonstrife", "minhasenha",{ 
        host: "localhost",
        dialect:"postgres", // especificando o banco de dados
        quoteIdentifers: false, //não alterar as configurações padroes do banco
        operatorsAliases: false // deixar de mostrar uns avisos e erros
    })

async function main(){
    const Heroes = driver.define("herois", {
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

    const result = await Heroes.findALL({ raw: true, atributes: [" nome"]}) // raw altera o formato do texto mostrado

    console.log( "result : \n", result)
}

