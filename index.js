const http = require('http')
const port =8000

const server = http.createServer ((req,res)=>{
    res.end('Hola a todos xd')
})

server.listen(port,()=>{
    console.log('Servidor Trabajando 😎')
})