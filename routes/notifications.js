var express = require('express');
var router = express.Router();

var User = require("../models/User");
var Notification = require("../models/Notification");

var notificationHelper = require("../helpers/notification-helper");

var handler = require("../helpers/handle-response"); 

router.post("/updateUserDevice",function(req,res,next){
  Notification.findOneAndUpdate({"user_id" : req.body["user_id"]},req.body,{upsert : true},function(err,notification){
      if(err){
        handler.error(res,err);
        return;
      }
      User.findOne({ "_id" : req.body["user_id"]},function(err,user){
          notificationHelper.sendWelcomeNotification(user,req.body["device_token"]);
      });
      handler.success(res,notification);
  })
});

router.get("/sendRegularNotificatios",function(req,res,next){
  notificationHelper.sendRegularNotifications();
});

module.exports = router;