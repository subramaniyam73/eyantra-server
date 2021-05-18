const User = require('../models/user.model')
const Seeker = require('../models/seeker.model')

exports.getUser = (req, res) => {
    const id = req.params.id
    User
        .findById(id)
        .then((result) => {
            Seeker
                .findOne({user : id})
                .then((resultUser) => {
                    console.log(resultUser, result)
                    res.json({
                        message : 'Successful !',
                        user : result,
                        seeker : resultUser
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        message : 'Something went wrong !'
                    })
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message : 'Something went wrong !'
            })
        })
    
}