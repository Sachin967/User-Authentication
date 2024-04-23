import cookieParser from 'cookie-parser'
import express from 'express'
import { Application } from 'express'
import cors from 'cors'

const expressApp = async (app: Application): Promise<void> => {
     app.use(express.json({ limit: '10mb' }))
     app.use(express.urlencoded({ extended: true, limit: '10mb' }))
     app.use(cookieParser())
     const corsOptions = {
          origin: ['http://localhost:5173', 'https://userauth.sachinms.fyi'],
          credentials: true,
     }

     app.use(cors(corsOptions))
}

export default expressApp
