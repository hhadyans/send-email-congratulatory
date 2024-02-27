import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index'
import { db } from '../config/database'
import { sendEmailJob } from './jobs/sendEmailJob'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Application = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('public'))

app.use(
  '/api_docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)

db
  .then(() => {
    sendEmailJob.cronJob.start()
    app.use(router)
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error)
    process.exit()
  })