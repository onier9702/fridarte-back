

const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            email:      '/api/email',
            comment:      '/api/comments',
        };

        this.middlewares();

        this.routes();
        
    }
    
    middlewares() {
        
        // CORS
        this.app.use( cors() );

        // Public Directory
        this.app.use(express.static('public')); // this is the route / 
        
        this.app.use(express.json()); // any info on Body will be parse and transform to JSON

    }

    routes() {
        this.app.use( this.paths.email, require('../routes/sendEmail') );
        this.app.use( this.paths.comment, require('../routes/postComment') );
        // the last
        this.app.get('*', (req, res) => {
            res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
        })

    }

    listen() {
        
        this.app.listen(this.port,  () => {
            console.log(`App listening on port ${this.port}`);
        } )
    }

};


module.exports = Server;
