import config from "../config/index.js";
import mongoose from "mongoose";

const mongodb = async () => {

    try {
        await mongoose.connect(config.dbURL);
        console.log("Connected To MongoDB ==> OK ✅");
    } catch (error) {
        console.log("Connection Error 🟥", error);
    }
}

export default mongodb;