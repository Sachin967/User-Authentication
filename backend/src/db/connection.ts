import mongoose from 'mongoose'
import 'dotenv/config'

export const dBConnection = async (): Promise<void> => {
     try {
      console.log(process.env.MONGODB_URL)
          await mongoose.connect(process.env.MONGODB_URL as string)
          console.log('Connected to MongoDB')
     } catch (error) {
          console.log(error)
          process.exit(1)
     }
}
