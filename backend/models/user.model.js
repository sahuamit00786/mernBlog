import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:'https://tse1.mm.bing.net/th?id=OIP.F9Hd92aEbFQTGbFATwtoowHaGu&pid=Api&P=0&h=180'
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema)