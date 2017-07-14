var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    "name" : {
        type : String,
        required : true
    },
    "weight_in_grams" : {
        type : String,
        required : false
    },
    "measure" : {
        type : String,
        required : false
    },
    "kCal" : {
        type : String,
        required : false
    }
});

var Food = mongoose.model("Food",FoodSchema);

module.exports = Food;