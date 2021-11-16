import {ServerStartup} from './startup/server.startup.js';
import cors from "cors";
import express  from "express";
import mutationRoutes from "./routes/mutation.route.js";
import statsRoute from "./routes/stats.route.js"
import {detenvStartup} from "./startup/env.startup.js";
import {dbStartup} from "./startup/db.startup.js";



// Setup the env variables (only Dev)
if(process.env.NODE_ENV === 'development') {
    detenvStartup();
}


export const server = new ServerStartup();

// Body parser
server.app.use(express.urlencoded({ extended: false }));
server.app.use(express.json());

//Cors
server.app.use(cors());

//Routes
server.app.use('/api/mutation', mutationRoutes);
server.app.use('/api/stats', statsRoute);


