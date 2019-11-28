const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('From API routs. ' + req.ip)
})

module.exports = router;