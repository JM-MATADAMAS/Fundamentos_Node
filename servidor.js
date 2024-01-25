const express = require ('express')
const app = express()
const port = 8080

app.get('/',(req,res)=>{
    res.send('Respuesta de Raíz 😎')
})

app.get('/contacto',(req,res)=>{
    res.send('Respuesta desde contacto 😎')
})

app.listen(port,()=>{
    console.log('Servidor escuchando: ',port)
    console.log(`Servidor escuchando: ${port}`)
})
