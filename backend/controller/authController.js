import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

function authController()
{
    return {
        async signup(req,res,next)
        {
            const {username,email,password} = req.body;
            if(!username || !password || !email)
            {
                return res.status(400).json({message:'Invalid username or password'})
            }

            const hashedPassword =  bcrypt.hashSync(password,10);

            const newUser = new User({username,email,password:hashedPassword});
            
            try {
                await newUser.save();
                console.log(newUser)
                res.json('Signup successful')
            } catch (error) {
                next(error)
            }
        },

        async signin(req,res,next)
        {
            const {username,password} = req.body;
            if(!username ||!password)
            {
                next(errorHandler(400,' All fields are required'))
            }
           
            try {
                const validUser = await User.findOne({username})     
                if(!validUser)
                {
                    return next(errorHandler(400,'User not found'))
                }
                console.log(validUser)
                const validPassword = bcrypt.compareSync(password, validUser.password)
                if(!validPassword)
                {
                    return next(errorHandler(400,'Invalid password'))
                }

                // provide a token to the user

                const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)
                res.status(200).cookie('access_token',token,{
                    httpOnly: true,
                }).json(validUser)

            } catch (error) {
                
            }
        }   

    }
}

export default authController;