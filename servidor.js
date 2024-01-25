const express = require ('express')
import { initializeApp } from "firebase/app";
const app = express()
const port = 8080

const firebaseConfig = {
    apiKey: "AIzaSyCXA6slXbEKh37E603zpNhKiPkIt9IMir0",
    authDomain: "crud-jmmf-practica1.firebaseapp.com",
    projectId: "crud-jmmf-practica1",
    storageBucket: "crud-jmmf-practica1.appspot.com",
    messagingSenderId: "162351994848",
    appId: "1:162351994848:web:658ea5171ce90f8ea73d85"
};

const app = initializeApp(firebaseConfig);

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