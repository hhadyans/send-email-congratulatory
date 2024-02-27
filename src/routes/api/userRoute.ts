import express from 'express'
import UserController from '../../controllers/userController'

const user = express.Router()
const userController = new UserController()

user.post('/user', async (req, res, next) => {
  return await userController.store(req.body)
    .then(data => res.send(data))
    .catch(err => next(err))
})

user.put('/user/:id', async (req, res, next) => {
  return await userController.update(req.params.id, req.body)
    .then(data => res.send(data))
    .catch(err => next(err))
})

user.get('/user/:id', async (req, res, next) => {
  return await userController.get(req.params.id)
    .then(data => res.send(data))
    .catch(err => next(err))
})

user.delete('/user/:id', async (req, res, next) => {
  return await userController.delete(req.params.id)
    .then(data => res.send(data))
    .catch(err => next(err))
})

user.get('/user', async (req, res, next) => {
  return await userController.list()
    .then(data => res.send(data))
    .catch(err => next(err))
})

export default user