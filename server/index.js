const express = require('express');

const router = express.Router();

router.use(require('./routes/check.changes.route'));

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'server up and running',
        time: Date(),
    });
});

module.exports = router;
