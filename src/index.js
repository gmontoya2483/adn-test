import {dbStartup} from "./startup/db.startup.js";
import {server} from "./server.js";

// DBConnection
await dbStartup();

// Start the Server
server.start(()=>{
    console.log(`${server.env}: Server running on port ${server.port}...`);
});


