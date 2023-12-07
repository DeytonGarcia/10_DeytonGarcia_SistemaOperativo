const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Requiriendo la conexión a BD gestor (MySQL)

const mysql = require('mysql2');

const conecction = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'deytonForm',
    port: '3306',
})
conecction.connect((err)=>{
    if(!err) {
        console.log('Conexion exitosa');
    }else{
        console.log('Conexion fallida');
    }
})

//Creando una nueva aplicación Express.
const app = express();
const path = require("path");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use('/Portafolio_10/style.css', express.static(path.join(__dirname, 'Portafolio_10', 'style.css')));
app.use('/public/js', express.static('public/js'));

app.get("/", function (req, res) {
    var filePath = path.join(__dirname, "./Portafolio_10/index.html");
    res.sendFile(filePath);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
          console.log('El servidor esta en el puerto ' + PORT);
});
app.post("/valida", function (req, res) {
    const datos = req.body;
    let carrera = datos.carrera;
    let apellidos = datos.nombres;
    let nombres = datos.apellidos;
    let dni = datos.dni;
    let fecha_nacimiento = datos.fecha_nacimiento;
    let correo = datos.correo;
    let contrasena = datos.contrasena;



    let registrar = "INSERT INTO form (carrera, Nombres, Apellidos, Dni, fecha_nacimiento,correo,contraseña) VALUES ('" + carrera + "','" + nombres + "','" + apellidos + "','" + dni + "','" + fecha_nacimiento + "','" + correo + "','" + contrasena + "')";

    conecction.query(registrar, function (error) {
        if (error) {
            throw error
        } else {
            console.log("Datos recibidos")
            console.log(Object.entries(datos));
            res.redirect(req.get('referer'));
        }
    }); 
});
