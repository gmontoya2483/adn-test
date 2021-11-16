import mongoose from 'mongoose'

const mutationSchema = new mongoose.Schema({
    hasMutation: {
        required: true,
        type: Boolean
    },
    dna: {
        required: true,
        type: [String]
    },
    dateTimeCreated: {
        type: Date,
        default: Date.now
    }
});

//Mutation Schema Class
export const Mutation = mongoose.model('Mutation', mutationSchema);
