const router = require('express').Router()
const authController = require('../controllers/auth.controller')


router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

//for testing purposes alone 

router.get('/register', (req,res) => {
    res.render('login')
})

module.exports = router
