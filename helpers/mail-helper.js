var app = require('express');

var credentials = require("../conf/project-credentials");

var container = {

    "sendRegistrationSuccessMail" : function(name,email,res){
       res.mailer.send("index",{
           "to" : email,
           "subject" : "Your registration with "+credentials.PROJECT_NAME+" is sucessful !",
           "name": name
       },function(err){
           if(err){
               console.log(err);
           }
       }); 
    },

    "sendDailyFoodItemsSuggestionMail" : function(email,foodItems,res){
       res.mailer.send("regularEmail",{
           "to" : email,
           "subject" : "Here are your today suggested one time meals from "+credentials.PROJECT_NAME+" !",
           "name" : name
       },function(err){
           if(err){
               console.log(err);
           }
       }); 
    }

}

module.exports = container;