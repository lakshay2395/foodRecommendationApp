var express = require('express');
var router = express.Router();
var User = require("../models/User");
var handler = require("../helpers/handle-response");

/**
 * Authenticate user on the basis of account details.
 */
router.post("/authenticate",function(req,res,next){
  req.body["is_activated"] = true;
  delete req.body["name"];
  User.findOne({ "email" : req.body["email"] },function(err,user){
    if(err){
      handler.error(res,err);
      return;
    }
    handler.success(res,user);
  });
});

/**
 * Returns the user on the basis of id.
 */
router.get("/get/:id",function(req,res,next){
  User.findOne({ "_id" : req.params.id , "is_activated" : true},function(err,user){
    if(err){
      handler.error(res,err);
      return;
    }
    else if(user == null){
      handler.error(res,"No Such User Exists");
      return;
    }
    handler.success(res,user);
  })
});

/**
 * Registers the user.
 */
router.post("/add",function(req,res,next){
  var user = new User(req.body);
  user["is_activated"] = true;
  user.save(function(err){
    if(err){
      handler.error(res,err);
      return;
    }
    handler.success(res,user);
  })
});

/**
 * Updates the user details.
 */
router.put("/update/:id",function(req,res,next){
  User.findOneAndUpdate({ "_id" : req.params.id , "is_activated" : true},req.body,{
    upsert : false,
    new : true,
    runValidators : true
  },function(err,user){
    if(err){
      handler.error(res,err);
      return;
    }
    else if(user == null){
      handler.error(res,"No Such User Exists");
      return;
    }
    handler.success(res,user);
  })
});


/**
 * Deletes the user on the basis of id.
 */
router.delete("/delete/:id",function(req,res,next){
  User.findByIdAndRemove(req.param.id , function(err, user) {
      if (err) {
        if(err.name == "CastError"){
          handler.error(res,"No Such User Details Exists");
          return;
        }
        handler.error(res,err);
        return;
      }
      handler.success(res,"User Successfully Deleted");
  });
});

module.exports = router;
