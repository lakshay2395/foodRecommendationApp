var express = require('express');
var router = express.Router();

var recommendationHelper = require("../helpers/recommendation-helper");

router.get('/', function(req, res, next) {
    res.send("Balle Balle");
});

module.exports = router;
