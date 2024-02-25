import express from 'express'
import UserController from '../../controllers/user'

const user = express.Router()
const userController = new UserController()

user.post('/user', async (req, res) => {
  const response = await userController.store(req.body)
  return res.send(response)
})

export default user