import mongoose  from "mongoose";

const connectDb= async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
          console.log("Database connected");
    }
    catch(error)
    {
        console.log("erro in connecting to db", error);
           process.exit(1);
    }
}

export default connectDb;