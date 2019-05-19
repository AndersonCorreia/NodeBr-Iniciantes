const baseRoute = require("./base/baseRoute")
const joi = require("joi")
const failAction = (request, headers, error) => {
    throw error
}
const jwt = require("jsonwebtoken")

class authRoute extends baseRoute {
    constructor(db, secret) {
        super()
        this._Db = db
        this._Secret = secret
    }

    login() {
        return {
            path: "/login",
            method: "POST",
            config: {
                auth: false,
                tags: ["api"],
                description: "obter token",
                validate: {
                    payload: {
                        username: joi.string().required(),
                        password: joi.string().required()
                    }
                }
            },
            handler: async (request) =>{
                const {username, password} = request.payload

                const token = jwt.sign({
                    username,
                    id: 1
                }, this._Secret)

                return {
                    token
                }
            }
        }
    }

}

module.exports = authRoute