const baseRoute = require("./base/baseRoute")
const joi = require("joi")
const failAction = (request, headers, error) => {
    throw error
}

class HeroRoute extends baseRoute {
    constructor(db) {
        super()
        this._Db = db
    }

    list() {
        return {
            path: "/heroes",
            method: "GET",
            config: {
                tags:["api"],
                description: " Lista os herois",
                notes: " suporte a paginação dos resultados e filtro por nome",
                validate: {
                    failAction: failAction,
                    querry: {
                        skip: joi.number().integer().default(0),
                        limit: joi.number().integer().default(10),
                        nome: joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, head) => {//metodo que é executado ao acessar o endereço do path
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.querry

                    const querry = {}
                    if (nome) {//se o nome foi enviado a busca é feita com ele, se não vai a query vazia
                        querry = {
                            nome: { $regex: ".*" + nome + "*." }//comando do mongoDb basicamente um contains 
                        }
                    }

                    return this._Db.read(querry, skip, limit)
                }
                catch (error) {
                    console.log("error: ", error)
                    return "error interno no servidor, verifique a URL"
                }
            }
        }
    }

    create() {
        return {
            path: "/heroes",
            method: "POST",
            config: {
                tags:["api"],
                description: " cadastra herois",
                notes: " necessario nome e poder do heroi",
                validate: {
                    failAction: failAction,
                    payload: {
                        nome: joi.string().required().min(3).max(100),
                        poder: joi.string().required().min(3).max(100)
                    }
                }
            },
            handler: async (request) => {//metodo que é executado ao acessar o endereço do path
                try {
                    const {
                        poder,
                        nome
                    } = request.payload

                    const result = await this._Db.create({ nome, poder })
                    return {
                        message: "heroi cadastrado com sucesso",
                        _id: result._id
                    }

                }
                catch (error) {
                    console.log("error: ", error)
                    return "error interno no servidor, verifique a URL"
                }
            }
        }
    }

    update() {
        return {
            path: "/heroes/{id}",
            method: "PATCH",
            config: {
                tags:["api"],
                description: " atualiza um heroi",
                notes: " pode atualizar qualquer campo",
                validate: {
                    params: {
                        id: joi.string().required()
                    },
                    payload: {
                        nome: joi.string().min(3).max(100),
                        poder: joi.string().min(3).max(100)
                    }
                }
            },
            handler: async (request) => {//metodo que é executado ao acessar o endereço do path
                try {
                    const {
                        poder,
                        nome
                    } = request.payload
                    const update = {}
                    if(nome){
                        update.name=nome
                    }
                    if(poder){
                        update.power=poder
                    }

                    await this._Db.update(request.params.id,update)
                    return  "heroi atualizado com sucesso"
                }
                catch (error) {
                    console.log("error: ", error)
                    return "error interno no servidor, verifique a URL"
                }
            }
        }
    }

    updateAll() {
        return {
            path: "/heroes/{id}",
            method: "PUT",
            config: {
                tags:["api"],
                description: " atualiza todos os dados de um heroi",
                validate: {
                    params: {
                        id: joi.string().required()
                    },
                    payload: {
                        nome: joi.string().required().min(3).max(100),
                        poder: joi.string().required().min(3).max(100)
                    }
                }
            },
            handler: async (request) => {//metodo que é executado ao acessar o endereço do path
                try {
                    const {
                        poder,
                        nome
                    } = request.payload
                    await this._Db.update(request.params.id,{nome , poder})
                    return  "heroi atualizado com sucesso"
                }
                catch (error) {
                    console.log("error: ", error)
                    return "error interno no servidor, verifique a URL"
                }
            }
        }
    }

    delete() {
        return {
            path: "/heroes/{id}",
            method: "DELETE",
            config: {
                tags:["api"],
                description: " remover um heroi",
                notes: " o id tem que ser valido",
                validate: {
                    params: {
                        id: joi.string().required()
                    }
                }
            },
            handler: async (request) => {//metodo que é executado ao acessar o endereço do path
                try {
                    await this._Db.delete(request.params.id)
                    return  "heroi deletado com sucesso com sucesso"
                }
                catch (error) {
                    console.log("error: ", error)
                    return "error interno no servidor, verifique a URL"
                }
            }
        }
    }
}
module.exports = HeroRoute