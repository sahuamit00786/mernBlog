import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './route.js';
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database')
}) .catch((error)=>{
    console.error(error);
})

const app = express()
app.use(express.json())
app.use(router)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})

