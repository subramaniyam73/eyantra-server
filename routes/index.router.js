const router = require('express').Router({ mergeParams: true })
const authRouter = require('./auth.router')
const projectRouter = require('./project.router')
const userRouter = require('./user.router')

router.use('/auth', authRouter)
router.use('/project', projectRouter)
router.use('/user', userRouter)

module.exports = router 