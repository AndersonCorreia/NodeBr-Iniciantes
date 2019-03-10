/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 04/03/2019
*/
console.log("hello word")

var People = {
    user: null,
    numberPhone: null,
    adress: null
}

function getUser(){
    //reject-> função executada quando ocorre um erro
    //resolve-> função executada quando não ocorre um erro
    return new Promise( function resolvePromisse(resolve , reject){
                setTimeout( function (){
                    return resolve({ id: 3, nome: "anderson", date: new Date() })
                },500)
            })
}

function getNumberPhone(idUser){
    return new Promise( function resolvePromisse(resolve, eject){
        setTimeout( function(){
            return resolve("75 982421052"+idUser)
        },500)
    })
}

function getAdress(idUser){
    return new Promise( function resolvePromisse(resolve, eject){
        setTimeout( function(){
            return resolve({ rua: "Varig" , CEP: 44030005 })
        },500)
    })
}

async function main(){
    try{
        console.time("tempo-main")//para testa o tempo de excecução da main com o uso dos await
        People.user = await getUser()
        const a = await Promise.all([
            getNumberPhone(People.user.id),
            getAdress(People.user.id)
        ])
        People.numberPhone = a[0]
        People.adress = a[1]
        console.log(People)
        console.timeEnd("tempo-main")
    }catch(error){
        console.error("vish>>> ", error)
    }
}
main()