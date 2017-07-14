var mongoose = require("mongoose");

var User = require("./User");

var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    "user_id" : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    "device_token" : {
        type: String,
        required : true 
    },
    "created_date" : {
        type : Date,
        required : false
    },
    "modified_date" : {
        type : Date,
        required : false
    }
});

NotificationSchema.pre('save',function(next){
    var date = new Date();
    this["created_date"] = date;
    this["modified_date"] = date;
    next();
});

NotificationSchema.pre('update',function(next){
    var date = new Date();
    this["modified_date"] = date;
    next();
});

var Notification = mongoose.model("Notification",NotificationSchema);

module.exports = Notification;
