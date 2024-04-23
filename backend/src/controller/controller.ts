import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { generateOTP, generatePassword, generateSalt, generateToken, sendOTP, validatePassword } from '../utils/util'
import User, { UserDocument } from '../db/model'

interface RegisterUserRequest extends Request {
     body: {
          firstname: string
          lastname: string
          email: string
          password: string
          contactmode: string
     }
}

interface LoginUserRequest extends Request {
     body: {
          email: string
          password: string
     }
}

interface VerifyOTPRequest extends Request {
     body: {
          otp: string
          id: string
     }
}

interface ResendOtpRequest extends Request {
     body: {
          id: string
     }
}

const Controller = {
     registerUser: asyncHandler(async (req: RegisterUserRequest, res: Response, next: NextFunction) => {
          const { firstname, lastname, email, password, contactmode } = req.body

          try {
               let salt = await generateSalt()
               let userPassword = await generatePassword(password, salt)
               let Otp = generateOTP()

               const emailExists = await User.findOne({ email })

               if (emailExists) {
                    res.status(400)
                    throw new Error('User already exists')
               }

               const user: UserDocument = await User.create({
                    firstname,
                    lastname,
                    email,
                    password: userPassword,
                    contactmode,
                    Otp,
                    salt,
               })

               const otpResponse = await sendOTP(email, Otp)
               await generateToken(res, user._id)
               const response = {
                    Id: user.id,
                    otpResponse: otpResponse,
               }
               res.json(response)
          } catch (error) {
               console.log(error)
               next(error)
          }
     }),
     VerifyOtp: asyncHandler(async (req: VerifyOTPRequest, res: Response, next: NextFunction) => {
          const { otp, id } = req.body
          try {
               const user: UserDocument | null = await User.findById(id)

               if (!user) {
                    res.status(404).json({ status: false, message: 'User not found' })
                    return
               }

               if (otp === user.Otp) {
                    const response: UserDocument | null = await User.findByIdAndUpdate(
                         id,
                         { isVerified: true },
                         { new: true }
                    )

                    if (!response) {
                         res.status(500).json({ status: false, message: 'Failed to update user' })
                         return
                    }
                    res.json(response)
                    return
               } else {
                    res.status(400).json({ status: false, message: 'Invalid OTP' })
                    return
               }
          } catch (error) {
               console.log(error)
               next(error)
          }
     }),
     authUser: asyncHandler(async (req: LoginUserRequest, res: Response, next: NextFunction) => {
          const { email, password } = req.body

          try {
               const existingUser: UserDocument | null = await User.findOne({ email })

               if (!existingUser) {
                    res.status(401).json('Invalid email or password')
                    return
               }

               if (!existingUser.isVerified) {
                    res.status(403).json('You are not verified')
                    return
               }

               const validPassword: boolean = await validatePassword(password, existingUser.salt, existingUser.password)

               if (!validPassword) {
                    res.status(401).json('Invalid email or password')
                    return
               }

               await generateToken(res, existingUser._id)
               res.json({ id: existingUser._id, email: existingUser.email })
               return
          } catch (error) {
               console.log(error)
               next(error)
          }
     }),
     ResendOtp: asyncHandler(async (req: ResendOtpRequest, res: Response) => {
          try {
               const { id } = req.body
               const otp = generateOTP()
               const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: { Otp: otp } }, { new: true })

               if (!updatedUser) {
                    res.status(404).json({ message: 'User not found' })
                    return
               }
               const otpResponse = await sendOTP(updatedUser.email, updatedUser.Otp)
               res.json(otpResponse)
               return
          } catch (error) {
               console.error(error)
               res.status(500).json({ message: 'Internal Server Error' })
          }
     }),
     logOut: asyncHandler(async (req: Request, res: Response) => {
          console.log('vannu')
          try {
               res.cookie('jwt', '', {
                    httpOnly: true,
                    expires: new Date(0),
               })
               res.status(200).json({ status: true, message: 'Logged out' })
               return
          } catch (error) {
               if (error instanceof Error) res.status(500).json({ message: error.message })
          }
     }),
}

export { Controller }
