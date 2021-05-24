const Investor = require('../models/investor.model')

exports.fetchDetails = (req, res) => {
    let investor = req.params.investor
    Investor
        .findOne({user:investor})
        .then((resultUser)=>{

            if(resultUser){
                console.log(resultUser)
                res.json({
                    message : 'fetch successful !',
                    investor : resultUser
                })  
  
            }else{
                res.status(404).json({
                    message : 'investor not found !'
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : 'something went wrong'
            })
        })
}

exports.addTransaction = (req, res) => {

    //investor is user id
    let {investor,eth} = req.body
    Investor
        .findOne({user:investor})
        .then((resultUser)=>{
            if(resultUser){
                resultUser.seekersETH.push(eth)
                resultUser.save()
                res.json({
                    message : 'updated transaction !'
                })
            }else{
                res.status(404).json({
                    message : 'investor not found !'
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : 'something went wrong'
            })
        })
}