const express = require('express')
const router = express.Router()

const UserController = require('./userRouter')

router.get('/', UserController.get_all_users)

router.patch('/:userID/:eventToAdd', UserController.user_liked_event)

router.delete('/:userID/:eventToAdd', UserController.user_dislike_event)

module.exports = router;