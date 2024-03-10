import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

//we are setting up configs for various channels through which our backend / server might recieve requests - from url,from frontend forms, json formats

//FOr configs we use middle wares which are accessed using the .use method of express app

// ----------------------------------------------------------------------------------------------------///////

//configuring json limit
app.use(express.json({limit: "16kb"}))



//url encoding for requests coming from urls
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))



//when we want to store some files on server like pdfs, images etc we use a static named middle ware that creates a folder named in quotes
app.use(express.static("public"))



//to access client's browsers cookies and set the cookies
app.use(cookieParser( ))

//routes import
import userRouter from "./routes/user.routes.js"





//rotes declaration
app.use("/api/v1/users",userRouter)
export {app}