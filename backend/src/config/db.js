import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("ket noi DB successfull");
    } catch (error) {
        console.error("loi ket noi DB", error);
        process.exit(1); // exit khi loi
    }
};
