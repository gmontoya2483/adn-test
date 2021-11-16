// import { server } from '../../src/server.js'
//import request from 'supertest'
import {
    hasMutation,
    isValidEntry,
    isValidString,
    searchMutationsOnSingleLine
} from "../../src/services/mutation.service.js";


describe('isValidString', () => {

    test('should return false if the row´s length is not equal to the expected rowSize', () => {
        const result = isValidString('AACCTG', 5);
        expect(result).toBe(false);
    });

    test('should return false if the row doesn´t match the pattern /^[ATCG]+$/', () => {
        const result = isValidString('AACCTF', 6);
        expect(result).toBe(false);
    });

    test('should return true if the row match the pattern /^[ATCG]+$/ and its length is equal to the expectedSize', () => {
        const result = isValidString('AACCTA', 6);
        expect(result).toBe(true);
    });


    describe('isValidEntry', () => {

        describe('Positive test cases', () => {
            test('should return true if the dna array is valid', () => {
                const result = isValidEntry(['AAAGG', 'CCCGG', 'AAGGG', 'CCCTA', 'CCCTT']);
                expect(result).toBe(true);
            });
        });

        describe('Negative test cases', () => {

            test('should return false if the dna array´s length is lower that 4', () => {
                const result = isValidEntry(['AAA', 'CCC', 'GGG']);
                expect(result).toBe(false);
            });


            test('should return false if the dna array is not in NxN format', () => {
                const result = isValidEntry(['AAAGG', 'CCCGG', 'AAGGG', 'CCCGG']);
                expect(result).toBe(false);
            });

            test('should return false if the dna array is not in NxN format', () => {
                const result = isValidEntry(['AAAGG', 'CCCGG', 'AAGGG', 'CCCG', 'CCCGG']);
                expect(result).toBe(false);
            });

            test('should return false if the dna array is not in NxN format', () => {
                const result = isValidEntry(['AAAGG', 'CCCGG', 'AAGGG', 'CCCGA', 'CCCTTTTGG']);
                expect(result).toBe(false);
            });

            test('should return false if the dna array has the correct shape NxN however there are invalid characters', () => {
                const result = isValidEntry(['AAAGG', 'CCCGG', 'AAGGG', 'CCCYA', 'CCCTT']);
                expect(result).toBe(false);
            });

        });
    });


    describe('searchMutationsOnSingleLine', () => {
        test('should return 0 if there is no mutation within the line', () => {
            const result = searchMutationsOnSingleLine ('AATTCG');
            expect(result).toBe(0);
        })

        test('should return 1 if there is no mutation within the line however it has already 1 mutation', () => {
            const result = searchMutationsOnSingleLine ('AATTCG', 1);
            expect(result).toBe(1);
        })

        test('should return 1 if there is a mutation within the line', () => {
            const result = searchMutationsOnSingleLine ('AAAACG');
            expect(result).toBe(1);
        })

        test('should return 2 if there are 2 mutations within the line', () => {
            const result = searchMutationsOnSingleLine ('CAAAAGGCCCCAG');
            expect(result).toBe(2);
        })


        test('should return 2 if there are more than 2 mutations within the line', () => {
            const result = searchMutationsOnSingleLine ('CAAAAGGCCCCAGGGG');
            expect(result).toBe(2);
        })


    });

    describe('hasMutation', () => {
        describe('Positive cases',  ()=> {



            test('should return  hasMutation false and the submitted dna array if the provided dna is valid and has not mutation', () => {

                const dnaExpectedResults = [
                    { dna: ['AGGCA', 'TTCGG', 'CTAGC', 'AGCCC', 'CAGTC'], expectedResult: false },
                    { dna: ['AAAAA', 'TTGGG', 'CCAAC', 'CCCCC', 'CCGGC'], expectedResult: true }
                ]

                for(const dnaExpectedResult of dnaExpectedResults) {
                    const resultado = hasMutation(dnaExpectedResult.dna);
                    expect(resultado.hasMutation).toBe(dnaExpectedResult.expectedResult);
                    expect(resultado.dna).toBeInstanceOf(Array);
                    expect(resultado.dna.length).toBe(dnaExpectedResult.dna.length);
                    expect(resultado.dna).toEqual(dnaExpectedResult.dna);
                }

            });

        });


        describe('Negative cases', () => {
            test('should return  hasMutation false and an empty dna array if  the provided dna array is invalid', () => {

                const invalidDnas = [
                    [],
                    ['AAA', 'GGG', 'CCC'],
                    ['AAAAA', 'GGGGG', 'CCCCC', 'CCCCC'],
                    ['AAAAA', 'GGGGG', 'CCCCC', 'CCCCC', 'CCCCB']
                ]

                for (const dna of invalidDnas) {
                    const resultado = hasMutation(dna);
                    expect(resultado.hasMutation).toBe(false);
                    expect(resultado.dna).toBeInstanceOf(Array);
                    expect(resultado.dna.length).toBe(0);
                }


            });


        })



    });


});


