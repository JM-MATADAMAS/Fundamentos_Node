import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

// Conexión a la base de datos en Firebase
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: 'crud-jmmf-practica1.firebaseapp.com',
    projectId: 'crud-jmmf-practica1',
    storageBucket: 'crud-jmmf-practica1.appspot.com',
    messagingSenderId: '162351994848',
    appId: '1:162351994848:web:658ea5171ce90f8ea73d85'
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Respuesta de Raíz 😎');
});

app.get('/contacto', (req, res) => {
    res.send('Respuesta desde contacto 😎');
});

app.post('/signup', (req, res) => { // Cambiado de app.get a app.post para manejar solicitudes POST
    const { nombre, apaterno, usuario, password } = req.body;

    if (!nombre || nombre.length < 3) {
        res.json({
            'Alerta': 'El nombre debe contener mínimo 3 letras'
        });
    } else if (!apaterno) {
        res.json({
            'Alerta': 'El apaterno no puede ser vacío'
        });
    } else if (!usuario) {
        res.json({
            'Alerta': 'El usuario no puede ser vacío'
        });
    } else if (!password || password.length < 6) {
        res.json({
            'Alerta': 'La contraseña requiere 6 caracteres'
        });
    } else {
        // Guardar en la base de datos
        const usuarios = collection(db, 'usuarios');
        getDoc(doc(usuarios, usuario)).then(user => {
            if (!user.exists()) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        setDoc(doc(usuarios, usuario), req.body)
                            .then(registered => {
                                res.json({
                                    'alerta': 'Success',
                                    registered
                                });
                            });
                    });
                });
            } else {
                res.json({
                    'Alerta': 'El usuario ya existe'
                });
            }
        });
    }
});

app.post('/login',(req,res)=>{
    const{usuario,password}=req.body
    if (!usuario.length || !password.length){
        return res.json({
            'Alerta':'Algunos campos están vacíos'
        })
    }
    const usuarios = collection(db,'usuarios')
    getDoc(doc(usuarios,usuario))
        .then(user=>{
            if (!user.exists()){
                res.json({
                    'Alerta':'El usuario no existe'
                })
            }
            else{
                bcrypt.compare(password,user.data().password,(err,result)=>{
                    if(result){
                        let userFound = user.data()
                        res.json({
                            'Alerta':'Success',
                            'Usuario':{
                                'nombre': userFound.nombre,
                                'apaterno': userFound.apaterno,
                                'amaterno': userFound.amaterno,
                                'telefono': userFound.telefono,
                                'usuario':userFound.usuario,
                            }
                        })
                    }
                    else{
                        res.json({
                            'Alerta':'Contraseñas no coinciden'
                        })
                    }
                })
            }
        })
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Servidor escuchando: ', port);
    console.log(`Servidor escuchando: ${port}`);
});