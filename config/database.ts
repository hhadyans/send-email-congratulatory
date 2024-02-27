import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connString = process.env.DB_CONN_STRING
if (!connString) {
  throw 'Missing MongoDB Connection String';
}

const options: mongoose.ConnectOptions = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  dbName: process.env.DB_NAME
}

export const db = mongoose.connect(connString, options)
  .then(res => {
    if (res) {
      console.log('Successfully connect to database.')
    }
  })
  .catch(err => {
    console.error(err)
  })