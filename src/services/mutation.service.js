import {Mutation} from "../models/mutatios.model.js";



/**
 * it verifies if a single dna Row is valid. It receives a row and the expected Size.
 * it compares if the size of the current row matches expected length to make a NxN array
 * it also verifies if the row matches with he expected pattern: /^[ATCG]+$/
 * @param row {string}
 * @param expectedSize {number}
 * @return {boolean}
 */
export const isValidString = (row, expectedSize) => {
    const regex = /^[ATCG]+$/

    // Verify if the entry matches with the length to make NxN array
    if(row.length !== expectedSize) return false

    // Verify if the entry has only valid characters
    return regex.test(row);
}

/**
 * it verifies if the provided dna matrix is valid
 * @param dna {string[]}
 * @return {boolean}
 */
export const isValidEntry = (dna) => {
    let isValid;
    let i = 0

    // Verify if the entry has at least 4 strings
    // if it has less than 4 string no mutations can be identified.
    isValid = dna.length >= 4;

    while(isValid && i < dna.length) {
        isValid = isValidString(dna[i], dna.length);
        i ++;
    }
    return isValid
}


/**
 * it returns the quantity of mutations found in a single line.
 * If the currentTotalMutationCount reaches 2 mutations, the process is stopped y it returns the currentMutationAmount.
 * @param line {string}
 * @param currentMutationCount {number}
 * @return {number}
 */
export const searchMutationsOnSingleLine = (line, currentMutationCount = 0) => {
    const sequencesToSearch = ['AAAA','TTTT', 'CCCC', 'GGGG'];
    let i = 0;
    while( currentMutationCount < 2 && i<sequencesToSearch.length) {
        if(line.includes(sequencesToSearch[i])){
            currentMutationCount ++;
        }
        i ++;
    }
    return currentMutationCount;
}


/**
 * it returns the quantity of mutations found in all the rows.
 * If the currentTotalMutationCount reaches 2 mutations, the process is stopped y it returns the currentMutationAmount.
 * @param dna {string []}
 * @param currentMutationCount {number}
 * @return {number}
 */
const searchMutationsByRows = (dna, currentMutationCount = 0) => {
    let i = 0;
    while( currentMutationCount < 2 && i < dna.length) {
        //console.log('searchMutationsByRows - CurrentMutation before', currentMutationCount)
        currentMutationCount =  searchMutationsOnSingleLine(dna[i], currentMutationCount);
        //console.log('searchMutationsByRows - CurrentMutation after', currentMutationCount)
        i ++;
    }

    return currentMutationCount;
}

/**
 * It inverts the matrix in order to allow searching mutations by columns as rows;
 * @param dna {string []}
 * @return {string []}
 */
const invertDnaArray = (dna) => {
    const invertedDna = [];

    for(let i=0; i<dna.length; i++) {
        let newRow = '';

        for(let e=0; e<dna.length; e++){
            newRow = newRow + dna[e][i];
        }

        invertedDna.push(newRow);
    }

    return invertedDna;
}

/**
 * It retrieves the diagonals which has more than 4 elements from 0 to the bottom
 * @param dna { string[] }
 * @return { string []}
 */
const getDiagonalsFromBeginningDown = (dna) => {
    const diagonalsDna = [];

    let baseY = 0
    while(dna.length - baseY >= 4){
        let newRow = ''

        for(let y = baseY; y<dna.length; y++){
            newRow = newRow + dna[y][y-baseY];
        }

        diagonalsDna.push(newRow);
        baseY++;
    }


    return diagonalsDna;
}


/**
 * It retrieves the diagonals which has more than 4 elements from 0 to the end
 * @param dna { string[] }
 * @return { string []}
 */
const getDiagonalsFromBeginningTop = (dna) => {
    const diagonalsDna = [];

    let baseX = 1
    while(dna.length - baseX >= 4){
        let newRow = ''

        for(let x = baseX; x<dna.length; x++){
            newRow = newRow + dna[x-baseX][x];
        }

        diagonalsDna.push(newRow);
        baseX++;
    }


    return diagonalsDna;
}


/**
 * It retrieves the diagonals which has more than 4 elements from the end to the bottom
 * @param dna { string[] }
 * @return { string []}
 */
const getDiagonalsFromEndDown = (dna) => {
    const diagonalsDna = [];

    let baseY = 0
    while(dna.length - baseY >= 4){
        let newRow = ''

        for(let y = baseY; y<dna.length; y++){

                newRow = newRow + dna[y][dna.length-1-y+baseY];

        }

        diagonalsDna.push(newRow);
        baseY++;
    }


    return diagonalsDna;
}



/**
 * It retrieves the diagonals which has more than 4 elements from end  to the bottom
 * @param dna { string[] }
 * @return { string []}
 */
const getDiagonalsFromEndTop = (dna) => {
    const diagonalsDna = [];

    let inverseBaseX = 1
    while(dna.length - inverseBaseX >= 4){
        let newRow = ''
        let baseX = dna.length-1-inverseBaseX


        for(let x = baseX; x>=0; x--){
            newRow = newRow + dna[baseX-x][x];
        }

        diagonalsDna.push(newRow);
        inverseBaseX++;
    }


    return diagonalsDna;
}


/**
 * It receives a DNA array and it returns if there is any mutation
 * @param dna {string[]}
 * @return {{dna, hasMutation: boolean}|{dna: string[], hasMutation: boolean}}
 */
export const hasMutation =  (dna) => {
    const totalRows = dna.length;
    const isValid = isValidEntry(dna);
    let currentMutationCount = 0;


     // Verify if the entry is valid
    if(!isValid) return {
        hasMutation: false,
        dna: []
    }

    // Find mutation by Rows
    currentMutationCount = searchMutationsByRows(dna);
    //console.log(`CurrentMutations after checking by Rows: ${currentMutationCount}`);
    if (currentMutationCount>= 2) return {
        hasMutation: true,
        dna
    }

    // Find mutations by Columns
    currentMutationCount = searchMutationsByRows(invertDnaArray(dna), currentMutationCount);
    //console.log(`CurrentMutations after checking by Columns: ${currentMutationCount}`);
    if (currentMutationCount>= 2) return {
        hasMutation: true,
        dna
    }

    // Find Mutations within the diagonals
    // In order to perform this action the Matrix was divided in 4 pieces
    currentMutationCount = searchMutationsByRows(getDiagonalsFromBeginningDown(dna), currentMutationCount);
    //console.log(`CurrentMutations after checking by DiagonalsFromZeroDown: ${currentMutationCount}`);
    if (currentMutationCount>= 2) return {
        hasMutation: true,
        dna
    }

    currentMutationCount = searchMutationsByRows(getDiagonalsFromBeginningTop(dna), currentMutationCount);
    //console.log(`CurrentMutations after checking by DiagonalsFromZeroTop: ${currentMutationCount}`);
    if (currentMutationCount>= 2) return {
        hasMutation: true,
        dna
    }

    currentMutationCount = searchMutationsByRows(getDiagonalsFromEndDown(dna), currentMutationCount);
    //console.log(`CurrentMutations after checking by DiagonalsFromEndDown: ${currentMutationCount}`);
    if (currentMutationCount>= 2) return {
        hasMutation: true,
        dna
    }

    currentMutationCount = searchMutationsByRows(getDiagonalsFromEndTop(dna), currentMutationCount);
    //console.log(`CurrentMutations after checking by DiagonalsFromEndTop: ${currentMutationCount}`);
    if (currentMutationCount>= 2) return {
        hasMutation: true,
        dna
    }


    return {
        hasMutation: false,
        dna
    }


}
/**
 * This function receives a dna process request, it triggers hasMutation() to analyze the dna matrix.
 * In case it receives an OK result from hasMutation(), it stores the dna record with its mutation result into the DB
 * @param dna {string[]}
 * @return {{dna: string[], ok: boolean, hasMutation: boolean}|{ok: boolean}}
 */
export const processMutationRecord = async (dna) => {

    const processedRecord = hasMutation(dna);

    if (processedRecord.dna && processedRecord.dna.length > 0) {
       const mutation = new Mutation(processedRecord);
       try {
           await mutation.save();
       } catch (e) {
           console.error('It was not possible to store the analyzed dna', e)
           return {ok: false};
       }
    }

    return  {
        ok: true,
        hasMutation: processedRecord.hasMutation,
        dna: processedRecord.dna
    }
}



export const mutationStats = async () => {

    try {
        const count_mutations = await Mutation.countDocuments({hasMutation: true});
        const count_no_mutations = await Mutation.countDocuments({hasMutation: false});
        const ratio = (count_no_mutations) ? count_mutations / count_no_mutations : 1;

        return {
            ok: true,
            count_mutations,
            count_no_mutations,
            ratio
        }

    } catch (e) {
        console.error('It was not possible to retrieve the stats', e)
        return {ok: false};
    }



}

