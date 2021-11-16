import express  from "express";


export class ServerStartup {
    app
    port=process.env.PORT || 3000;
    env=process.env.NODE_ENV || 'development'

    constructor() {
        this.app = express();
    }

    start(callback) {
        this.app.listen(this.port,  callback);
    }

}




