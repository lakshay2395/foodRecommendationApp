var admin = require("firebase-admin");

var serviceAccount = require("../conf/Food Recommendation App-9b6e23738e13.json");

var User = require("../models/User");

var Notification = require("../models/Notification");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food-recommendation-app.firebaseio.com"
});

module.exports = {

    "sendWelcomeNotification" : function(user,token){
        var payload = {
            data: {
                message : "Hello "+user['name']['first_name']+" , Welcome To Food Recommendation App !"
            }
        };
        admin.messaging().sendToDevice(token, payload)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) { 
                console.log("Error sending message:", error);
            });
    },

    "sendRegularNotifications" : function(){
        Notification.find({},function(err,items){
            var tokens = [];
            for(var i = 0 ; i < items.length ; i++)
                tokens.push(items[i]['device_token']);
            var payload = {
                data: {
                    message : "Your daily food suggestions are ready!!"
                }
            };
            admin.messaging().sendToDevice(tokens, payload)
                .then(function(response) {
                    console.log("Successfully sent message:", response);
                })
                .catch(function(error) { 
                    console.log("Error sending message:", error);
                });
        })
    }
}