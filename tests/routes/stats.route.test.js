import { server } from '../../src/server.js'
import request from 'supertest'
import {dbStartup} from "../../src/startup/db.startup.js";
import mongoose from "mongoose";



describe('GET /stats', () => {

    beforeAll(async ()=> {
        await dbStartup('mongodb://localhost/mutation_db_TEST');
    });

    afterAll(async ()=> {
        await mongoose.disconnect();
    })

    test('should return a HTTP 200 status code', async () => {
       const response = await request(server.app).get('/api/stats').send();
       expect(response.status).toBe(200);
       expect(response.body.count_mutations).toBeDefined();
       expect(response.body.count_no_mutations).toBeDefined();
       expect(response.body.ratio).toBeDefined();
    });
});
