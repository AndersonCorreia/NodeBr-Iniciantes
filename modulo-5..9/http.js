const HTTP = require("http")
const PORT = 5000

HTTP.createServer((request, response) => {
    response.end("hello node")
}).listen(PORT, () => console.log("servidor ativo na porta: ", PORT))