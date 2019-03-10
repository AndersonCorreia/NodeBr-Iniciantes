/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 04/03/2019
*/
console.log("hello word")

var People = {
    user: {id: 4},
    numberPhone: null,
    Adress: null
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
        },50)
    })
}

function getAdress(idUser){
    return new Promise( function resolvePromisse(resolve, eject){
        setTimeout( function(){
            return resolve({ rua: "Varig" , CEP: 44030005 })
        },80)
    })
}

function erroPadrão(erro){
    console.log("Nossa um erro: ",erro)
}

getUser().then(function (user){
                People.user=user
                getNumberPhone(user.id).then(function(number){
                        People.numberPhone=number
                    }
                )
                getAdress(user.id).then(function(adress){
                        People.Adress=adress
                    }
                )
            }
        ).catch(erroPadrão)

setTimeout(function(){
        console.log(People)
    },1000)//simulando o tempo para acessar os servidores, ao seja terminar a execução dos demais metodos