var app = require('express');

var credentials = require("../conf/project-credentials");

var container = {

    "sendRegistrationSuccessMail" : function(name,email){
       app.mailer.send("index",{
           "to" : email,
           "subject" : "Your registration with "+credentials.PROJECT_NAME+" is sucessful !",
           "name": name
       },function(err){
           if(err){
               console.log(err);
           }
       }); 
    },

    "sendDailyFoodItemsSuggestionMail" : function(email,foodItems){
       app.mailer.send("dailyFoodItemsSuggestionMail",{
           "to" : email,
           "subject" : "Here are your today suggested one time meals from "+credentials.PROJECT_NAME+" !",
           "foodItems" : foodItems
       },function(err){
           if(err){
               console.log(err);
           }
       }); 
    }

}

module.exports = container;