import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

function authController()
{
    return {
        async signup(req,res)
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
                res.status(500).json({message: error.message})
            }
        }
    }
}

export default authController;