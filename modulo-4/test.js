/*
* Codigo produzido durante o curso NodeBr para iniciantes
* Autor: anderson correia
* Data: 14/03/2019
*/
const { deepStrictEqual, fail } = require("assert")
const DataBase = require("./DataBase.js")
const DEFAULT_ITEM = {
    name: "Ichigo",
    power: "Shinigami",
    id: 1
}
const DEFAULT_ITEM_ATUALIZE = {
    name: "Alloy",
    power: "Inteligencia",
    id: 3
}

describe("suite da manipulação dos herois", () => {
    before(async () => {
        await DataBase.removeAll()
        await DataBase.toRegister(DEFAULT_ITEM)
        await DataBase.toRegister(DEFAULT_ITEM_ATUALIZE)
    })
    it("Pesquisar herois no arquivo", async () => {
        const expected = DEFAULT_ITEM
        const data = await DataBase.list(1)
        deepStrictEqual(expected, data[0])
    })
    it("testando o cadastro de herois", async () => {
        await DataBase.toRegister({ name: "Rin Okumura", power: "Exorcista e filho de satan", id: 0 })
        console.log(await DataBase.list())//visualizar se o heroi registrado de fato esta na lista
    })
    it("Não deve cadastrar um heroi que ja existe", async () => {
        try {
            await DataBase.toRegister({ name: "Rin Okumura", power: "Exorcista e filho de satan", id: 0 })
            fail("não deveria ter cadastrado")
        }
        catch (error) {
            console.log("error: ", error)
        }
    })
    it("testando a remoção de herois", async () => {
        await DataBase.remove(0)
        console.log(await DataBase.list())//visualizar se o heroi foi removido da lista
    })
    it("deve lançar exceção ao tentar remover um heroi que não existe", async () => {
        try {
            await DataBase.remove(60)
            fail("não deveria ter removido")
        }
        catch (error) {
            console.log("error: ", error)
        }
    })
    it("Deve atualizar um heroi", async () => {
        //await DataBase.toRegister(DEFAULT_ITEM_ATUALIZE)
        const expected = { ...DEFAULT_ITEM_ATUALIZE, power: "Inteligência , Força e Beleza" }
        await DataBase.actualize(expected, DEFAULT_ITEM_ATUALIZE.id)
        await DataBase.actualize({}, DEFAULT_ITEM_ATUALIZE.id)
        const [result] = await DataBase.list(DEFAULT_ITEM_ATUALIZE.id)
        console.log(result)
        deepStrictEqual(expected, result)
    })
    it("deve lançar exceção ao tentar atualizar um heroi que não existe", async () => {
        try {
            await DataBase.actualize({ name: "Rin Okumura", power: "Exorcista e filho de satan", id: 0 },99)
            fail("não deveria ter atualizado")
        }
        catch (error) {
            console.log("error: ", error)
        }
    })
})