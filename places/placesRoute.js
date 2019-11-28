const express = require('express')
const router = express.Router()

router.get('/ha', (req, res) => {
    res.json({
        message: "ho"
    })
})

module.exports = router;