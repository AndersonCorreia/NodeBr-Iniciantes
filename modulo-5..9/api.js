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
const AuthRoutes = require("./routes/authRoutes")
const HapiJwt = require("hapi-auth-jwt2")
const jwt_secret = "algebra123"

const postgresDb = require("./src/DataBase/postgres/postgres")
const tableHeroes = require("./src/DataBase/postgres/schemas/Schemas")
const tableUser = require("./src/DataBase/postgres/schemas/userShema")

//frameworks para documentação da api
const hapiSwagger = require("hapi-swagger")
const Vision = require("vision")
const Inert = require("inert")

function mapRoutes(instance, methods) {
    // object.metodo() é a mesma coisa que object["metodo"]()
    return methods.map((method) => instance[method]())// mapeando todos os metodos da instancia recebida
}
async function main() {

    var connection = await mongoDb.connect()
    var DataBase = await new mongoDb(connection, schemaHeroes)
    const heroesRoute = new HeroRoutes(DataBase)


    var connectionU = await postgresDb.connect()//conectando ao banco
    const schema = await tableUser(connectionU)// conectando a tabela de users no banco
    var DataBaseUser = await new postgresDb(connectionU, schema, true)
    const authRoutes = new AuthRoutes(DataBaseUser, jwt_secret)

    const swaggerOptions = {
        info: {
            title: " API - curso Node Br",
            version: "v1.3"
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
            },
            HapiJwt
        ])
        const routes = mapRoutes(heroesRoute, HeroRoutes.methods())
        //console.log(routes)
        await app.route([
            ...routes,
            ...mapRoutes(authRoutes, AuthRoutes.methods())
        ])
        await app.auth.strategy("jwt", "jwt", {
            key: jwt_secret,
            /*options: {
                expiresIn : 20 //segundos
            }*/
            validate: async (dado, request) => {

                try {
                    const [result] = await DataBaseUser.read({
                        Username: dado.username.toLowerCase()
                    })

                    return {
                        isValid: result ? true : false
                    }
                }
                catch (error) {
                    console.log("error: ", error)
                    return {
                        message: "acesso não autorizado",
                        error: error.message,
                        statusCode:401
                    }
                }
            }
        })
        app.auth.default("jwt")
        await app.start()
        console.log("servidor rodando na porta :", app.info.port)

    }
    catch (error) {
        console.log("erro: ", error)
    }
}

module.exports = main()
// git add -A && git commit -m "k" && git push heroku master
