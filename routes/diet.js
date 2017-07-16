var express = require('express');
var router = express.Router();
var converter = require("convert-units");

var Diet = require("../models/Diet");
var User = require("../models/User");
var handler = require("../helpers/handle-response");
var dietHelper = require("../helpers/diet-helper");
var bmiCalculator = require("../helpers/bmi-helper");
var recommendationHelper = require("../helpers/recommendation-helper");

/**
 * Adds new diet plan for user.
 */
router.post("/add",function(req,res,next){
  diet = new Diet(req.body);
  for(var i = 0 ; i < req.body['foodItems'].length ; i++){
    delete req.body['foodItems'][i]['_id'];
  }
  console.log(req.body);
  diet.save(function(err){
      if(err){
        handler.error(res,err);
        return;
      }
      handler.success(res,diet);
  })
});

/**
 * Returns the diet plan by id.
 */
router.get("/get/:id",function(req,res,next){
  Diet.findOne({ "_id" : req.params.id },function(err,diet){
    if(err){
      handler.error(res,err);
      return;
    }
    else if(diet == null){
      handler.error(res,"No Such Diet Details Exists");
      return;
    }
    handler.success(res,diet);
  });
});

/**
 * Returns the diet plan list by user id.
 */
router.get("/get/user/:userId",function(req,res,next){
  Diet.findOne({ "user._id" : req.params.userId },function(err,diet){
    if(err){
      handler.error(res,err);
      return;
    }
    else if(diet == null){
      handler.error(res,"No Such Diet Details Exists");
      return;
    }
    handler.success(res,diet);
  })
});

/**
 * Updates the diet plan by id.
 */
router.put("/update/:id",function(req,res,next){
    Diet.findOneAndUpdate({ "_id" : req.params.id},req.body,{
      upsert : false,
      new : true,
      runValidators : true
    },function(err,diet){
      if(err){
        handler.error(res,err);
        return;
      }
      else if(diet == null){
        handler.error(res,"No Such Diet Details Exists");
        return;
      }
      handler.success(res,diet);
    });
});

/**
 * Deletes the diet plan by id.
 */
router.delete("/delete/:id",function(req,res,next){
  Diet.findByIdAndRemove(req.params.id, function(err, diet) {
      if(err){
        if(err.name == "CastError"){
          handler.error(res,"No Such Diet Details Exists");
          return;
        }
        handler.error(res,err);
        return;
      }
      handler.success(res,"Diet Details Deleted Successfully");  
  });
});

/**
 * Returns user diet details by user id.
 */
router.get("/get/userDietDetails/:userId",function(req,res,next){
  User.findOne({ "_id" : req.params.userId, "is_activated" : true},function(err,user){
    if(err){
      handler.error(res,err);
      return;
    }
    else if(user == null){
      handler.error(res,"No Such User Exists");
      return;
    }
    var height = converter(user["bmi_parameters"]["height"]).from(user["bmi_parameters"]["height_unit"]).to("m");
    var weight = converter(user["bmi_parameters"]["weight"]).from(user["bmi_parameters"]["weight_unit"]).to("kg");
    var bmi = bmiCalculator.calculateBmi(weight,height);
    var status = bmiCalculator.statusOnBmi(bmi);
    var data = {
      "currentKiloCalorieRequirementPerDay" : dietHelper.currentKiloCalorieRequirementPerDay(user),
      "idealKiloCalorieRequirementPerDay" : dietHelper.idealKiloCalorieRequirementPerDay(user),
      "idealWeightInKgs" : dietHelper.idealWeight(user),
      "foodItems" : recommendationHelper.calculateFoodMetricsForUser(user),
      "bmi_data" : {
        "bmi" : bmi,
        "status" : status
      }
    }
    handler.success(res,data);
  })
});


module.exports = router;