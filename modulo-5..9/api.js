const { config } = require("dotenv")
const { join } = require("path")
const { ok } = require("assert")

const env = process.env.NODE_ENV || "dev"
ok(env == "prod" || env == "dev", " a env é invalida, deve ser dev ou prod")
const configPath = join(__dirname, "./config", ".env." + env)

config({
    path: configPath
})

// npm install hapi
const hapi = require("hapi")
const app = new hapi.Server({ port: process.env.PORT })

const mongoDb = require("./src/DataBase/mongodb/mongoDB")
const schemaHeroes = require("./src/DataBase/mongodb/Schemas/heroesSchema")
const HeroRoutes = require("./routes/heroesRoute")

const postgresDb = require("./src/DataBase/postgres/postgres")
const tableHeroes = require("./src/DataBase/postgres/schemas/Schemas")
const joi = require("joi")

//frameworks para documentação da api
const hapiSwagger = require("hapi-swagger")
const Vision = require("vision")
const Inert = require("inert")

function mapRoutes(instance, methods) {
    // object.metodo() é a mesma coisa que object["metodo"]()
    return methods.map((method) => instance[method]())// mapeando todos os metodos da instancia recebida
}
async function main() {

    //const connection = await mongoDb.connect()
    //var DataBase = await new mongoDb(schemaHeroes ,connection)
    //const heroesRoute = new HeroRoutes(DataBase)

    const connection = await postgresDb.connect()//conectando ao banco
    const schema = await tableHeroes(connection)// conectando a tabela heroes no banco
    var DataBase = await new postgresDb(connection , schema)
    const heroesRoute = new HeroRoutes(DataBase)

    const swaggerOptions = {
        info: {
            title: " API - curso Node Br",
            version: "v1.0"
        },
        lang: "pt"
    }
    try {
        await app.register([
            Vision,
            Inert,
            { 
                plugin: hapiSwagger.plugin, 
                options: swaggerOptions 
            }
        ])
        const routes = mapRoutes(heroesRoute, HeroRoutes.methods())
        //console.log(routes)
        await app.route(routes)

        await app.start()
        console.log("servidor rodando na porta :", app.info.port)

    }
    catch (error) {
        console.log("erro: ", error)
    }
}

module.exports = main()
// git add -A && git commit -m "k" && git push heroku master
