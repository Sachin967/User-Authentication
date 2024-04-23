import mongoose, { Document, Model } from 'mongoose'

export interface UserDocument extends Document {
     firstname: string
     lastname: string
     email: string
     password: string
     contactmode: string
     isVerified: boolean
     Otp: string
     salt: string
}

const userSchema = new mongoose.Schema<UserDocument>(
     {
          firstname: {
               type: String,
          },
          lastname: {
               type: String,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          password: {
               type: String,
               required: true,
          },
          contactmode: {
               type: String,
          },
          isVerified: {
               type: Boolean,
               default: false,
          },
          Otp: {
               type: String,
          },
          salt: { type: String },
     },
     { timestamps: true }
)

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export default User
