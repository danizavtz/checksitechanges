const express = require('express');

const router = express.Router();
const urlService = require('../controllers/check.changes.controller');

router.get('/checkurl', urlService.checkSiteChanges, urlService.checkHashValueChanged);

module.exports = router;
