import express, { json } from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

//configuring cors with app
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

//configuring limit of json
app.use(express.json({limit:"10kb"}))

//url encoding
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//file folder saving 
app.use(express.static("public"))

//configuring cookie parser to enable my server to access and set cookies in my client's browser securely - CRUD op on COOKIES
app.use(cookieParser())


export {app}