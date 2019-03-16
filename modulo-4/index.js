/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 14/03/2019
*/
const commander = require("commander")
const Hero = require("./hero.js")
const DataBase = require("./DataBase")

async function main() {
    commander.version("v1")
        .option('-n , --name <>', "nome do heroi")
        .option('-p , --power <>', "poder do heroi")
        .option('-i , --id <>', "id do heroi")
        .option('-c , --cadastrar', "cadastrar heroi")
        .option('-a, --atualizar <Id_or_Name>', " atualizar as informações de um heroi")
        .option('-l, --listar []', "Lista todos herois na base de dados, ou baseado no nome recebido")
        .option('-r , --remover []', "remove um heroi baseado no id")
        .option('-r-all , --removerAll', "exclui todos os herois da base de dados")
        .parse(process.argv)

    try {
        if (commander.cadastrar) {
            if (commander.id && commander.power && commander.name) {
                const hero = new Hero(commander)
                await DataBase.toRegister(hero)
                console.log("o sequinte heroi foi cadastrado: ", hero)
                return
            }
            console.log(" a função cadastrar deve acompanhar os parametros -i -n -p")
        }
        else if (commander.atualizar) {
            if (commander.id || commander.power || commander.name) {
                var hero = new Hero(commander)
                hero = await DataBase.actualize(hero,commander.atualizar)
                console.log ("Heroi atualizado: ", hero)
            }
        }
        else if (commander.listar) {
            const result = await DataBase.list(false)
            if (result == []) {
                console.log("Nenhum resultado encontrado")
                return
            }
            console.log(result)
        }
        else if (commander.removerAll) {
            DataBase.remove(false)
            console.log("Todos os herois foram removidos")
        }
        else if (commander.remover) {
            if (!(commander.id || commander.name)) {
                console.log("utilize tambêm -i ou -n \n ou -r-all para EXCLUIR a base de dados INTEIRA")
                return
            }
            const heroi = await DataBase.remove(commander.id, commander.name)
            console.log("O heroi " + heroi.toString() + " foi removido")
        }
    } catch (error) {
        console.log("algo errado", error)
    }
}

main()