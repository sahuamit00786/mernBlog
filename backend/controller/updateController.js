import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import { User } from '../models/user.model.js'
function updateController()
{
    return{
       async updateProfile(req,res,next)
        {
            console.log(req.body)
            if(req.user.id !== req.params.userId)
            {
                return next(errorHandler(401, 'Unauthorized'))
            }
            if(req.body.password)
            {
                req.body.password = bcryptjs.hashSync(req.body.password,10)
            }
            if(req.body.username)
            {
                if(req.body.username.length < 7 || req.body.username.length>20)
                {
                    return next(errorHandler(400, 'username too short or too long'));
                }

                if(req.body.username.includes(' '))
                {
                    return next(errorHandler(400, 'username cannot contain spaces'));
                }
            }

            try {
                const updateUser = await User.findByIdAndUpdate(req.params.userId,{
                    $set:{
                        username:req.body.username,
                        password:req.body.password,
                        profilePicture:req.body.profilePicture,
                        email:req.body.email
                    }
                },{new:true}
              )
              const{password, ...rest} = updateUser._doc;
              console.log(updateUser._doc)
              res.status(200).json(rest)
            } catch (error) {
                next(errorHandler(401, 'You are not authorized to update this user'))
            }

        },
        async deleteUser(req,res,next)
        {
            console.log(req.user)
            if(req.user.id !== req.params.userId)
            {
                return next(errorHandler(401, 'You are not authorized dndjbchjscjs to delete this user'))
            }
            try {
                await User.findByIdAndDelete(req.params.userId)
                res.status(200).json({message: 'User deleted successfully'})
            } catch (error) {
                next(errorHandler(401, 'You are not authorized to delete this user'))
                console.log(error)
            }
        },
        async signOut(req,res,next)
        {
            try {
                res
                .clearCookie('access_token')
                .status(200)
                .json('User has been signed out');
            } catch (error) {
                 next(error);
            }
        }
    }
}

export default updateController;