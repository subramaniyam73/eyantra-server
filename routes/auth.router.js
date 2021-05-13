const { nanoid } = require('nanoid');
const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

router.get('/register', (req,res) => {
    res.render('login')
})
router.post('/register', (req,res) => {
    const {email,name,password} = req.body;

    console.log(req.body);
    User.exists({email})
        .then((result)=>{
            if(result){
                console.log(result);
                res.status(400).json({
                    message: 'User Already exists !'
                });
            }else{


                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash( password, salt, function(err, hash) {
                        if(err){
                            console.log(err);
                        }
            
                        let session = nanoid()
                        let user = new User({
                            name,
                            email,
                            password: hash,
                            session
                        })
                    
                        user.save()
                        res.json({
                            message: 'Registered successfully !',
                            session
                        })
                    });
                });


            }
        })
        .catch((err)=>{
            console.log(err);
            
        });

    
    

});

router.post('/login', (req,res) => {
    let {email,password} = req.body
    User.findOne({email})
        .then((result)=>{
            if(!result){
                res.status(404).json({
                    message: "User Does not Exist !"
                })
            }else{
                bcrypt.compare(password, result.password, (err,comResult) => {
                    if(err){
                        console.log(err);
                        res.status(500)
                    }else{
                        if(comResult){

                            let session = nanoid()
                            res.json({
                                message: "User logged in successfully !",
                                session 
                            })
                        }else{
                            res.status(401).json({
                                message: "Invalid credentials !"
                            })
                        }
                    }
                } )
            }
        })
})

module.exports = router;
