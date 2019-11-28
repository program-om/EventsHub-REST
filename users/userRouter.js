const User = require('./userModel')

exports.get_all_users = (req,res) => {
    let users = []

    User.find({}, (error, allUsers) => {
      if(error){
        console.log(error)
      }else{
        //console.log("events: " + allEvents);
        users = allUsers
        res.json(users)
      }
    })//get all the collection
  }

exports.user_liked_event = (req, res) => {
    const id = req.params.userID;
    const eventID = req.params.eventToAdd;
    
    User.findById(id, (err, user) => {
      if(err){
        return res.status(400).json({
          error: err
        });
      }
  
      //console.log(user.likedEvents.indexOf(eventID));
      if(user.likedEvents.indexOf(eventID) >= 0){
        return res.status(401).json({
          error: "This event is already saved"
        })
      }
      user.likedEvents.push(eventID)
      user.save((err, updated_user) => {
        if(err){
          return console.log(err);
        }
      })
    })
    .then(result => {
      res.status(200).json({
        message: "User updated",
        request: {
          method: "GET",
          resource: "http://localhost:3000/api/users"
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
  }

exports.user_dislike_event = (req, res) => {
    const id = req.params.userID;
    const eventID = req.params.eventToAdd;
  
    User.findById(id, (err, user) => {
      if(err){
        return console.log(err);
      }
      const index = user.likedEvents.indexOf(eventID)
      user.likedEvents.splice(index, 1)
      user.save((err, updateduser) => {
        if(err){
          return console.log(err);
        }
      })
    })
    .then(result => {
      res.status(200).json({
        message: "Event deleted from the user document",
        request: {
          method: "GET",
          resource: "http://localhost:3000/api/users"
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
  }