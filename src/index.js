// require('dotenv').config({path: './env'})

//APPROACH 2 - STANDARD USAGE

//modular dot env import
import dotenv from "dotenv"

//function import
import connectDB from "./db/index.js";

//importing express app
import {app} from './app.js'

//DOTENV CONFIG
dotenv.config({path: './env'})

//APPROACH 2
//since connectDB() is a async function it returns us a promise at the end and hence we handle it using then chaining

//handling connectDB async promises in then and catch
connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(
            `Server is running on port : ${process.env.PORT}`
        )
    })
}).catch((err) => {
    console.log("MONGO db connection FAILED !!!",err)
})







// NOTE - FOR APPROACH 2 WE CAN REMOVE IMPORT MONGOOSE AND DB_NAME BUT FOR APPROACH 1 BOTH IMPORTS ARE NEEDED
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";


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
