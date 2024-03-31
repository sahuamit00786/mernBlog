import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './route.js';
import cookieParser from 'cookie-parser';
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database')
}) .catch((error)=>{
    console.error(error);
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(router)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statuscode).json({
        success:false,
        status:statuscode,
        message:message
    })
})

