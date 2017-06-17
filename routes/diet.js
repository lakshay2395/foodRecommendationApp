var express = require('express');
var router = express.Router();
var Diet = require("../models/Diet");
var User = require("../models/User");
var handler = require("../helpers/handle-response");
var dietPlanCalculator = require("../helpers/diet-helper");

/**
 * Adds new diet plan for user.
 */
router.post("/add",function(req,res,next){
  var diet = dietPlanCalculator.calculateDiet(req.body);
  diet = new Diet(diet);
  diet["is_activated"] = {
    status : true,
    "reason_for_close" : null
  }
  diet.save(function(err){
      if(err)
        handler.error(res,err);
      handler.success(res,diet);
  })
});

/**
 * Returns the diet plan by id.
 */
router.get("/get/:id",function(req,res,next){
  Diet.findOne({ "_id" : ObjectId(req.param.id) },function(err,diet){
    if(err)
      handler.error(res,err);
    handler.success(res,diet);
  })
});

/**
 * Returns the diet plan list by user id.
 */
router.post("/get/user/:userId",function(req,res,next){
  Diet.findOne({ "user.$id" : ObjectId(req.param.userId) },function(err,diets){
    if(err)
      handler.error(res,err);
    handler.success(res,diet);
  })
});

/**
 * Deletes the diet plan by id.
 */
router.delete("/delete/:id",function(req,res,next){
  Diet.find({ "_id" : ObjectId(req.param.id) }, function(err, diet) {
      if (err) 
          handler.error(res,err);
      diet.remove(function(err) {
        if (err) 
          handler.error(res,err);
        handler.success(res,"Deleted Successfully");  
      });
  });
});

/**
 * Updates the diet plan by id.
 */
router.put("/update/:id",function(req,res,next){
    Diet.findOneAndUpdate({ "_id" : ObjectId(req.params.id)},req.body,{
      upsert : false,
      new : true,
      runValidators : true
    },function(err,user){
      if(err)
        handler.error(res,err);
      handler.success(res,user);
    });
});

module.exports = router;