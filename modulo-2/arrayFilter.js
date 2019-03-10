/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 09/03/2019
*/
const { getPeople } = require("./service.js") //extraindo apenas o metodo obterPessoas de service

Array.prototype.myFilter=
function(callback){      
    const array = new Array()
    for(index = 0 ; index < this.length ; index++ ){
        var item = this[index]
        if ( callback(item, index, this )){
            array.push(item)
        }
    }
    return array
}

async function main (){
    try{
        const {results} = await getPeople("")
        const familyLars =
        results.myFilter( function (item, index , array) {
            return item.name.toLowerCase().indexOf("lars") != -1
        })
        const names = familyLars.map((pessoa) => pessoa.name)
        console.log(names)
    }catch( error){
        console.error("ocorreu um erro: error", error)
    }
}

main()