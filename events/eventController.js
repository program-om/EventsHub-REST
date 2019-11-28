const Event = require('./eventModel')
const User = require('../users/userModel')

exports.get_all_events = (req, res) => {
    let events = []

    Event.find({}, (error, allEvents) => {
      if(error){
        console.log(error)
      }else{
        //console.log("events: " + allEvents);
        events = allEvents
        res.json(events)
      }
    })//get all the collection
}

exports.create_new_event = (req, res) => {
  let eventData = req.body
  let event = new Event(eventData)
  event.save((error, registeredEvent) => {
      if(error){
          console.log(error);
      } else{
        res.status(200).send(registeredEvent)
      }
  })
}

exports.special_events = (req, res) => {
  User.findOne({_id: req.userId})
  .then( user => {
    return Event.find({_id: {$in: user.likedEvents}})
  })
  .then( events => {
    res.status(200).json(events)
  })
  .catch( err => {
    res.status(500).json(err)
  })
}

exports.like_event = (req, res) => {
  let eventId = req.body.eventId

  User.findOneAndUpdate({_id: req.userId}, {$push: {likedEvents: eventId}})
  .then( user => {
    res.send(user.likedEvents)
  })
  .catch( err => {
    res.send(err.message)
  })
}

exports.delete_event = (req, res) => {
  let eventId = req.body.eventId
  var eventIndex = -1
  User.findOne({_id: req.userId})
  .then( user => {
    eventIndex = user.likedEvents.indexOf(eventId)
    if(eventIndex > -1){
      user.likedEvents.splice(eventIndex, 1)
    }
    return user.save()
  })
  .then( user => {
    res.status(200).json({likedEvents: user.likedEvents})
  })
  .catch( err => {
    res.status(500).json(err)
  })
}