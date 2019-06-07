const baseRoute = require("./base/baseRoute")
const joi = require("joi")
const failAction = (request, headers, error) => {
    throw error
}
const jwt = require("jsonwebtoken")
const passhelper = require("./../Helpers/passwordHelper")

class authRoute extends baseRoute {
    constructor(db, secret) {
        super()
        this._Db = db
        this._Secret = secret
    }

    createUser() {
        return {
            path: "/user/create",
            method: "POST",
            config: {
                auth: false,
                tags: ["api"],
                description: "criar usuario e efetua login",
                validate: {
                    failAction,
                    payload: {
                        username: joi.string().required(),
                        password: joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    var { username, password } = request.payload
                    password = await passhelper.hash(password)
                    const user = await this._Db.create({
                        Username: username.toLowerCase(),
                        Password: password
                    })
                    const token = await jwt.sign({
                        username,
                        id: user.id
                    }, this._Secret)

                    return {
                        token
                    }
                }
                catch (error) {
                    console.log("error: ", error)
                    return {
                        message: "Usuario já existe",
                        error: error.message,
                        status_code:200
                    }
                }
            }
        }
    }
    login() {
        return {
            path: "/user/login",
            method: "GET",
            config: {
                auth: false,
                tags: ["api"],
                description: "obter token",
                validate: {
                    failAction,
                    query: {
                        username: joi.string().required(),
                        password: joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { username, password } = request.query
                    const [user] = await this._Db.read({
                        Username: username.toLowerCase()
                    })
                    if (!user) {
                        throw new Error(" Usuario ou Senha incorreta")
                    }
                    const valid = await passhelper.compare(password, user.Password)
                    if (!valid) {
                        throw new Error(" Usuario ou Senha incorreta")
                    }
                    const token = await jwt.sign({
                        username,
                        id: user.id
                    }, this._Secret)

                    return {
                        token
                    }
                }
                catch (error) {
                    console.log("error: ", error)
                    return {
                        message: "error interno no servidor",
                        error: error.message,
                        status_code:200
                    }
                }
            }
        }
    }

}

module.exports = authRoute