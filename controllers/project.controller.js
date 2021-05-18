const User = require('../models/user.model')
const Seeker = require('../models/seeker.model')
const Project = require('../models/project.model')
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
                .findById(result.seeker)
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
    let {seeker,deposit} = req.body
    seeker = mongoose.Types.ObjectId(seeker)
    let newProject = new Project({
        seeker,
        deposit,
        amount_received : 0,
        investor_count : 0,
        transactions : []
    })
    newProject.save()
    res.json({
        message : 'New project created successfully !'
    })
}
