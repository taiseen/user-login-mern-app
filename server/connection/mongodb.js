import mongoose from "mongoose";

const mongodb = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To MongoDB ==> OK ✅");
    } catch (error) {
        console.log("MongoDB Connection 🟥 ")
    }
}

export default mongodb;