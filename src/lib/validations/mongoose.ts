import mongoose from "mongoose"

let isConnected = false

export const connectDb = async () => {

    mongoose.set('strictQuery', true)

    if (!process.env.MONGODB_URI) return console.log('MONGODB URL not found')
    if (isConnected) {
        console.log("connected to MONGODB")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true
        console.log("connected to MONGODB")
    } catch (error) {
        console.log("Error in connection to DB", error);
        
    }

}