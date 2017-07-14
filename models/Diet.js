var mongoose = require("mongoose");

var User = require("./User");

var Food = require("./Food");

var notificationEnum = require("./enums/notificationEnum");

var Schema = mongoose.Schema;

var DietSchema = new Schema({
    "user" : {
        type : User.schema,
        required : true
    },
    "currentKiloCalorieRequirementPerDay" : {
        type : String,
        required : true
    },
    "idealKiloCalorieRequirementPerDay" : {
        type : String,
        required : true
    },
    "idealWeightInKgs" : {
        type : String,
        required : true
    },
    "foodItems" : {
        type : [Food.schema],
        required : false
    },
    "bmi_data" : {
        "bmi" : {
            type : String,
            required : true
        },
        "status" : {
            type : String,
            required : true
        }
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
