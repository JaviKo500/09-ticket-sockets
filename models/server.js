const cors = require('cors');
const express = require('express');
const { socketController } = require('../controllers/sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {};

        // Middleware
        this.middleware();
        // app routes
        this.routes();

        // Sockets

        this.sockets();
    }
    
    middleware() {
        // cors 
        this.app.use(cors());
        
        // public directory
        this.app.use( express.static('public') );
    }
    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth') );
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Port => ${this.port}`);
        }); 
    }

    sockets() {
        this.io.on('connection', socketController);
    }

}


module.exports = Server;