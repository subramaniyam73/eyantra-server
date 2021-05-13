const router = require('express').Router({ mergeParams: true })
const authRouter = require('./auth.router')

router.use('/auth', authRouter)

module.exports = router 