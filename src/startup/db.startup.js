import mongoose from "mongoose";

export const dbStartup = async (connectionString = process.env.DB_CONNECTION_URL) =>{

    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        await mongoose.connect(connectionString, connectionOptions);
        console.info("connected to MongoDB...");
    } catch (e) {
        console.error('It was not possible to get connected to the MongoDB', e)
    }



}
