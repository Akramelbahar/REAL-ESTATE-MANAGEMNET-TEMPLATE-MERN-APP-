import mongoose from "mongoose";
const connectToMongoDB = async () =>{
    console.log(process.env.MongoURI);
    try {
        await mongoose.connect(process.env.MongoURI);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Error Connecting to mongoDB:",error.message);
    }
}
export default connectToMongoDB