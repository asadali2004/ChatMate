import { connect, disconnect } from "mongoose";


// Connects to MongoDB using the connection string from environment variables
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connnect to MongoDb")
        
    }
}

// Disconnects from MongoDB
async function disconnectFromDatabase(){
    try {
        await disconnect();
        
    } catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect From MongoDB");
        
    }

}

export { connectToDatabase, disconnectFromDatabase}