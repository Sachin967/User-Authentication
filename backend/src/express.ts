import cookieParser from 'cookie-parser'
import express from 'express'
import { Application } from 'express'


const expressApp = async (app: Application):Promise<void> => {
     app.use(express.json({ limit: '10mb' }))
     app.use(express.urlencoded({ extended: true, limit: '10mb' }))
     app.use(cookieParser())
}

export default expressApp
