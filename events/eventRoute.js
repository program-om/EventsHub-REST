const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const EventController = require('./eventController');

router.get('/', EventController.get_all_events);

router.post('/new-event', EventController.create_new_event);

router.get('/special', verifyToken, EventController.special_events)

router.patch('/like', verifyToken, EventController.like_event)

router.patch('/delete', verifyToken, EventController.delete_event)

function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unathorized request!')
  }

  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null'){
    return res.status(401).send('Unathorized request!')
  }

  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unathorized request!')
  }

  req.userId = payload.subject
  next()
}

module.exports = router;