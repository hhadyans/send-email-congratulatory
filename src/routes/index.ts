import express from 'express'
import user from './api/userRoute'

const router = express.Router()
router.use(user)

export default router