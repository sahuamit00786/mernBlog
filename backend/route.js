import express from 'express'
import authController from './controller/authController.js'

const router = express.Router()

router.post('/api/signup',authController().signup)
router.post('/api/signin',authController().signin)
router.post('/api/google',authController().google)

export default router