import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.0-yjR_VBBDmg7ONcbcBBYQHaFj&pid=Api&P=0&h=180"
    },
    category:{
        type:String,
        default:"uncategorized"
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    
},{timestamps:true})

export const Post = mongoose.model('Post',postSchema);