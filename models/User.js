var mongoose = require('mongoose');

var genderEnum = require("./enums/genderEnum");

var activityTypeEnum = require("./enums/activityTypeEnum");

var accountTypeEnum = require("./enums/accountTypeEnum");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name" : {
        "first_name" : {
            type : String,
            required : true
        },
        "last_name" : {
            type : String,
            required : true
        },
    },
    "age" : {
        type : Number,
        required : true
    },
    "gender" : {
        type : String,
        enum : genderEnum
    },
    "email" : {
        type : String,
        required: true,
        unique : true
    },
    "account_type" : {
        type : String,
        enum : accountTypeEnum
    },
    "account_id" : {
        type : Number,
        required : true
    },
    "pic_url" : {
        type : String,
        required : false
    },
    "bmi_parameters" : {
        "height" : {
            type : Number,
            required : true,
        },
        "weight" : {
            type: Number,
            required : true,
        }
    },
    "activity_type" : {
        type : String,
        enum : activityTypeEnum
    },
    "created_date" : {
        type : Date,
        required : false
    },
    "modified_date" : {
        type : Date,
        required : false
    },
    "is_activated" : {
        type : Boolean,
        required : true
    }
});

UserSchema.pre('save',function(next){
    var date = new Date();
    this["created_date"] = date;
    this["modified_date"] = date;
    next();
});

UserSchema.pre('update',function(next){
    var date = new Date();
    this["modified_date"] = date;
    next();
})

var User = mongoose.model("User",UserSchema);

module.exports = User;