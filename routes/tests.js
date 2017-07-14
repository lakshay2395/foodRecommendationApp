var express = require('express');
var router = express.Router();

var Food = require("../models/Food");

var items = require("../const/foodItems");

var mailHelper = require("../helpers/mail-helper");

var fs = require("fs");

router.get("/sendRegistrationSuccessMail/name/:name/email/:email",function(req,res,next){
    mailHelper.sendRegistrationSuccessMail(req.params.name,req.params.email,res);
    res.send("Mail Sent");
});

router.get("/addFood",function(req,res,next){
    for(var i = 0 ; i < items.length ; i++){
        var item = items[i];
        delete item['_id'];
        var food = new Food(item);
        console.log(item);
        food.save(function(err){
            if(err){
                handler.error(res,err);
                return;
            }
        });
    }
});

router.get("/saveToFile",function(req,res,next){
    Food.find({},function(err,items){
        if(err){
            res.send("error");
        }
        fs.writeFile('./const/foodItems.json',JSON.stringify(items),function(err){
            res.send(err);
        });
        //res.send("success");
    });
});

module.exports = router;