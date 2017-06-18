var express = require('express');
var router = express.Router();
var handler = require("../helpers/handle-response");

router.get("/get/:id",function(req,res,next){
  switch(req.params.id){
      case "weight-units" : handler.success(res,require("../const/weight-units"));
                            break;
      case "height-units" : handler.success(res,require("../const/height-units"));
                            break;
      case "bmi-status"  : handler.success(res,require("../const/bmi-status"));
                           break;
      case "activity-types" : handler.success(res,Object.keys(require("../const/activityTypeQuotients")));
                              break;
      default : handler.error(res,"No Such Constant Exists");
                break;
  }
});

module.exports = router;