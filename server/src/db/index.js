import mongoose from "mongoose"

const connectDB = async() => {
   try {
     await mongoose.connect(`${process.env.MONGO_URI}/education360`)
     console.log(`MongoDB Connected SuccessFully`);
   } catch (error) {
    console.log(error);
    process.exit(1)
    
   }
    
}

export {connectDB}