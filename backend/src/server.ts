import express from 'express'
import { dBConnection } from './db/connection'
import expressApp from './express'
import router from './routes/routes'

const startServer = async () => {
     const app = express()
     await dBConnection()
     await expressApp(app)
     app.use('/api', router)

     app.listen(process.env.PORT, () => {
          console.log('server runing')
     })
}

startServer()
