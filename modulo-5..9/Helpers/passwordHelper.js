const bcrypt = require("bcrypt")

const { promisify } = require("util")

const hashAsync = promisify(bcrypt.hash)
const compareAsync = promisify(bcrypt.compare)
const SALT = 3

async function hash (data){
    return await hashAsync(data,SALT)
}

async function compare (data, dataEncrypted){
    return await compareAsync(data,dataEncrypted)
}

module.exports = { hash , compare }