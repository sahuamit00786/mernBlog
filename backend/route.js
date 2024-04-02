import express from 'express'
import authController from './controller/authController.js'
import creatPostcontroller from './controller/creatPostcontroller.js'
import updateController from './controller/updateController.js'
import { verifyToken } from './utils/verifyUser.js'

const router = express.Router()

router.post('/api/signup',authController().signup)
router.post('/api/signin',authController().signin)
router.post('/api/google',authController().google)
router.post('/api/signOut',updateController().signOut)
router.delete('/api/delete/:userId',verifyToken, updateController().deleteUser)
router.put('/api/update/:userId',verifyToken,updateController().updateProfile)  // to this we have to check is user is authenticated or not in wit thw help of cookie

// createPost routes
router.post('/api/createpost',verifyToken,creatPostcontroller().createPost)
router.get('/api/getPosts',creatPostcontroller().getPosts)


export default router