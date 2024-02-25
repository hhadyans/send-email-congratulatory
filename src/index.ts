import express, { Application } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index'

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

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})