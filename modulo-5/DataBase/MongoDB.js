const IDataBase = require("./IDataBase.js")

class MongoDB extends IDataBase {
    constructor() {
        super()
    }
    create(item) {
        throw new NotImplementedException()
    }
    read(query) {
        throw new NotImplementedException()
    }
    update(id, item) {
        throw new NotImplementedException()
    }
    delete(id) {
        throw new NotImplementedException()
    }
    isConnected(){
        throw new NotImplementedException()
    }
}

module.exports = MongoDB