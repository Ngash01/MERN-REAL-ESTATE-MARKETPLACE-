import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose"
import "dotenv/config"
import userRouter from "./routes/userRoute.js";
import AuthRouter from "./routes/AuthRoute.js"
import listingRouter from "./routes/listingRouter.js";

 
const app = express();

app.use(bodyParser.json())

app.use(cors())

app.get("/", (req, res)=>{
    res.status(200).send("This is the server's home route")
})

app.use('/api/user', userRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/listing', listingRouter)


// middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error!"
    res.status(statusCode).send({
        success: false,
        statusCode : statusCode,
        message :message
    })
})


mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connection with database established successfully!")
        app.listen(5000, console.log("Server is listening on port http://localhost:5000"));
    }).catch((err)=>{
        console.log(err)
    })



