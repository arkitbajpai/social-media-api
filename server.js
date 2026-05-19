import { configDotenv } from "dotenv";
import app from "./src/app.js"
import connectDb from "./src/config/db";


connectDb();

const PORT = process.env.PORT|| 5005;


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});
