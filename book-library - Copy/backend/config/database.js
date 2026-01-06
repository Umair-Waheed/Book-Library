import mongoose from "mongoose"

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase is Connected");
    } catch (error) {
        console.log(error);
    }

}

export {connectDB};