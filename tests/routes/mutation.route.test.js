import { server } from '../../src/server.js'
import request from 'supertest'
import {dbStartup} from "../../src/startup/db.startup.js";
import {Mutation} from "../../src/models/mutatios.model";
import mongoose from "mongoose";



describe('POST /mutation', () => {



    describe('Negative tests', () => {

        test('should return a HTTP 422 status code if the request has an invalid body', async () => {

            const requestBodies = [
                {},
                {dna: 'Hola Mundo'},
                {dna: [1,2,3]},
                {dna: ['AAAGG', 'AAAGG', 'AAGTT', 'AAGTT', 'ATTGC'], ok: false },
                {dna: ['AAAGG', 'AAAGG', 'AAGTT', 1, 'ATTGC'], ok: false }

            ]

            for (const requestBody of requestBodies) {
                const response = await request(server.app).post('/api/mutation').send(requestBody);
                expect(response.status).toBe(422);
            }

        });


        test('should return a HTTP 400 status code if the request has a valid body however it has an invalid dna array', async () => {

            const requestBodies = [
                {dna: []},
                { dna: ['AAAGG', 'AAAGG', 'AAAAGTT', 'AAGTT', 'ATTGC'] }

            ]

            for (const requestBody of requestBodies) {
                const response = await request(server.app).post('/api/mutation').send(requestBody);
                expect(response.status).toBe(400);
            }

        });

    });



    describe('posotive tests', ()=> {


        beforeEach(async () => {
            await dbStartup('mongodb://localhost/mutation_db_TEST');
            Mutation.deleteMany({})
                .then()
                .catch(()=> {
                    console.log('It was not possible to clean the collection');
                });
        });

        afterEach(async ()=> {
            await mongoose.disconnect();
        })


        test('should return a HTTP 403 status code if the request has an valid body which has no mutation', async () => {

            const dnas = [
                {dna: ['ACAGG', 'TAAGG', 'AAGTT', 'AAGTT', 'ATTGC']},
                {dna:
                        [
                            'ATGCGA',
                            'CAGTGC',
                            'TTATTT',
                            'AGACGG',
                            'GCGTCA',
                            'TCACTG'
                        ]}
            ]

            for (let i =0; i<dnas.length; i++) {
                const response = await request(server.app).post('/api/mutation').send(dnas[i]);
                expect(response.status).toBe(403);

                // Verify dna analysis was saved correctly
                const mutations = await Mutation.find({});
                expect(mutations.length).toBe(i+1);
                expect(mutations[0].hasMutation).toBe(false);
            }


        });


        test('should return a HTTP 403 status code if the request has an valid body which has no mutation', async () => {

            const dnas = [
                {dna: ['ACAGG', 'AAAGG', 'ACATT', 'AAGAT', 'ATTGA']},
                {dna:
                        [
                            'ATGCGA',
                            'CAGTGC',
                            'TTATGT',
                            'AGAAGG',
                            'CCCCTA',
                            'TCACTG'
                        ]}            ]

            for (let i =0; i<dnas.length; i++) {
                const response = await request(server.app).post('/api/mutation').send(dnas[i]);
                expect(response.status).toBe(200);

                // Verify dna analysis was saved correctly
                const mutations = await Mutation.find({});
                expect(mutations.length).toBe(i+1);
                expect(mutations[0].hasMutation).toBe(true);
            }


        });


    })

});
