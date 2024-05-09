import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

console.log(process.env.MONGODB_URL, DB_NAME)
console.log(process.env.MONGODB_URL)
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected successfully to Database || DB Host::", connectionInstance.connection.host);
        
    } catch (error) {
        console.log("Error in connecting DB::", error.message);
        process.exit(1);
    }
}


export default connectDB;