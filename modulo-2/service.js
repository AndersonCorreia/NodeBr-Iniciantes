/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 05/03/2019
*/
const axios = require("axios")
const URL = "https://swapi.co/api/people"

async function getPeople(nome) {
    const url = ""+URL+"/?search="+nome+"&format=json"
    const response = await axios.get(url)
    return await response.data
}

module.exports = {
    getPeople
}