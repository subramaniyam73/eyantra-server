const User = require('../models/user.model')
const Seeker = require('../models/seeker.model')

const multer = require('multer')
const path = require('path')

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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
})

var upload = multer({ 
    storage: storage,
    limits: { },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic");   



exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if(err) res.send(err)

        else res.send('success')
    })
}

exports.renderFile = (req, res) => {
    var fileName = req.params.fileName

    res.sendFile(path.resolve(`uploads/${fileName}`), (err) => {
        if(err) res.send(err)
        else{
            console.log('sent - ')
        }
    })
}