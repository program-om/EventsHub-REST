const User = require('../users/userModel');
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    var userDate = req.body
    var user = new User(userDate) //user is a mongoose.model()
    user.save()
    .then(registeredUser => {
        let payload = {
            subject: registeredUser._id
        }
        
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({
            token
        })
    }).catch(error => {
        res.status(500).json(error)
    })
}


exports.login = (req, res) => {
    var userData = req.body

    User.findOne({email: userData.email})
    .then( user => {
        if (!user) { //no user found
            throw new Error('invalid email')
        }else if (user.password !== userData.password) {
            throw new Error('invalid password')
        }

        var payload = { subject: user._id }
        var token = jwt.sign(payload, 'secretKey')
        res.status(200).send({
            token
        })
    })
    .catch( err => {
        if(err.message == "invalid email"){
            res.status(401).json({message: err.message})
        }else if(err.message == 'invalid password'){
            res.status(401).json({message: 'Invalid password'})
        }else{
            res.status(500).json(err)
        }
    })
}