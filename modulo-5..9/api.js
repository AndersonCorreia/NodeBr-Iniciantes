const { config } = require("dotenv")
const { join } = require("path")
const { ok } = require("assert")

const env = process.env.NODE_ENV || "dev"
ok(env == "prod" || env == "dev", " a env é invalida, deve ser dev ou prod")
const configPath = join(__dirname, "./config", ".env."+ env)

config({
    path: configPath
})

// npm install hapi
const hapi = require("hapi")
const app = hapi.Server({ port: process.env.PORT})

const mongoDb = require("./src/DataBase/mongodb/mongoDB")
const schemaHeroes = require("./src/DataBase/mongodb/Schemas/heroesSchema")
const HeroRoutes = require("./routes/heroesRoute")

//frameworks para documentação da api
const hapiSwagger = require("hapi-Swagger")
const Vision = require("vision")
const Inert  = require("inert")

function mapRoutes(instance , methods){
    // object.metodo() é a mesma coisa que object["metodo"]()
    return methods.map( (method) => { return instance[method]() })// mapeando todos os metodos da instancia recebida
}
async function main(){
    const connection = await mongoDb.connect()
    var DataBase = await new mongoDb(schemaHeroes ,connection)
    const heroesRoute = new HeroRoutes(DataBase)
    const swaggerOptions = {
        info : {
            title: " API - curso Node Br",
            version: "v1.0"
        },
        lang: "pt-br"
    }

    await app.register([
        Vision,
        Inert,
        {
            plugin: hapiSwagger,
            options: swaggerOptions
        }
    ])

    //app.route( mapRoutes(heroesRoute, HeroRoutes.methods() ) )
    await app.start()
    console.log("servidor rodando na porta :", app.info.port)
}

module.exports = main()