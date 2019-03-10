/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 10/03/2019
*/
const { getPeople } = require("./service.js") //extraindo apenas o metodo obterPessoas de service

Array.prototype.myReduce =
function (callback,valueInitial) {
    var total = valueInitial == undefined ? this[0]: valueInitial
    for (let i = 1; i< this.length; i++){
        total = callback(total,this[i])
    }
    return total
}

async function main (){
    try{
        const {results} = await getPeople("a")
        const heights = 
        results.map( (people) => parseInt(people.height))
        //const heightAll = heights.reduce( (previous, next) => previous+next)
        const heightAll = [].myReduce( (previous, next) => previous+next, 0)
        console.log(' Valor das alturas:', heights ,'\n valor total: ',heightAll)
    }catch( error){
        console.error("ocorreu um erro: error", error)
    }
}

main()