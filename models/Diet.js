var mongoose = require("mongoose");

var User = require("./User");

var notificationEnum = require("./enums/notificationEnum");

var Schema = mongoose.Schema;

var DietSchema = new Schema({
    "title" : {
        type : String,
        required : false,
    },
    "user" : {
        type : User.schema,
        required : true
    },
    "kilo_calories_per_day" : {
       type : Number,
       required : false
    },
    "is_activated" : {
        "status" : {
            type : Boolean,
            required : true
        },
        "reason_for_close" : {
            type : String,
            required : false
        }
    },
    "notification_type" : {
        type : String,
        enum : notificationEnum,
        required : false,
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

DietSchema.pre('save',function(next){
    var date = new Date();
    this["created_date"] = date;
    this["modified_date"] = date;
    next();
});

DietSchema.pre('update',function(next){
    var date = new Date();
    this["modified_date"] = date;
    next();
});

var Diet = mongoose.model("Diet",DietSchema);

module.exports = Diet;
