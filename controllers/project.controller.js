const User = require('../models/user.model')
const Seeker = require('../models/seeker.model')
const Project = require('../models/project.model')
const userController = require('./user.controller')
const mongoose = require('mongoose')

exports.fetchAll = (req, res) => {
    Project
        .find({ })
        .then((result) => {
            res.json({
                message : 'Successful !',
                data : result
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message : 'Something went wrong !'
            })
        })

}

exports.fetchProject = (req, res) => {
    console.log(req.params.id);
    Project
        .findById(req.params.id)
        .then((result) => {
            Seeker
                .findOne({user : result.seeker})
                .then((resultSeeker) => {
                    res.json({
                        message : 'Successful !',
                        project : result,
                        seeker : resultSeeker
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        message : 'Something went wrong !'
                    })
                })

            
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message : 'Something went wrong !'
            })
        })
}

exports.createProject = (req, res) => {

    //seeker is user id
    let {seeker, deposit, address, name, description, totalRequiredTokens} = req.body
    seeker = mongoose.Types.ObjectId(seeker)
    Seeker
        .find({user:seeker})
        .then((result) => {
            if(result.length==0){
                res.status(404).json({
                    message : 'seeker does not exist'
                })
            }else{
                console.log(result.stage);
                if(result[0].stage==5){

                    //creating object
                    let newProject = new Project({
                        seeker,
                        deposit,
                        address,
                        name,
                        description,
                        totalRequiredTokens,
                        eth : result[0].eth,
                    })
                    newProject.save()

                    //update seeker project field
                    result[0].project = newProject._id
                    result[0].save()


                    res.json({
                        message : 'New project created successfully !',
                        id : newProject._id
                    })
                }else{
                    res.status(400).json({
                        message : 'complete verification to create project'
                    })
                } 
            }
        })
}

exports.uploadPhoto = (req, res) => {
    let project = req.params.project

    userController.upload(req, res, (err)=>{

        if (err) {
            return res.status(500).json(err)
        }


        Project
        .findById(project)
        .then((result)=>{
            if(result){
                
                console.log(result)
                console.log(req.fileData.name)
                result.image = req.fileData.name
                result.save()
                res.status(200).send('photo uploaded for project')
            }else{
                res.status(404).send('project not found')
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).send(e)
        })
    })
    
}

