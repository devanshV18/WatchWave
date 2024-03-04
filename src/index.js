// require('dotenv').config({path: './env'})
import dotenv from "dotenv"


// NOTE - FOR APPROACH 2 WE CAN REMOVE IMPORT MONGOOSE AND DB_NAME BUT FOR APPROACH 1 BOTH IMPORTS ARE NEEDED
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

//APPROACH 2
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB connection successful",err)
})

/*APPROACH 1 TO CONNECT DATABASE
import express from "express"
const app = express()
//iffy - immediate invoking function
;( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        //if connection fails it is oblivious app cant talk to DB hence:-
        app.on("error",(error) => {
            console.log("ERROR: ", error);
            throw error
        })
        //if Database connection is successful then app can listen hence:-
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.nextTick.PORT}`);
        })

    }catch(error){
        console.log("Error: ",error)
    }
})()
*/
