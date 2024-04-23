import cookieParser from 'cookie-parser'
import express from 'express'
import { Application } from 'express'
import cors from 'cors'

const expressApp = async (app: Application): Promise<void> => {
     app.use(express.json({ limit: '10mb' }))
     app.use(express.urlencoded({ extended: true, limit: '10mb' }))
     app.use(cookieParser())
     // const corsOptions = {
     //      origin:  'https://userauth.sachinms.fyi',
     //      credentials: true,
     // }

     // app.use(cors(corsOptions))
     app.use(
          cors({
               origin: 'hhttps://userauth.sachinms.fyi',
               methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
               credentials: true,
          })
     )
}

export default expressApp
