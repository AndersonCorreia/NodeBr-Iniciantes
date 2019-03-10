/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 05/03/2019
*/
class MyEmitter extends require("events"){}

const myEmitter = new MyEmitter()
const NameEvent = "usuario:Click"

myEmitter.on(NameEvent, function(click){
        console.log(" O usuario clicou ", click)
    }
)
myEmitter.emit(NameEvent, " na barra de rolagem")
myEmitter.emit(NameEvent, " no ok")

const stdin = process.openStdin()
stdin.addListener("data", function(value){
        console.log(" voçê digitou : ",value.toString().trim())
        }
)