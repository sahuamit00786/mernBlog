import { errorHandler } from "../utils/error.js";
import {Post} from '../models/post.model.js';

function creatPostcontroller()
{
    return{
        async createPost(req,res,next)
        {
            console.log(req.body)
            if(!req.user.isAdmin)
            {
                return next(errorHandler(400,'You are not allowed to create a post.'))
            }
            if(!req.body.title || !req.body.content)
            {
                return next(errorHandler(400,'Please provide all required fields'))
            }
            const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
            const newPost = new Post({...req.body, slug, userId: req.user.id})

            try {
                const savedPost = await newPost.save();
                res.status(201).json(savedPost)
            } catch (error) {
                console.log(error)
            }

        }
    }
}

export default creatPostcontroller;