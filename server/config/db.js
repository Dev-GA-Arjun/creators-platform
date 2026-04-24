import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()



const connectDB = async () => {
    try{
        const MONGODB_URI = process.env.MONGODB_URI
        await mongoose.connect(MONGODB_URI)
        console.log("Connection Successfully with Database")
    }catch(err){
        console.log("Connection Failed")
        process.exit(1)
    }
}
export default connectDB;