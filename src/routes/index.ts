import express from 'express'
import user from './api/user'

const router = express.Router()
router.use(user)

export default router