var express = require('express');
var router = express.Router();

var mailHelper = require("../helpers/mail-helper");

router.get("/sendRegistrationSuccessMail/name/:name/email/:email",function(req,res,next){
    mailHelper.sendRegistrationSuccessMail(req.params.name,req.params.email);
});

module.exports = router;