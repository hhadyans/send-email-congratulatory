import { Schema, model } from 'mongoose'

export interface UserData {
  _id?: string
  firstName: string
  lastName: string
  email: string
  birthdayDate: string // save in timestamp
  location: location
  createdAt: number
  updatedAt?: number
}

interface location {
  country: string
  state: string
  city: string
  address: string
  timezoneOffset: number
}

export type UserPayload = Omit<UserData, '_id' | 'createdAt' | 'updatedAt' | 'birthdayAt'> & {
  birthdayDate: Date
}

const userSchema = new Schema<UserData>({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  birthdayDate: String,
  location: {
    country: String,
    state: String,
    city: String,
    address: String,
    timezoneOffset: Number
  },
  createdAt: Number,
  updatedAt: Number
})

export const UserModel = model<UserData>('User', userSchema)