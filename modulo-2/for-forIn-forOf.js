/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 05/03/2019
*/
const service = require("./service")

async function main() {
    try {
        const result = await service.getPeople("a")
        const names = await []
        console.log(result)
        const lenght = await result.results.lenght
        for(let i =0 ; i < lenght; i++ ){// por alguma razão o valor pego no array results é 0
            names.push(result.results[i].name)//logo esta linha nunca é executada
        }
        for(let i in result.results){
            //names.push(result.results[i].name)
        }
        for(people of result.results){
            names.push(people.name)
        }
        console.log("nomes " ,names)
    }catch(error){
        console.error("vishh erro : ", error)
    }
}

main()