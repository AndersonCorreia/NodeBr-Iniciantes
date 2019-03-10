/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 03/03/2019
*/
console.log("hello word")

var People = {
    user: null,
    numberPhone: null,
    Adress: null
}

function getUser(callback){
    setTimeout( function (){
        return callback(0, { id: 3, nome: "anderson", date: new Date() })
    },1000)    
}

function getNumberPhone(idUser, callback){
    setTimeout( function(){
        return callback(false, "75 982421052"+idUser )
    },2000)
}

function getAdress(idUser, callback){
    setTimeout( function(){
        return callback(false, { rua: "Varig" , CEP: 44030005 } )
    },1000)
}

function resolverUser(erroU, user){
    if(erroU){
        console.log("Algo de errado não esta certo com o User")
    }
    else {
        People.user=user
        getNumberPhone(user.id,resolverPhone)
    }
}
function resolverPhone(erroP, numberPhone){
    if(erroP){
        console.log("Algo de errado não esta certo com o phone")
    }
    else {
        People.numberPhone=numberPhone
        getAdress(People.user.id, resolverAdress)
    }
}
function resolverAdress(erroA, adress){
    if(erroA){
        console.log("Algo de errado não esta certo com o adress")
    }
    else {
        People.Adress=adress
        main()
    }
}

getUser(resolverUser)

function main(){
    console.log(People)
}