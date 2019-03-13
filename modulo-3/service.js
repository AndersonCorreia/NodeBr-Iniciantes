const { get } = require('axios')

const swapiApi = 'https://swapi.co/api/people'

async function getPeople(name){
    const result = await get(swapiApi+'/?search='+name+"&format=json")
    return result.data.results.map(mapPeopple)
}

function mapPeopple(item) {//estrai apenas o nome e altura de uma pessoa
    return {
        name: item.name ,
        height: item.height
    }
}

module.exports = {
    getPeople
}