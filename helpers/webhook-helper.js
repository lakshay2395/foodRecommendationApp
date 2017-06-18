var admin = require("firebase-admin");

var firebaseCredentials = require("../conf/firebase-credentials");

var serviceAccount = require("../conf/food-recommendation-app-d60022a24b99");

var User = require("../models/User");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseCredentials.databaseURL
});

var container = {
    "sendNotificationToUser" : function(content){
        var payload = {
            data : content
        };
        User.find({},function(err,users){
            var registrationTokens = [];
            for(var i = 0 ; i < users.length ; i++)
                registrationTokens.push(user[i].registrationToken)
            admin.messaging().sendToDevice(registrationTokens, payload)
                .then(function(response) {
                    console.log("Successfully sent message:", response);
                })
                .catch(function(error) {
                    console.log("Error sending message:", error);
                });
        })
    }  
}

module.exports = container;