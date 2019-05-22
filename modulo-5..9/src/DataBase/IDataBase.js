class NotImplementedException extends Error{
    constructor(){
        super("Metodo não implementado")
    }
}

class IDataBase {
    
    create(item) {
        throw new NotImplementedException()
    }
    read(query) {
        throw new NotImplementedException()
    }
    update(id, item, upsert) {
        throw new NotImplementedException()
    }
    delete(id) {
        throw new NotImplementedException()
    }
}
module.exports = IDataBase