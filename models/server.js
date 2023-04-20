//Importaciones de necesario para nodejs
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/dbconnection');



class Server {

    constructor() {

        //Configuración inicial
        this.app = express();
        this.port = process.env.PORT;


        this.paths = {
            hotel: '/api/hoteles',
            tipoEvento: '/api/tipo',
            auth: '/api/auth',
            usuarios: '/api/usuario',
            reservacion: '/api/reservacion',
            habitacion: '/api/habitacion',
            evento: '/api/evento'

        }



        // Middlewares
        this.middlewares();


        //Rutas de mi app
        this.routes();


        //Conectar a base de datos
        this.conectarDb();
    }

    async conectarDb() {
        await dbConection();
    }

    //Un middleware es una función que se ejecuta antes de las rutas
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        //Directorio publico (HTML)
        this.app.use(express.static('public'));

    }


    //* RUTAS
    routes() {

        this.app.use(this.paths.hotel, require('../routes/hotel'));
        this.app.use(this.paths.tipoEvento, require('../routes/tipo-evento'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuario'));
        this.app.use(this.paths.reservacion, require('../routes/reservacion'));
        this.app.use(this.paths.habitacion, require('../routes/habitaciones'));
        this.app.use(this.paths.evento, require('../routes/evento'));




    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('El servidor esta corriendo en el puerto ', this.port);
        })
    }


}


//Importamos la clase Server
module.exports = Server;