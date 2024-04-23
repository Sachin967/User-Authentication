import express from 'express'
import { Controller } from '../controller/controller'
const router = express.Router()

router.post('/login',Controller.authUser)
router.post('/register',Controller.registerUser)
router.post('/verify',Controller.VerifyOtp)
router.post('/logout',)
	router.post('/resendotp',Controller.ResendOtp)


export default router