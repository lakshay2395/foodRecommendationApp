var express = require('express');
var router = express.Router();
var User = require("../models/User");
var handler = require("../helpers/handle-response");

/**
 * Authenticate user on the basis of account details.
 */
router.post("/authenticate",function(req,res,next){
  req.body["is_activated"] = true;
  User.findOne(req.body,function(err,user){
    if(err)
      handler.error(res,err);
    handler.success(res,user);
  });
});

/**
 * Returns the user on the basis of id.
 */
router.get("/get/:id",function(req,res,next){
  User.findOne({ "_id" : ObjectId(req.params.id) , "is_activated" : true},function(err,user){
    if(err)
      handler.error(res,err);
    handler.success(res,user);
  })
});

/**
 * Registers the user.
 */
router.post("/add",function(req,res,next){
  var user = new User(req.body);
  user.save(function(err){
    if(err)
      handler.error(res,err);
    handler.success(res,user);
  })
});

/**
 * Updates the user details.
 */
router.put("/update/:id",function(req,res,next){
  User.findOneAndUpdate({ "_id" : ObjectId(req.params.id) , "is_activated" : true},req.body,{
    upsert : false,
    new : true,
    runValidators : true
  },function(err,user){
    if(err)
      handler.error(res,err);
    handler.success(res,user);
  })
});


/**
 * Deletes the user on the basis of id.
 */
router.delete("/get/:id",function(req,res,next){
  User.find({ "_id" : ObjectId(req.param.id) }, function(err, user) {
      if (err) 
          handler.error(res,err);
      user.remove(function(err) {
        if (err) 
          handler.error(res,err);
        handler.success(res,"Deleted Successfully");  
      });
  });
});

module.exports = router;
